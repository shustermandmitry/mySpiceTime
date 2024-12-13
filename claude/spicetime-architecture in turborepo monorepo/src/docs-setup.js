/**
 * @fileoverview Setup script for SpiceTime documentation system. Creates directory structure,
 * configurations, and automation scripts for maintaining project documentation.
 * @author SpiceTime Team
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/** @constant {string} Root directory for the SpiceTime architecture project */
const DOCS_ROOT = 'spicetime-architecture';

/**
 * Creates a directory if it doesn't exist
 * @param {string} dirPath - Path to the directory to create
 * @throws {Error} If directory creation fails
 */
function createDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Writes a file to disk, creating parent directories if needed
 * @param {string} filePath - Path where the file should be written
 * @param {string} content - Content to write to the file
 * @throws {Error} If file writing fails
 */
function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  createDirectory(dir);
  fs.writeFileSync(filePath, content);
}

/**
 * Creates the documentation system directory structure
 * @throws {Error} If directory creation fails
 */
function createDirectoryStructure() {
  /** @type {string[]} List of directories to create */
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
    'website/docs'
  ];

  directories.forEach(dir => createDirectory(path.join(DOCS_ROOT, dir)));
}

/**
 * Configuration for TypeDoc documentation generator
 * @type {string}
 */
const typedocConfig = `/**
 * @type {import('typedoc').TypeDocOptions}
 */
module.exports = {
  entryPoints: ["src/index.ts"],
  out: "docs/.generated/api",
  theme: "default",
  excludePrivate: true,
  excludeProtected: true,
  excludeExternals: true,
  plugin: [
    "typedoc-plugin-markdown",
    "@mxssfd/typedoc-theme"
  ]
};`;

/**
 * Configuration for GraphQL documentation generator
 * @type {string}
 */
const graphdocConfig = `/**
 * @type {import('@2fd/graphdoc').Config}
 */
module.exports = {
  endpoint: "./schema.graphql",
  output: "./docs/.generated/graphql",
  force: true,
  verbose: true,
  template: ".docs/templates/graphql"
};`;

/**
 * Configuration for C4 architecture diagram builder
 * @type {string}
 */
const c4builderConfig = `/**
 * @type {import('c4builder').Config}
 */
module.exports = {
  plantumlVersion: "1.2022.7",
  outputDirectory: "docs/.generated/architecture",
  diagramFormat: "svg",
  templateDirectory: ".docs/templates/c4"
};`;

/**
 * Script for generating documentation from various sources
 * @type {string}
 */
const generateDocsScript = `/**
 * @fileoverview Generates documentation from TypeScript, GraphQL schema, and architecture diagrams
 */

const typedoc = require('typedoc');
const graphdoc = require('@2fd/graphdoc');
const c4builder = require('c4builder');

/**
 * Generates all project documentation
 * @async
 * @throws {Error} If documentation generation fails
 */
async function generateDocs() {
  // TypeDoc Generation
  const app = new typedoc.Application();
  app.options.addReader(new typedoc.TSConfigReader());
  app.generateDocs(app.expandInputFiles(['src']), 'docs/.generated/api');

  // GraphQL Documentation
  await graphdoc.build(require('../config/graphdoc'));

  // Architecture Documentation
  await c4builder.build(require('../config/c4builder'));
}

generateDocs().catch(console.error);`;

/**
 * Script for validating documentation quality and links
 * @type {string}
 */
const validateDocsScript = `/**
 * @fileoverview Validates documentation quality and checks for broken links
 */

const markdownlint = require('markdownlint');
const linkCheck = require('markdown-link-check');
const glob = require('glob');

/**
 * Validates documentation files
 * @async
 * @throws {Error} If validation fails
 */
async function validateDocs() {
  const files = glob.sync('docs/**/*.md');
  
  // Markdown Linting
  const results = await markdownlint({
    files,
    config: require('../config/markdownlint.json')
  });

  // Link Validation
  await Promise.all(files.map(async (file) => {
    const links = await linkCheck(file);
    console.log(\`Checked links in \${file}\`);
    return links;
  }));
}

validateDocs().catch(console.error);`;

/**
 * Script for watching and automatically updating documentation
 * @type {string}
 */
const syncDocsScript = `/**
 * @fileoverview Watches for changes and updates documentation automatically
 */

const chokidar = require('chokidar');
const { execSync } = require('child_process');

/**
 * Watches files and regenerates documentation on changes
 * @throws {Error} If documentation update fails
 */
function syncDocs() {
  chokidar.watch([
    'src/**/*.ts',
    'src/**/*.tsx',
    'schema.graphql',
    'docs/**/*.md'
  ]).on('change', async (path) => {
    console.log(\`Change detected in \${path}\`);
    try {
      execSync('npm run docs:generate');
      execSync('npm run docs:validate');
    } catch (error) {
      console.error('Error updating documentation:', error);
    }
  });
}

syncDocs();`;

// [Previous configurations remain the same...]

/**
 * Sets up the complete documentation system
 * @throws {Error} If setup fails
 */
function setup() {
  try {
    createDirectoryStructure();

    // Write configurations
    writeFile(path.join(DOCS_ROOT, '.docs/config/typedoc.js'), typedocConfig);
    writeFile(path.join(DOCS_ROOT, '.docs/config/graphdoc.js'), graphdocConfig);
    writeFile(path.join(DOCS_ROOT, '.docs/config/c4builder.js'), c4builderConfig);
    writeFile(path.join(DOCS_ROOT, '.docs/config/markdownlint.json'), markdownlintConfig);

    // Write scripts
    writeFile(path.join(DOCS_ROOT, '.docs/scripts/generate-docs.js'), generateDocsScript);
    writeFile(path.join(DOCS_ROOT, '.docs/scripts/validate-docs.js'), validateDocsScript);
    writeFile(path.join(DOCS_ROOT, '.docs/scripts/sync-docs.js'), syncDocsScript);

    // Write package.json
    writeFile(path.join(DOCS_ROOT, 'package.json'), docsPackageJson);

    // Write GitHub Actions workflow
    writeFile(path.join(DOCS_ROOT, '.github/workflows/documentation.yml'), githubWorkflowYaml);

    // Initialize git repository if needed
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
