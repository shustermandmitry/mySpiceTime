// scripts/setup-documentation-system.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DOCS_ROOT = 'spicetime-architecture';

// Utility functions
function createDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content);
}

// Directory structure setup
function createDirectoryStructure() {
  const directories = [
    'docs/.generated',
    'docs/architecture/diagrams',
    'docs/architecture/decisions',
    'docs/api/graphql',
    'docs/api/rest',
    'docs/development',
    '.docs/scripts',
    '.docs/templates',
    '.docs/config',
    'website/docs',
    '.github/workflows'
  ];

  directories.forEach(dir => createDirectory(path.join(DOCS_ROOT, dir)));
}

// Configuration files
const remarkConfig = `{
  "plugins": [
    "remark-preset-lint-recommended",
    ["remark-lint-list-item-indent", "space"],
    ["remark-lint-no-dead-urls", { "skipOffline": true }]
  ]
}`;

const typedocConfig = `{
  "entryPoints": ["src/index.ts"],
  "out": "docs/.generated/api",
  "plugin": [
    "typedoc-plugin-markdown",
    "typedoc-plugin-mermaid"
  ],
  "theme": "markdown",
  "excludePrivate": true,
  "excludeProtected": true,
  "excludeExternals": true,
  "mergeModulesMergeMode": "module",
  "validation": {
    "notExported": true,
    "invalidLink": true,
    "notDocumented": true
  }
}`;

const gatsbyConfig = `module.exports = {
  plugins: [
    {
      resolve: 'gatsby-theme-documentation',
      options: {
        basePath: '/',
        contentPath: 'docs'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'docs',
        path: \`\${__dirname}/docs\`
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          'gatsby-remark-mermaid'
        ]
      }
    }
  ]
}`;

const spectralConfig = `{
  "extends": ["spectral:oas", "spectral:asyncapi"],
  "rules": {
    "operation-description": "warn",
    "operation-tags": "error",
    "operation-id": "error"
  }
}`;

const c4BuilderConfig = `module.exports = {
  plantumlVersion: "1.2022.7",
  outDir: "docs/.generated/architecture",
  input: [
    "docs/architecture/diagrams",
    "docs/architecture/decisions"
  ],
  watch: {
    onSuccess: "npm run docs:build"
  }
}`;

const docsPackageJson = `{
  "name": "spicetime-docs",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "docs:generate": "run-p docs:generate:*",
    "docs:generate:api": "typedoc",
    "docs:generate:graphql": "graphql-docs",
    "docs:generate:openapi": "redoc-cli bundle openapi.yaml",
    "docs:generate:diagrams": "c4builder",
    "docs:validate": "run-p docs:validate:*",
    "docs:validate:markdown": "markdownlint docs/**/*.md",
    "docs:validate:links": "markdown-link-check docs/**/*.md",
    "docs:dev": "gatsby develop",
    "docs:build": "gatsby build",
    "docs:serve": "gatsby serve"
  },
  "devDependencies": {
    "@graphql-tools/graphql-file-loader": "^8.0.0",
    "@graphql-tools/load": "^8.0.0",
    "@mermaid-js/mermaid-cli": "^10.4.0",
    "@stoplight/spectral-cli": "^6.11.0",
    "c4builder": "^0.0.2",
    "gatsby": "^5.12.0",
    "gatsby-plugin-mdx": "^5.12.0",
    "gatsby-remark-mermaid": "^4.0.0",
    "gatsby-source-filesystem": "^5.12.0",
    "gatsby-theme-documentation": "^0.2.0",
    "graphql": "^16.8.0",
    "graphql-docs": "^1.2.0",
    "markdownlint-cli": "^0.35.0",
    "markdown-link-check": "^3.11.2",
    "mermaid": "^10.4.0",
    "npm-run-all": "^4.1.5",
    "openapi-types": "^12.1.3",
    "redoc-cli": "^0.13.21",
    "remark-cli": "^11.0.0",
    "remark-lint": "^9.1.2",
    "remark-preset-lint-recommended": "^6.1.3",
    "typedoc": "^0.25.1",
    "typedoc-plugin-markdown": "^3.16.0",
    "typedoc-plugin-mermaid": "^1.10.0"
  }
}`;

const githubWorkflowYaml = `name: Documentation

on:
  push:
    branches: [ main ]
    paths:
      - 'src/**'
      - 'docs/**'
      - 'schema.graphql'

jobs:
  docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Generate Docs
        run: npm run docs:generate
      - name: Validate Docs
        run: npm run docs:validate
      - name: Build Website
        run: npm run docs:build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./website/public`;

// Main setup function
function setup() {
  try {
    // Create directory structure
    createDirectoryStructure();

    // Write configuration files
    writeFile(path.join(DOCS_ROOT, '.remarkrc.json'), remarkConfig);
    writeFile(path.join(DOCS_ROOT, 'typedoc.json'), typedocConfig);
    writeFile(path.join(DOCS_ROOT, 'gatsby-config.js'), gatsbyConfig);
    writeFile(path.join(DOCS_ROOT, '.spectral.json'), spectralConfig);
    writeFile(path.join(DOCS_ROOT, 'c4builder.config.js'), c4BuilderConfig);
    writeFile(path.join(DOCS_ROOT, 'package.json'), docsPackageJson);
    writeFile(path.join(DOCS_ROOT, '.github/workflows/documentation.yml'), githubWorkflowYaml);

    // Initialize git repository if it doesn't exist
    if (!fs.existsSync(path.join(DOCS_ROOT, '.git'))) {
      execSync('git init', { cwd: DOCS_ROOT });
    }

    // Install dependencies
    console.log('Installing dependencies...');
    execSync('npm install', { cwd: DOCS_ROOT, stdio: 'inherit' });

    console.log('✨ Documentation system setup complete!');
    console.log('\nNext steps:');
    console.log('1. Review the generated configuration files');
    console.log('2. Set up your Gatsby documentation website in the website/ directory');
    console.log('3. Add your first documentation files');
    console.log('4. Run npm run docs:dev to start the documentation development server');

  } catch (error) {
    console.error('Error during setup:', error);
    process.exit(1);
  }
}

// Run setup if this script is being run directly
if (require.main === module) {
  setup();
}

module.exports = setup;
