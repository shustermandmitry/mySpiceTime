// scripts/update-scripts-with-docs.js
const fs = require('fs');
const path = require('path');

function addDocsToPackageJson(packageJsonPath) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Add documentation scripts
  packageJson.scripts = {
    ...packageJson.scripts,
    "docs:generate": "typedoc",
    "docs:test": "jest --collectCoverage",
    "docs:coverage": "nyc report --reporter=text-lcov > coverage.lcov"
  };

  // Add documentation dependencies
  packageJson.devDependencies = {
    ...packageJson.devDependencies,
    "typedoc": "^0.25.1",
    "typedoc-plugin-markdown": "^3.16.0",
    "jest": "^29.7.0",
    "nyc": "^15.1.0",
    "@types/jest": "^29.5.0"
  };

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

// Update GraphQL Layer Setup
function updateGraphQLSetup() {
  const graphqlSetupPath = 'spicetime-architecture/scripts/setup-graphql-layer.js';
  let content = fs.readFileSync(graphqlSetupPath, 'utf8');

  // Add documentation config
  const graphqlDocsConfig = `
// Documentation configuration
const graphqlDocsConfig = {
  schema: "./schema.graphql",
  output: "./docs/api/graphql",
  documents: ["./src/**/*.graphql", "./src/**/*.ts", "./src/**/*.tsx"],
  plugins: [
    "@graphql-tools/graphql-file-loader",
    "@graphql-tools/documents",
    "@graphql-tools/schema"
  ]
};

// Add documentation generation to setup
writeFile(path.join(PROJECT_ROOT, 'graphql-docs.config.js'), 
  \`module.exports = \${JSON.stringify(graphqlDocsConfig, null, 2)}\`);
`;

  content = content.replace(
    /(const PROJECT_ROOT = .*?;)/,
    `$1\n${graphqlDocsConfig}`
  );

  fs.writeFileSync(graphqlSetupPath, content);
}

// Update Utils Setup
function updateUtilsSetup() {
  const utilsSetupPath = 'spicetime-architecture/scripts/setup-utils.js';
  let content = fs.readFileSync(utilsSetupPath, 'utf8');

  // Add documentation configuration
  const utilsDocsConfig = `
// Documentation configuration
const typedocConfig = {
  entryPoints: ["src/index.ts"],
  out: "docs/api",
  theme: "default",
  plugin: ["typedoc-plugin-markdown"],
  excludePrivate: true,
  excludeProtected: true
};

// Add documentation setup
writeFile(path.join(PROJECT_ROOT, 'typedoc.json'), 
  JSON.stringify(typedocConfig, null, 2));
`;

  content = content.replace(
    /(const PROJECT_ROOT = .*?;)/,
    `$1\n${utilsDocsConfig}`
  );

  fs.writeFileSync(utilsSetupPath, content);
}

// Update Create Spicetime React App Setup
function updateCreateAppSetup() {
  const createAppSetupPath = 'spicetime-architecture/scripts/setup-create-spicetime-react-app.js';
  let content = fs.readFileSync(createAppSetupPath, 'utf8');

  // Add documentation templates
  const docsTemplates = `
// Documentation templates
const componentDocTemplate = \`
/**
 * @component
 * @example
 * \${componentExample}
 * 
 * @prop {string} prop1 - Description of prop1
 * @prop {number} prop2 - Description of prop2
 */
\`;

// Component documentation example
const componentExample = \`
import MyComponent from './MyComponent';

function Example() {
  return <MyComponent prop1="value" prop2={42} />;
}
\`;

// Add documentation generation to template
writeFile(path.join(templatePath, 'docs/components.md'),
  componentDocTemplate.replace('\${componentExample}', componentExample));
`;

  content = content.replace(
    /(const templatePath = .*?;)/,
    `$1\n${docsTemplates}`
  );

  fs.writeFileSync(createAppSetupPath, content);
}

// Main update function
function updateScripts() {
  try {
    // Update all package.json files
    const packageJsonPaths = [
      'spicetime-architecture/package.json',
      'spicetime-architecture/packages/graphql/package.json',
      'spicetime-architecture/packages/utils/package.json',
      'spicetime-architecture/packages/create-spicetime-react-app/package.json'
    ];

    packageJsonPaths.forEach(addDocsToPackageJson);

    // Update individual setup scripts
    updateGraphQLSetup();
    updateUtilsSetup();
    updateCreateAppSetup();

    console.log('✨ Successfully updated setup scripts with documentation generation capabilities');
  } catch (error) {
    console.error('Error updating scripts:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  updateScripts();
}

module.exports = updateScripts;
