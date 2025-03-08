// Example usage of the WebDevPrinciples functor
const { createPrinciplesTester } = require('./webdev-principles');

// Create a tester for your project
const webDevTester = createPrinciplesTester({
  projectRoot: './your-web-project',
  framework: 'react',
  verbose: true,
});

// Example of analyzing a project
async function analyzeWebProject() {
  // In a real scenario, this would be gathered automatically from the filesystem
  const projectInfo = {
    structure: {
      components: {
        count: 48,
        similar: 12,  // Components with similarity > 70%
        reused: 32,   // Components used in multiple places
      },
      services: {
        count: 15,
        withTests: 10,
      },
      styles: {
        approach: 'css-modules',
        uniqueRules: 320,
        duplicateRules: 85,
      }
    },
    usage: {
      internalTools: {
        usesOwnComponents: true,
        componentReuseRate: 0.75
      },
      documentation: {
        usesOwnComponents: true,
        componentReuseRate: 0.6
      },
      storybook: {
        coverage: 0.8 // 80% of components have stories
      }
    },
    boundaries: {
      uiLogicSeparation: 0.7,  // 70% good separation
      dataLayerIsolation: 0.85,
      presentationContainerSplit: 0.65
    }
  };
  
  // Run the principles evaluation
  const results = await webDevTester.evaluateProject(projectInfo);
  
  console.log('WebDevPrinciples Evaluation Results:');
  console.log('-----------------------------------');
  console.log(`Overall Score: ${(results.scores.overall * 100).toFixed(1)}%`);
  console.log('\nPrinciple Scores:');
  console.log(`- DRY: ${(results.scores.principles.dry * 100).toFixed(1)}%`);
  console.log(`- Dogfooding: ${(results.scores.principles.dogfood * 100).toFixed(1)}%`);
  console.log(`- Separation of Concerns: ${(results.scores.principles.separationOfConcerns * 100).toFixed(1)}%`);
  
  console.log('\nHigh Priority Recommendations:');
  results.guidance.highPriority.forEach((item, i) => {
    console.log(`${i+1}. ${item}`);
  });
  
  console.log('\nMedium Priority Recommendations:');
  results.guidance.mediumPriority.forEach((item, i) => {
    console.log(`${i+1}. ${item}`);
  });
  
  // Also generate automation tools
  console.log('\nAutomation Tools Generated:');
  console.log(`- ESLint Rules: ${results.automation.lintRules.length}`);
  console.log(`- CI Checks: Available for ${Object.keys(results.automation.ciChecks.configuration).join(', ')}`);
  console.log(`- Code Templates: ${Object.keys(results.automation.codeGenTemplates).length} templates available`);
  
  return results;
}

// Setup for automated CI integration
function setupAutomatedPrinciplesChecking() {
  // Generate project scaffold based on principles
  const scaffold = webDevTester.generateProjectScaffold({
    framework: 'react',
    cssApproach: 'styled-components',
    routing: 'react-router',
    ci: 'github'
  });
  
  console.log('Generated Scaffold Structure:');
  console.log(JSON.stringify(scaffold.structure, null, 2));
  
  // Create CI configuration
  const ciConfig = webDevTester.evaluateProject({}).automation.ciChecks.configuration.github;
  
  console.log('\nCI Configuration Generated:');
  console.log(ciConfig);
  
  return scaffold;
}

// Demonstrate both analysis and scaffold generation
async function demonstrateWebDevPrinciples() {
  console.log('1. Analyzing existing project...\n');
  const analysisResults = await analyzeWebProject();
  
  console.log('\n2. Generating project scaffold...\n');
  const scaffold = setupAutomatedPrinciplesChecking();
  
  console.log('\nAll operations completed successfully!');
  
  return {
    analysis: analysisResults,
    scaffold
  };
}

// Run the demonstration
demonstrateWebDevPrinciples().catch(console.error);

// Example of extending the tester for a specific framework
function createNextJSPrinciplesTester() {
  const baseTester = createPrinciplesTester({ framework: 'react' });
  
  // Extend with Next.js specific patterns
  baseTester.dryCategory.nextJsPatterns = [
    'shared-layouts',
    'page-components',
    'api-handlers'
  ];
  
  // Add Next.js specific guidance
  const originalEvaluate =