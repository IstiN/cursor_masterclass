#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');
const { exec } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Voice Chat Assistant Setup');
console.log('================================');
console.log();

async function promptForApiKey() {
  return new Promise((resolve) => {
    rl.question('Enter your Gemini API Key (or press Enter to skip): ', (apiKey) => {
      resolve(apiKey.trim());
    });
  });
}

async function promptForPort() {
  return new Promise((resolve) => {
    rl.question('Enter port number (default: 3000): ', (port) => {
      resolve(port.trim() || '3000');
    });
  });
}

function checkFileExists(filename) {
  return fs.existsSync(filename);
}

function createApiKeyFile(apiKey) {
  try {
    fs.writeFileSync('gemini.key', apiKey);
    console.log('✅ API key saved to gemini.key');
    return true;
  } catch (error) {
    console.error('❌ Error saving API key:', error.message);
    return false;
  }
}

function checkNodeModules() {
  return checkFileExists('node_modules');
}

function installDependencies() {
  return new Promise((resolve) => {
    console.log('📦 Installing dependencies...');
    exec('npm install', (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Error installing dependencies:', error.message);
        resolve(false);
      } else {
        console.log('✅ Dependencies installed successfully');
        resolve(true);
      }
    });
  });
}

function checkKnowledgeBase() {
  if (!checkFileExists('knowledge_base.txt')) {
    console.log('⚠️  knowledge_base.txt not found');
    console.log('   The AI will work but without custom knowledge context');
    return false;
  }
  console.log('✅ Knowledge base found');
  return true;
}

function displayNextSteps(port) {
  console.log();
  console.log('🎉 Setup Complete!');
  console.log('==================');
  console.log();
  console.log('Next steps:');
  console.log(`1. Start the server: npm start`);
  console.log(`2. Open your browser: http://localhost:${port}`);
  console.log('3. Start chatting with voice or text!');
  console.log();
  console.log('📚 Documentation: See README.md for detailed information');
  console.log();
  
  if (!checkFileExists('gemini.key')) {
    console.log('⚠️  Remember to add your Gemini API key to gemini.key file');
  }
}

async function main() {
  try {
    // Check if API key exists
    if (!checkFileExists('gemini.key')) {
      console.log('🔑 Gemini API Key Setup');
      console.log('You need a Gemini API key to use this application.');
      console.log('Get one at: https://makersuite.google.com/app/apikey');
      console.log();
      
      const apiKey = await promptForApiKey();
      if (apiKey) {
        createApiKeyFile(apiKey);
      } else {
        console.log('⏭️  Skipping API key setup');
        console.log('   You can add it later to gemini.key file');
      }
    } else {
      console.log('✅ API key file found');
    }

    console.log();

    // Check and install dependencies
    if (!checkNodeModules()) {
      const installed = await installDependencies();
      if (!installed) {
        console.log('❌ Setup failed during dependency installation');
        process.exit(1);
      }
    } else {
      console.log('✅ Dependencies already installed');
    }

    // Check knowledge base
    console.log();
    checkKnowledgeBase();

    // Get port preference
    console.log();
    const port = await promptForPort();

    // Display completion message
    displayNextSteps(port);

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main(); 