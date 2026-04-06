#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const { Project, SyntaxKind } = require('ts-morph');

const {
  dependencies,
  pluginPaths,
  PLUGINS,
  gitignoreContent,
} = require('./constants/index.js');

function unwrapJsxElement(sourceFile, componentName) {
  const nodesToUnwrap = [];
  sourceFile.forEachDescendant(node => {
    if (node.getKind() === SyntaxKind.JsxElement) {
      const openingElement = node.getOpeningElement();
      if (openingElement.getTagNameNode().getText() === componentName) {
        nodesToUnwrap.push(node);
      }
    }
  });
  nodesToUnwrap.forEach(node => {
    const childrenText = node.getJsxChildren().map(c => c.getText()).join('\n');
    node.replaceWithText(childrenText);
  });
}

function removeImport(sourceFile, moduleSpecifier) {
  const imp = sourceFile.getImportDeclaration(moduleSpecifier);
  if (imp) imp.remove();
}

function pruneWithTsMorph(config) {
  const project = new Project();
  
  // Add relevant files
  const root = process.cwd();
  project.addSourceFilesAtPaths([
    path.join(root, 'App.tsx'),
    path.join(root, 'src/**/*.ts'),
    path.join(root, 'src/**/*.tsx')
  ]);

  // 1. App.tsx
  const appFile = project.getSourceFile('App.tsx');
  if (appFile) {
    if (config?.withRedux !== 'y') {
      removeImport(appFile, 'react-redux');
      removeImport(appFile, '@src/store');
      unwrapJsxElement(appFile, 'Provider');
    }
    if (config?.withReactQuery !== 'y') {
      removeImport(appFile, '@tanstack/react-query');
      const qc = appFile.getVariableDeclaration('queryClient');
      if (qc) qc.getVariableStatement().remove();
      unwrapJsxElement(appFile, 'QueryClientProvider');
    }
    if (config?.withNavigation !== 'y') {
      removeImport(appFile, '@navigation/Routes');
      
      const replaceNodes = [];
      appFile.forEachDescendant(node => {
        if (node.getKind() === SyntaxKind.JsxSelfClosingElement) {
          if (node.getTagNameNode().getText() === 'Routes') {
            replaceNodes.push(node);
          }
        }
      });
      replaceNodes.forEach(node => node.replaceWithText('<HomeScreen />'));
    } else {
      // Navigation is Selected, remove HomeScreen fallback
      removeImport(appFile, '@src/screens/home/Home');
    }
  }

  // 2. useAppColorScheme.ts
  const hookFile = project.getSourceFile('useAppColorScheme.ts');
  if (hookFile) {
    let appThemeInit = [];
    if (config?.withRedux !== 'y') {
      removeImport(hookFile, '@src/store');
      removeImport(hookFile, '@src/store/slices/appSlice');
      const rt = hookFile.getVariableDeclaration('reduxTheme');
      if (rt) rt.getVariableStatement().remove();
    } else {
      appThemeInit.push('reduxTheme');
    }
    
    if (config?.withZustand !== 'y') {
      removeImport(hookFile, '@src/store/zustand/placeholder');
      const zt = hookFile.getVariableDeclaration('zustandTheme');
      if (zt) zt.getVariableStatement().remove();
    } else {
      appThemeInit.push('zustandTheme');
    }

    const appThemeDecl = hookFile.getVariableDeclaration('appTheme');
    if (appThemeDecl) {
      if (appThemeInit.length > 0) {
        appThemeDecl.setInitializer(appThemeInit.join(' || '));
      } else {
        appThemeDecl.setInitializer('null');
      }
    }
  }

  // 3. Routes.tsx
  const routesFile = project.getSourceFile('Routes.tsx');
  if (routesFile) {
    let themeInit = [];
    if (config?.withRedux !== 'y') {
      removeImport(routesFile, '@src/store');
      removeImport(routesFile, '@src/store/slices/appSlice');
      
      const dispatch = routesFile.getVariableDeclaration('dispatch');
      if (dispatch) dispatch.getVariableStatement().remove();
      
      const rt = routesFile.getVariableDeclaration('reduxTheme');
      if (rt) rt.getVariableStatement().remove();
      
      // Remove dispatch(setAppTheme(appTheme as AppThemeValue));
      const statementsToRemove = [];
      routesFile.forEachDescendant(node => {
        if (node.getKind() === SyntaxKind.CallExpression) {
          if (node.getExpression().getText() === 'dispatch') {
            const statement = node.getFirstAncestorByKind(SyntaxKind.ExpressionStatement);
            if (statement) statementsToRemove.push(statement);
          }
        }
      });
      statementsToRemove.forEach(statement => statement.remove());
    } else {
      themeInit.push('reduxTheme');
    }
    
    if (config?.withZustand !== 'y') {
      removeImport(routesFile, '@src/store/zustand/placeholder');
      const zt = routesFile.getVariableDeclaration('zustandTheme');
      if (zt) zt.getVariableStatement().remove();
    } else {
      themeInit.push('zustandTheme');
    }

    themeInit.push('defaultTheme');
    const themeDecl = routesFile.getVariableDeclaration('theme');
    if (themeDecl) themeDecl.setInitializer(themeInit.join(' || '));
  }

  // 4. StackNavigator.tsx
  const stackFile = project.getSourceFile('StackNavigator.tsx');
  if (stackFile) {
    const nodesToRemove = [];
    if (config?.withBottomTabs !== 'y') {
      removeImport(stackFile, './BottomTabsNavigator');
      stackFile.forEachDescendant(node => {
        if (node.getKind() === SyntaxKind.JsxSelfClosingElement) {
          const nameProp = node.getAttribute('name');
          if (nameProp && nameProp.getText().includes('BottomTabs')) {
            nodesToRemove.push(node);
          }
        }
      });
    } else {
      // Bottom tabs selected
      stackFile.forEachDescendant(node => {
        if (node.getKind() === SyntaxKind.JsxSelfClosingElement) {
          const nameProp = node.getAttribute('name');
          if (nameProp && nameProp.getText().includes('HOME')) {
            nodesToRemove.push(node);
          }
        }
      });
    }
    nodesToRemove.forEach(node => node.replaceWithText(''));
  }

  // 5. RoutesConstants/index.ts
  const routesConstFile = project.getSourceFile('index.ts');
  if (routesConstFile && routesConstFile.getDirectory().getBaseName() === 'RoutesConstants') {
    if (config?.withBottomTabs !== 'y') {
      const bts = routesConstFile.getVariableDeclaration('BottomTabsScreens');
      if (bts) bts.getVariableStatement().remove();
      
      const ss = routesConstFile.getVariableDeclaration('StackScreens');
      if (ss) {
        const init = ss.getInitializerIfKind(SyntaxKind.AsExpression)?.getExpression();
        if (init && init.getKind() === SyntaxKind.ObjectLiteralExpression) {
          const prop = init.getProperty('BottomTabs');
          if (prop) prop.remove();
        }
      }
    } else {
      const ss = routesConstFile.getVariableDeclaration('StackScreens');
      if (ss) {
        const init = ss.getInitializerIfKind(SyntaxKind.AsExpression)?.getExpression();
        if (init && init.getKind() === SyntaxKind.ObjectLiteralExpression) {
          const prop = init.getProperty('HOME');
          if (prop) prop.remove();
        }
      }
    }
  }

  // 6. types/navigation.d.ts
  const navTypesFile = project.getSourceFile('navigation.d.ts');
  if (navTypesFile) {
    if (config?.withBottomTabs !== 'y') {
      const bts = navTypesFile.getVariableDeclaration('BottomHOME');
      if (bts) bts.getVariableStatement().remove();
      
      const bt = navTypesFile.getVariableDeclaration('BottomTabs');
      if (bt) bt.getVariableStatement().remove();
      
      const typeAliases = navTypesFile.getTypeAliases();
      const paramsList = typeAliases.find(t => t.getName() === 'MainStackScreensParamsList');
      if (paramsList) {
        const typeNode = paramsList.getTypeNode();
        if (typeNode && typeNode.getKind() === SyntaxKind.TypeLiteral) {
          const member = typeNode.getMember(m => m.getText().includes('[BottomTabs]'));
          if (member) member.remove();
        }
      }
      
      const btScreenNames = typeAliases.find(t => t.getName() === 'BottomTabsScreenNames');
      if (btScreenNames) btScreenNames.remove();
      
      const btParamsList = typeAliases.find(t => t.getName() === 'BottomTabsParamsList');
      if (btParamsList) btParamsList.remove();
    } else {
      const sh = navTypesFile.getVariableDeclaration('StackHOME');
      if (sh) sh.getVariableStatement().remove();
      
      const typeAliases = navTypesFile.getTypeAliases();
      const paramsList = typeAliases.find(t => t.getName() === 'MainStackScreensParamsList');
      if (paramsList) {
        const typeNode = paramsList.getTypeNode();
        if (typeNode && typeNode.getKind() === SyntaxKind.TypeLiteral) {
          const member = typeNode.getMember(m => m.getText().includes('[StackHOME]'));
          if (member) member.remove();
        }
      }
    }
  }

  // Save all modified files
  project.saveSync();
  console.log('Finished AST pruning with ts-morph.');
}

async function askFeatures() {
  console.log('\n--- React Native Template Configuration ---\n');

  let confirmed = false;
  let rawResult = {};

  while (!confirmed) {
    const listAnswer = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'features',
        message: 'Select the features you want to include (Space to toggle, Enter to confirm, Up/Down/j/k to navigate):',
        choices: PLUGINS.map(plugin => ({
          name: plugin.replace('with', ''),
          value: plugin,
          checked: true,
        })),
        loop: false,
      }
    ]);

    const selectedFeatures = listAnswer.features || [];
    rawResult = PLUGINS.reduce((acc, plugin) => {
      acc[plugin] = selectedFeatures.includes(plugin) ? 'y' : 'n';
      return acc;
    }, {});

    console.log('\n--- Selection Summary ---');
    for (const plugin of PLUGINS) {
      console.log(`${plugin.replace('with', '')}: ${rawResult[plugin] === 'y' ? 'Yes' : 'No'}`);
    }
    console.log('-------------------------\n');

    const confirmAnswer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'isSatisfied',
        message: 'Are you satisfied with these selections?',
        default: true
      }
    ]);

    if (confirmAnswer.isSatisfied) {
      confirmed = true;
    } else {
      console.log('\nLet\'s try selecting features again...\n');
    }
  }

  return rawResult;
}

async function main() {
  try {
    const config = await askFeatures();

    // Dependency check: withBottomTabs requires withNavigation
    if (config.withBottomTabs === 'y') {
      config.withNavigation = 'y';
    }

    console.log('\nProcessing features...');

    for (const plugin of PLUGINS) {
      const isSelected = config[plugin]?.toLowerCase() === 'y';

      if (isSelected) {
        const deps = dependencies[plugin];
        if (deps && deps.length > 0) {
          console.log(`Installing dependencies for ${plugin}: ${deps.join(', ')}`);
          execSync(`npm install ${deps.join(' ')}`, { stdio: 'inherit' });
        }
      } else {
        const pathsToRemove = pluginPaths[plugin];
        if (pathsToRemove) {
          const paths = Array.isArray(pathsToRemove) ? pathsToRemove : [pathsToRemove];
          paths.forEach(p => {
            const fullP = path.join(process.cwd(), p);
            if (fs.existsSync(fullP)) {
              console.log(`Removing files for ${plugin}: ${fullP}`);
              fs.rmSync(fullP, { recursive: true, force: true });
            }
          });
        }
      }
    }

    // Prune code using ts-morph
    console.log('\nPruning project files with AST manipulation...');
    pruneWithTsMorph(config);

    // Generate .gitignore
    console.log('\nGenerating .gitignore...');
    fs.writeFileSync(path.join(process.cwd(), '.gitignore'), gitignoreContent.trim() + '\n');

    try {
      console.log('\nRunning Prettier formatter...');
      execSync('npx prettier --write .', { stdio: 'inherit' });
    } catch (prettierError) {
      console.warn('\nWarning: Prettier failed to run, but template setup is complete.');
    }

    console.log('\nTemplate configuration complete!');
  } catch (error) {
    console.error('\nError during template configuration:', error);
  }
}

main();
