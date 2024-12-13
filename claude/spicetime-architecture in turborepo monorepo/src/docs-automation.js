// .docs/scripts/integrate-docs-automation.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = 'spicetime-architecture';

// GitHub Actions workflow for documentation
const docsWorkflow = `name: Documentation Sync

on:
  # Package publishing trigger
  workflow_run:
    workflows: ["Publish Package"]
    types:
      - completed

  # Version release trigger  
  release:
    types: [published, unpublished]

  # Master branch sync
  push:
    branches:
      - master
    paths-ignore:
      - 'docs/**'  # Prevent recursive triggers

jobs:
  sync-docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0  # Full history for versioning
          
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Sync documentation
        run: node .docs/scripts/sync-versioned-docs.js
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          
      - name: Deploy documentation
        if: success()
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs
          publish_branch: gh-pages
          commit_message: "docs: update documentation [skip ci]"
`;

// Package publishing workflow that triggers docs sync
const publishWorkflow = `name: Publish Package

on:
  push:
    tags:
      - 'v*'  # Version tags

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
          
      - run: npm ci
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: \${{ secrets.NPM_TOKEN }}
`;

// Milestone workflow that handles feature branch documentation
const milestoneWorkflow = `name: Milestone Documentation

on:
  pull_request:
    types: [closed]
    branches:
      - develop
      - 'release/*'

jobs:
  milestone-docs:
    if: contains(github.event.pull_request.labels.*.name, 'milestone')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Sync milestone documentation
        run: node .docs/scripts/sync-versioned-docs.js --milestone
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
`;

// Update package.json scripts
function updatePackageScripts() {
  const packagePath = path.join(ROOT_DIR, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  pkg.scripts = {
    ...pkg.scripts,
    "docs:sync": "node .docs/scripts/sync-versioned-docs.js",
    "version": "npm run docs:sync && git add docs/",
  };

  fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));
}

// Create necessary directories and files
function setupAutomation() {
  const workflowsDir = path.join(ROOT_DIR, '.github/workflows');
  fs.mkdirSync(workflowsDir, { recursive: true });

  // Write workflow files
  fs.writeFileSync(
    path.join(workflowsDir, 'documentation.yml'),
    docsWorkflow
  );
  
  fs.writeFileSync(
    path.join(workflowsDir, 'publish.yml'),
    publishWorkflow
  );
  
  fs.writeFileSync(
    path.join(workflowsDir, 'milestone.yml'),
    milestoneWorkflow
  );

  // Update package.json
  updatePackageScripts();
}

// Main setup function
function setup() {
  try {
    setupAutomation();
    console.log('✨ Documentation automation successfully integrated');
  } catch (error) {
    console.error('Error setting up documentation automation:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  setup();
}

module.exports = setup;
