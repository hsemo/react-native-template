#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const { Project, SyntaxKind } = require("ts-morph");

const {
  dependencies,
  pluginPaths,
  PLUGINS,
  gitignoreContent,
} = require("./constants/index.js");

function unwrapJsxElement(sourceFile, componentName) {
  const nodesToUnwrap = [];
  sourceFile.forEachDescendant((node) => {
    if (node.getKind() === SyntaxKind.JsxElement) {
      const openingElement = node.getOpeningElement();
      if (openingElement.getTagNameNode().getText() === componentName) {
        nodesToUnwrap.push(node);
      }
    }
  });
  nodesToUnwrap.forEach((node) => {
    const childrenText = node
      .getJsxChildren()
      .map((c) => c.getText())
      .join("\n");
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
    path.join(root, "App.tsx"),
    path.join(root, "src/**/*.ts"),
    path.join(root, "src/**/*.tsx"),
  ]);

  function getDeepVar(sourceFile, varName) {
    return sourceFile
      .getDescendantsOfKind(SyntaxKind.VariableDeclaration)
      .find((d) => d.getName() === varName);
  }

  // 1. App.tsx
  const appFile = project.getSourceFile("App.tsx");
  if (appFile) {
    if (config?.withRedux !== "y") {
      removeImport(appFile, "react-redux");
      removeImport(appFile, "@src/store");
      unwrapJsxElement(appFile, "Provider");
    }
    if (config?.withReactQuery !== "y") {
      removeImport(appFile, "@tanstack/react-query");
      const qc = getDeepVar(appFile, "queryClient");
      if (qc) qc.getVariableStatement().remove();
      unwrapJsxElement(appFile, "QueryClientProvider");
    }
    if (config?.withNavigation !== "y") {
      removeImport(appFile, "@navigation/Routes");

      const replaceNodes = [];
      appFile.forEachDescendant((node) => {
        if (node.getKind() === SyntaxKind.JsxSelfClosingElement) {
          if (node.getTagNameNode().getText() === "Routes") {
            replaceNodes.push(node);
          }
        }
      });
      replaceNodes.forEach((node) => node.replaceWithText("<HomeScreen />"));
    } else {
      // Navigation is Selected, remove HomeScreen fallback
      removeImport(appFile, "@src/screens/home/Home");
    }
  }

  // 2. useAppColorScheme.ts
  const hookFile = project.getSourceFile("useAppColorScheme.ts");
  if (hookFile) {
    if (config?.withRedux !== "y" && config?.withZustand === "y") {
      // Replace Redux with Zustand
      removeImport(hookFile, "@src/store");
      removeImport(hookFile, "@src/store/slices/appSlice");

      hookFile.addImportDeclaration({
        moduleSpecifier: "@src/store/useAppState",
        defaultImport: "useAppState",
      });

      const appThemeDecl = getDeepVar(hookFile, "appTheme");
      if (appThemeDecl) {
        appThemeDecl.setInitializer("useAppState(state => state.appTheme)");
      }
    } else if (config?.withRedux !== "y") {
      // Remove Redux entirely if neither is selected
      removeImport(hookFile, "@src/store");
      removeImport(hookFile, "@src/store/slices/appSlice");

      const appThemeDecl = getDeepVar(hookFile, "appTheme");
      if (appThemeDecl) {
        appThemeDecl.setInitializer("null");
      }
    }
  }

  // 3. Routes.tsx
  const routesFile = project.getSourceFile("Routes.tsx");
  if (routesFile) {
    if (config?.withRedux !== "y") {
      removeImport(routesFile, "@src/store");
      removeImport(routesFile, "@src/store/slices/appSlice");

      const dispatch = getDeepVar(routesFile, "dispatch");
      if (dispatch) dispatch.getVariableStatement().remove();

      // Remove dispatch(setAppTheme(appTheme as AppThemeValue));
      const statementsToRemove = [];
      routesFile.forEachDescendant((node) => {
        if (node.getKind() === SyntaxKind.CallExpression) {
          if (node.getExpression().getText() === "dispatch") {
            const statement = node.getFirstAncestorByKind(
              SyntaxKind.ExpressionStatement,
            );
            if (statement) statementsToRemove.push(statement);
          }
        }
      });
      statementsToRemove.forEach((statement) => statement.remove());

      if (config?.withZustand === "y") {
        // Replace Redux with Zustand
        routesFile.addImportDeclaration({
          moduleSpecifier: "@src/store/useAppState",
          defaultImport: "useAppState",
        });

        const themeDecl = getDeepVar(routesFile, "theme");
        if (themeDecl) {
          themeDecl.setInitializer(
            "useAppState(state => state.appTheme) || AppThemeValue.System",
          );
        }

        // Add Zustand theme initialization in useEffect
        const effectNodes = [];
        routesFile.forEachDescendant((node) => {
          if (node.getKind() === SyntaxKind.CallExpression) {
            if (node.getExpression().getText() === "useEffect") {
              effectNodes.push(node);
            }
          }
        });

        if (effectNodes.length > 0) {
          const useEffectCall = effectNodes[0];
          const arrowFunc = useEffectCall.getArguments()[0];
          if (arrowFunc) {
            const funcBody = arrowFunc.getBody();
            const lastStatement =
              funcBody.getStatements()[funcBody.getStatements().length - 1];
            lastStatement.replaceWithText(
              `useAppState.getState().setAppTheme(appTheme as AppThemeValue);`,
            );
          }
        }
      } else {
        // Neither selected - just use default theme
        const themeDecl = getDeepVar(routesFile, "theme");
        if (themeDecl) {
          themeDecl.setInitializer("AppThemeValue.System");
        }

        // Remove the entire useEffect since theme doesn't need initialization
        const effectNodes = [];
        routesFile.forEachDescendant((node) => {
          if (node.getKind() === SyntaxKind.CallExpression) {
            if (node.getExpression().getText() === "useEffect") {
              const statement = node.getFirstAncestorByKind(
                SyntaxKind.ExpressionStatement,
              );
              if (statement) effectNodes.push(statement);
            }
          }
        });
        effectNodes.forEach((statement) => statement.remove());
      }
    }
  }

  // 4. StackNavigator.tsx
  const stackFile = project.getSourceFile("StackNavigator.tsx");
  if (stackFile) {
    const nodesToRemove = [];
    if (config?.withBottomTabs !== "y") {
      removeImport(stackFile, "./BottomTabsNavigator");
      stackFile.forEachDescendant((node) => {
        if (node.getKind() === SyntaxKind.JsxSelfClosingElement) {
          const nameProp = node.getAttribute("name");
          if (nameProp && nameProp.getText().includes("BottomTabs")) {
            nodesToRemove.push(node);
          }
        }
      });
    } else {
      // Bottom tabs selected
      stackFile.forEachDescendant((node) => {
        if (node.getKind() === SyntaxKind.JsxSelfClosingElement) {
          const nameProp = node.getAttribute("name");
          if (nameProp && nameProp.getText().includes("HOME")) {
            nodesToRemove.push(node);
          }
        }
      });
    }
    nodesToRemove.forEach((node) => node.replaceWithText(""));
  }

  // 5. RoutesConstants/index.ts
  const routesConstFile = project.getSourceFile("index.ts");
  if (
    routesConstFile &&
    routesConstFile.getDirectory().getBaseName() === "RoutesConstants"
  ) {
    if (config?.withBottomTabs !== "y") {
      const bts = routesConstFile.getVariableDeclaration("BottomTabsScreens");
      if (bts) bts.getVariableStatement().remove();

      const ss = routesConstFile.getVariableDeclaration("StackScreens");
      if (ss) {
        const init = ss
          .getInitializerIfKind(SyntaxKind.AsExpression)
          ?.getExpression();
        if (init && init.getKind() === SyntaxKind.ObjectLiteralExpression) {
          const prop = init.getProperty("BottomTabs");
          if (prop) prop.remove();
        }
      }
    } else {
      const ss = routesConstFile.getVariableDeclaration("StackScreens");
      if (ss) {
        const init = ss
          .getInitializerIfKind(SyntaxKind.AsExpression)
          ?.getExpression();
        if (init && init.getKind() === SyntaxKind.ObjectLiteralExpression) {
          const prop = init.getProperty("HOME");
          if (prop) prop.remove();
        }
      }
    }
  }

  // 6. types/navigation.d.ts
  const navTypesFile = project.getSourceFile("navigation.d.ts");
  if (navTypesFile) {
    if (config?.withBottomTabs !== "y") {
      const bts = navTypesFile.getVariableDeclaration("BottomHOME");
      if (bts) bts.getVariableStatement().remove();

      const bt = navTypesFile.getVariableDeclaration("BottomTabs");
      if (bt) bt.getVariableStatement().remove();

      const typeAliases = navTypesFile.getTypeAliases();
      const paramsList = typeAliases.find(
        (t) => t.getName() === "MainStackScreensParamsList",
      );
      if (paramsList) {
        const typeNode = paramsList.getTypeNode();
        if (typeNode && typeNode.getKind() === SyntaxKind.TypeLiteral) {
          const member = typeNode.getMember((m) =>
            m.getText().includes("[BottomTabs]"),
          );
          if (member) member.remove();
        }
      }

      const btScreenNames = typeAliases.find(
        (t) => t.getName() === "BottomTabsScreenNames",
      );
      if (btScreenNames) btScreenNames.remove();

      const btParamsList = typeAliases.find(
        (t) => t.getName() === "BottomTabsParamsList",
      );
      if (btParamsList) btParamsList.remove();
    } else {
      const sh = navTypesFile.getVariableDeclaration("StackHOME");
      if (sh) sh.getVariableStatement().remove();

      const typeAliases = navTypesFile.getTypeAliases();
      const paramsList = typeAliases.find(
        (t) => t.getName() === "MainStackScreensParamsList",
      );
      if (paramsList) {
        const typeNode = paramsList.getTypeNode();
        if (typeNode && typeNode.getKind() === SyntaxKind.TypeLiteral) {
          const member = typeNode.getMember((m) =>
            m.getText().includes("[StackHOME]"),
          );
          if (member) member.remove();
        }
      }
    }
  }

  // Save all modified files
  project.saveSync();
  console.log("Finished AST pruning with ts-morph.");
}

async function askFeatures() {
  console.log("\n--- React Native Template Configuration ---\n");

  let confirmed = false;
  let rawResult = {};

  while (!confirmed) {
    const listAnswer = await inquirer.prompt([
      {
        type: "checkbox",
        name: "features",
        message:
          "Select the features you want to include (Space to toggle, Enter to confirm, Up/Down/j/k to navigate):",
        choices: PLUGINS.map((plugin) => ({
          name: plugin.replace("with", ""),
          value: plugin,
          checked: true,
        })),
        loop: false,
      },
    ]);

    const selectedFeatures = listAnswer.features || [];
    rawResult = PLUGINS.reduce((acc, plugin) => {
      acc[plugin] = selectedFeatures.includes(plugin) ? "y" : "n";
      return acc;
    }, {});

    console.log("\n--- Selection Summary ---");
    for (const plugin of PLUGINS) {
      console.log(
        `${plugin.replace("with", "")}: ${rawResult[plugin] === "y" ? "Yes" : "No"}`,
      );
    }
    console.log("-------------------------\n");

    const confirmAnswer = await inquirer.prompt([
      {
        type: "confirm",
        name: "isSatisfied",
        message: "Are you satisfied with these selections?",
        default: true,
      },
    ]);

    if (confirmAnswer.isSatisfied) {
      confirmed = true;
    } else {
      console.log("\nLet's try selecting features again...\n");
    }
  }

  return rawResult;
}

async function main() {
  try {
    const config = await askFeatures();

    // Dependency check: withBottomTabs requires withNavigation
    if (config.withBottomTabs === "y") {
      config.withNavigation = "y";
    }

    console.log("\nProcessing features...");

    for (const plugin of PLUGINS) {
      const isSelected = config[plugin]?.toLowerCase() === "y";

      if (isSelected) {
        const deps = dependencies[plugin];
        if (deps && deps.length > 0) {
          console.log(
            `Installing dependencies for ${plugin}: ${deps.join(", ")}`,
          );
          try {
            execSync(`npm install ${deps.join(" ")}`, { stdio: "pipe" });
          } catch (installError) {
            console.error(
              `\nError installing dependencies for ${plugin}: ${installError.message}`,
            );
            throw new Error(`Failed to install dependencies for ${plugin}`);
          }
        }
      } else {
        const pathsToRemove = pluginPaths[plugin];
        if (pathsToRemove) {
          const paths = Array.isArray(pathsToRemove)
            ? pathsToRemove
            : [pathsToRemove];
          paths.forEach((p) => {
            const fullP = path.join(process.cwd(), p);
            if (fs.existsSync(fullP)) {
              console.log(`Removing files for ${plugin}: ${fullP}`);
              try {
                fs.rmSync(fullP, { recursive: true, force: true });
              } catch (removeError) {
                console.error(
                  `\nError removing ${fullP}: ${removeError.message}`,
                );
                throw new Error(`Failed to remove files for ${plugin}`);
              }
            }
          });
        }
      }
    }

    // Prune code using ts-morph
    console.log("\nPruning project files with AST manipulation...");
    try {
      pruneWithTsMorph(config);
    } catch (pruneError) {
      console.error(`\nError during AST pruning: ${pruneError.message}`);
      throw new Error("Failed to prune project files");
    }

    // Generate .gitignore
    console.log("\nGenerating .gitignore...");
    try {
      fs.writeFileSync(
        path.join(process.cwd(), ".gitignore"),
        gitignoreContent.trim() + "\n",
      );
    } catch (gitignoreError) {
      console.error(`\nError generating .gitignore: ${gitignoreError.message}`);
      throw new Error("Failed to generate .gitignore");
    }

    try {
      console.log("\nRunning Prettier formatter...");
      execSync("npx prettier --write .", { stdio: "pipe" });
    } catch (prettierError) {
      console.warn(
        `\nWarning: Prettier failed to run (${prettierError.message}), but template setup is complete.`,
      );
    }

    console.log("\nTemplate configuration complete!");
  } catch (error) {
    console.error(
      "\nError during template configuration:",
      error instanceof Error ? error.message : error,
    );
    process.exit(1);
  }
}

main();
