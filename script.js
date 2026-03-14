#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const {
  dependencies,
  pluginPaths,
  PLUGINS,
  gitignoreContent,
} = require('./constants/index.js');

function evaluateCondition(condition, config) {
  const isNegated = condition.startsWith('!');
  const feature = isNegated ? condition.slice(1) : condition;
  const isSelected = config[feature]?.toLowerCase() === 'y';
  return isNegated ? !isSelected : isSelected;
}

function pruneFile(filePath, config) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Handle blocks: /* @if feature */ ... [/* @else */ ...] /* @endif */
  // Matches both /* and /**
  const blockRegex = /\/\*\*? @if ([!\w]+) \*\/([\s\S]*?)(?:\/\*\*? @else \*\/([\s\S]*?))?\/\*\*? @endif \*\//g;
  content = content.replace(blockRegex, (match, condition, ifContent, elseContent) => {
    return evaluateCondition(condition, config) ? ifContent : (elseContent || '');
  });

  // 2. Handle single line markers: code // @if feature
  const lineRegex = /^(.*)\/\/ @if ([!\w]+)$/gm;
  content = content.replace(lineRegex, (match, code, condition) => {
    return evaluateCondition(condition, config) ? code : '';
  });

  // 3. Cleanup: Remove markers and whitespace
  if (content !== originalContent) {
    // Remove trailing whitespace on each line
    content = content.split('\n').map(line => line.trimEnd()).join('\n');

    // Collapse 3+ consecutive newlines into 2 (one empty line)
    content = content.replace(/\n{3,}/g, '\n\n');

    // Trim leading/trailing whitespace of the file
    content = content.trim() + '\n';

    fs.writeFileSync(filePath, content);
    console.log(`Pruned and cleaned: ${filePath}`);
  }
}

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'android' && file !== 'ios') {
        arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
      }
    } else {
      if (/\.(ts|tsx|js|json)$/.test(file) && file !== 'package-lock.json') {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

async function askFeatures() {
  console.log('\n--- React Native Template Configuration ---\n');

  let confirmed = false;
  let rawResult = {}; // { withRedux: "y", withZustand: "n", ... }

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

    // Map the array of selected features back to the required object shape
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
        // Install dependencies
        const deps = dependencies[plugin];
        if (deps && deps.length > 0) {
          console.log(`Installing dependencies for ${plugin}: ${deps.join(', ')}`);
          execSync(`npm install ${deps.join(' ')}`, { stdio: 'inherit' });
        }
      } else {
        // Remove files
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

    // Prune code in all files
    console.log('\nPruning project files...');
    const allFiles = getAllFiles(process.cwd());
    allFiles.forEach(file => pruneFile(file, config));

    // Generate .gitignore
    console.log('\nGenerating .gitignore...');
    fs.writeFileSync(path.join(process.cwd(), '.gitignore'), gitignoreContent.trim() + '\n');

    // Final Touch: Run Prettier
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
