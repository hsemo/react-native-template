#!/usr/bin/env node
/**
 * @module script
 *
 * This script initializes a new React Native project by setting up a Git repository,
 * creating necessary configuration files, and prompting the user to select plugins
 * to include in the template.
 */

const { exec, execSync } = require('child_process');
const process = require('process');
const fs = require('fs');
const { rm } = require('fs').promises;
let prompt = require('prompt');

const {
  dependencies,
  pluginPaths,
  gitignoreContent,
  PLUGINS,
} = require('./constants');

console.log('This is post init script');

// Function to run a Git command
function runGitCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        reject(`Stderr: ${stderr}`);
        return;
      }
      resolve(stdout);
    });
  });
}

// Initialize a new Git repository
async function initRepo() {
  console.log('current working directory: ' + process.cwd());
  try {
    const result = await runGitCommand('git init');
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

function createGitignore() {
  fs.writeFile('.gitignore', gitignoreContent.trim(), (err) => {
    if (err) {
      console.error('Error creating .gitignore file:', err);
    } else {
      console.log('.gitignore file created successfully!');
    }
  });
}

function createEnv() {
  fs.writeFile('.env', '', (err) => {
    if (err) {
      console.error('Error creating .env file:', err);
    } else {
      console.log('.env file created successfully!');
    }
  });
}

function getPromptSchema() {
  const schemaProperties = PLUGINS.reduce(
    (properties, plugin) => ({
      ...properties,
      [plugin]: {
        pattern: /y|n/g,
        message: 'please answer in - (y/n)',
        required: true,
      },
    }),
    {}
  );

  const schema = {
    properties: schemaProperties,
  };

  return schema;
}

async function readConfig() {
  console.log('Select the Plugins you wish to include with the template:');

  prompt.start();

  // prompt user to select plugins to install
  const responses = await prompt.get(getPromptSchema());

  processConfigs(responses);
}

function processConfigs(configs) {
  Object.entries(configs).map(([feat, ans]) => {
    if (ans?.toLowerCase() === 'y') {
      // if feature is selected, install its dependencies
      const featDependencies = dependencies[feat];

      installDependencies(featDependencies);
    } else if (ans?.toLowerCase() === 'n') {
      // if feature is not selected remove source from template
      const featSourcePath = pluginPaths[feat];

      cleanPluginsFromTemplate(featSourcePath);
    }
  });
}

async function installDependencies(deps) {
  try {
    deps.forEach((dep) => {
      execSync(`npm install ${dep}`);
    });
  } catch (error) {
    console.log('Error in installing deps =>', error.message);
  }
}

async function cleanPluginsFromTemplate(pluginPath) {
  try {
    await rm(pluginPath, { recursive: true });
  } catch (error) {
    console.log('Error in clean up =>', error.message);
  }
}

// Example usage
async function main() {
  // await readConfig();
  await initRepo();
  createGitignore();
  createEnv();
}

main();
