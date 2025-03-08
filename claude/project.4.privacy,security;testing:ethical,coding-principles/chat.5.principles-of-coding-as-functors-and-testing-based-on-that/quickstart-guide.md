# WebDevPrinciples: Quick Start Guide

> **Note**: This document will soon be irrelevant as the WebDevPrinciples functor itself will automate the entire process described below. The system is evolving toward self-application, where the functor will analyze your project, implement its own recommendations, and continuously improve your codebase with minimal human intervention.

This guide will help you get up and running with WebDevPrinciples to evaluate, improve, and automate your web development processes. No category theory knowledge required!

## Installation

```bash
npm install webdev-principles
```

## 5-Minute Start

### Analyze Your Existing Project

```javascript
const { createPrinciplesTester } = require('webdev-principles');

// Create a tester for your framework
const tester = createPrinciplesTester({
  projectRoot: './your-project-path',
  framework: 'react' // or 'vue', 'angular', etc.
});

// Run the analysis
async function analyzeProject() {
  const results = await tester.evaluateProject();
  
  // Print scores
  console.log(`Overall Score: ${(results.scores.overall * 100).toFixed(1)}%`);
  console.log(`DRY Score: ${(results.scores.principles.dry * 100).toFixed(1)}%`);
  console.log(`Dogfooding Score: ${(results.scores.principles.dogfood * 100).toFixed(1)}%`);
  console.log(`Separation of Concerns Score: ${(results.scores.principles.separationOfConcerns * 100).toFixed(1)}%`);
  
  // Get high priority recommendations
  console.log('\nKey Recommendations:');
  results.guidance.highPriority.forEach((item, i) => {
    console.log(`${i+1}. ${item}`);
  });
}

analyzeProject();
```

### Generate Linting Rules

```javascript
async function setupLinting() {
  const results = await tester.evaluateProject();
  
  // Generate ESLint rules
  const lintRules = results.automation.lintRules;
  
  // Write to .eslintrc.js
  const eslintConfig = `
module.exports = {
  rules: {
    ${lintRules.map(rule => 
      `'${rule.name}': ['${rule.level}'${rule.options ? `, ${JSON.stringify(rule.options)}` : ''}]`
    ).join(',\n    ')}
  }
};`;

  fs.writeFileSync('.eslintrc.js', eslintConfig);
  console.log('ESLint configuration generated!');
}
```

### Add to CI Pipeline

```javascript
async function setupCI() {
  const results = await tester.evaluateProject();
  
  // Get GitHub Actions configuration
  const githubConfig = results.automation.ciChecks.configuration.github;
  
  // Ensure directory exists
  if (!fs.existsSync('.github/workflows')) {
    fs.mkdirSync('.github/workflows', { recursive: true });
  }
  
  // Write config
  fs.writeFileSync('.github/workflows/principles-check.yml', githubConfig);
  console.log('GitHub Actions workflow created!');
}
```

## Core Concepts

WebDevPrinciples evaluates your project against three fundamental principles:

### 1. DRY (Don't Repeat Yourself)

Measures how well your code avoids duplication through:
- Component reuse
- Utility abstraction
- Pattern consistency

### 2. Dogfooding

Measures how well your project uses its own components by analyzing:
- Internal tool implementation
- Documentation site construction
- Developer experience tools

### 3. Separation of Concerns

Measures how cleanly your code separates different responsibilities:
- UI vs. logic separation
- Data layer isolation
- Component boundaries

## Key Features

### Project Analysis

```javascript
// Detailed analysis with all metrics
const detailedResults = await tester.evaluateProject({
  detailed: true,
  includeFiles: true
});

// Print detailed component metrics
console.log('Component Analysis:');
console.log(JSON.stringify(detailedResults.details.dry.components, null, 2));
```

### Project Scaffolding

```javascript
// Generate a project structure based on principles
const scaffold = tester.generateProjectScaffold({
  framework: 'react',
  cssApproach: 'styled-components',
  stateManagement: 'redux',
  routing: 'react-router'
});

// Print the recommended structure
console.log(JSON.stringify(scaffold.structure, null, 2));

// Generate starter files
function generateFiles(scaffold, basePath = '') {
  // Implementation to create directories and files
  // based on scaffold structure
}
```

### Code Templates

```javascript
// Get code templates
const templates = tester.evaluateProject({}).automation.codeGenTemplates;

// Create a new component file
const componentContent = templates.component
  .replace('Component', 'UserProfile')
  .replace('Component description', 'Displays user profile information');

fs.writeFileSync('./src/components/UserProfile.jsx', componentContent);
```

## Framework-Specific Usage

### React

```javascript
const reactTester = createPrinciplesTester({ 
  framework: 'react',
  reactOptions: {
    hooks: true,
    typescript: true,
    stateManagement: 'context'
  }
});
```

### Vue

```javascript
const vueTester = createPrinciplesTester({ 
  framework: 'vue',
  vueOptions: {
    version: 3,
    composition: true
  }
});
```

### Angular

```javascript
const angularTester = createPrinciplesTester({ 
  framework: 'angular',
  angularOptions: {
    standalone: true
  }
});
```

## CLI Usage

WebDevPrinciples also comes with a command-line interface:

```bash
# Install globally
npm install -g webdev-principles

# Analyze current project
webdev-principles analyze

# Generate reports
webdev-principles analyze --report html

# Create a new project with best practices
webdev-principles create my-new-project --framework react

# Add lint rules to existing project
webdev-principles lint --fix

# Setup CI integration
webdev-principles ci github
```

## Visual Studio Code Extension

For real-time feedback, install the VS Code extension:

1. Open VS Code
2. Go to Extensions
3. Search for "WebDevPrinciples"
4. Install and reload

The extension provides:
- Real-time principle scoring
- In-editor recommendations
- Quick fixes for common issues
- Template generation shortcuts

## Common Workflows

### 1. Improving an Existing Project

```bash
# Analyze the project
webdev-principles analyze --report html

# Generate lint rules
webdev-principles lint

# Add to CI pipeline
webdev-principles ci
```

### 2. Starting a New Project with Best Practices

```bash
# Create scaffold with best practices built in
webdev-principles create my-new-project --framework react

# The generated project already includes:
# - Component structure following principles
# - Linting rules pre-configured
# - CI setup ready to go
# - Documentation templates
```

### 3. Gradual Adoption

```bash
# Start with analysis only
webdev-principles analyze

# Add lint rules for just one principle
webdev-principles lint --principle dry

# Gradually add other principles
webdev-principles lint --principle soc
```

## Advanced Configuration

Create a `webdev-principles.config.js` file for custom settings:

```javascript
module.exports = {
  framework: 'react',
  weights: {
    dry: 0.4,
    dogfood: 0.3,
    soc: 0.3
  },
  thresholds: {
    componentComplexity: 15,
    maximumNesting: 3,
    minimumTestCoverage: 80
  },
  ignore: [
    'legacy/**',
    'vendor/**'
  ],
  custom: {
    // Custom principle configuration
  }
};
```

## Next Steps

After getting started:

1. **Explore the detailed metrics** in the HTML reports
2. **Integrate with your existing tooling** through the API
3. **Customize the weights** for principles based on your team's priorities
4. **Gradually improve your scores** by addressing high-priority recommendations

## Getting Help

- **Documentation**: [https://webdev-principles.dev/docs](https://webdev-principles.dev/docs)
- **GitHub**: [https://github.com/webdev-principles/webdev-principles](https://github.com/webdev-principles/webdev-principles)
- **Community**: [https://discord.gg/webdev-principles](https://discord.gg/webdev-principles)

## Quick Reference

### Key Commands

```bash
# Analysis
webdev-principles analyze
webdev-principles analyze --detailed
webdev-principles analyze --report html

# Automation
webdev-principles lint
webdev-principles ci
webdev-principles template component MyComponent

# Project creation
webdev-principles create my-project
```

### API Quick Reference

```javascript
// Create tester
const tester = createPrinciplesTester(options);

// Analyze
const results = await tester.evaluateProject();

// Get recommendations
const recommendations = results.guidance.highPriority;

// Generate automation
const lintRules = results.automation.lintRules;
const ciConfig = results.automation.ciChecks.configuration.github;
const templates = results.automation.codeGenTemplates;

// Generate scaffold
const scaffold = tester.generateProjectScaffold(options);
```
