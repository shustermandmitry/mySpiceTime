// Example usage of the dogfood testing package
const { createTester, DogfoodCategory } = require('./dogfood-tester');

// Create a tester for your project
const spiceTimeTester = createTester('SpiceTime', {
  projectRoot: './spicetime-ecosystem',
  verbose: true,
});

// Register additional dogfood patterns specific to your project
// Note: selfUsage and incrementalImprovement are already registered by default

spiceTimeTester.registerDogfoodPattern(
  'privateToPublicRatio',
  (project) => {
    // Check the ratio of private core to public interfaces
    // Higher ratio means better encapsulation
    if (!project.sourceStats) return 0;
    
    const privateCode = project.sourceStats.private || 0;
    const publicCode = project.sourceStats.public || 0;
    
    if (privateCode + publicCode === 0) return 0;
    return privateCode / (privateCode + publicCode);
  },
  0.5 // Medium importance
);

spiceTimeTester.registerDogfoodPattern(
  'categoricalConsistency',
  (project) => {
    // Check if the project follows its own categorical architecture
    if (!project.fileAnalysis || !project.fileAnalysis.categories) return 0;
    
    const { adherence } = project.fileAnalysis.categories;
    return adherence || 0;
  },
  0.7 // High-medium importance
);

// Create a test suite
const dogfoodSuite = spiceTimeTester.createDogfoodTestSuite('SpiceTimeEcosystem');

// Example of analyzing a project
async function analyzeProject() {
  // In a real scenario, you would gather this data from the filesystem
  const projectInfo = {
    packageJson: {
      name: '@spicetime/core',
      dependencies: {
        '@spicetime/api': '^1.0.0',
        '@spicetime/node-connector': '^1.0.0',
        'lodash': '^4.17.21'
      },
      devDependencies: {
        '@spicetime/test-utils': '^1.0.0',
        'jest': '^27.0.0'
      }
    },
    sourceStats: {
      private: 12500, // lines of private code
      public: 3800    // lines of public interface code
    },
    fileAnalysis: {
      categories: {
        adherence: 0.85 // 85% adherence to the categorical structure
      }
    }
  };
  
  // Run the dogfood analysis
  const results = await dogfoodSuite.runAnalysis(projectInfo);
  
  console.log('Dogfood Analysis Results:');
  console.log('------------------------');
  console.log(`Overall Score: ${(results.overallScore * 100).toFixed(2)}%`);
  console.log('\nPattern Scores:');
  
  for (const [pattern, score] of Object.entries(results.patterns)) {
    console.log(`- ${pattern}: ${(score * 100).toFixed(2)}%`);
  }
  
  console.log('\nImprovement Suggestions:');
  if (results.suggestions.length === 0) {
    console.log('No suggestions - you\'re eating your dogfood well!');
  } else {
    results.suggestions.forEach(suggestion => {
      console.log(`- [${suggestion.priority.toUpperCase()}] ${suggestion.message}`);
    });
  }
}

// Run the analysis
analyzeProject().catch(console.error);

// Example of integrating with your build system for complete automation
function setupAutomatedTesting() {
  // Create a build integration
  const buildIntegration = dogfoodSuite.integrateWithBuild({
    type: 'webpack',
    config: './webpack.config.js'
  });
  
  // Set up CI integration
  const ciIntegration = dogfoodSuite.integrateWithCI({
    type: 'github-actions',
    workflow: './github/workflows/main.yml'
  });
  
  // Set up temporal tracking
  const progressTracker = dogfoodSuite.trackProgress({
    historyProvider: {
      type: 'git',
      depth: 100 // Last 100 commits
    }
  });
  
  // Now developers can just write code in small increments and the system
  // will automatically test and provide feedback without manual intervention
  console.log('Automated testing configured. Developers can now focus on incremental improvements.');
  
  return {
    buildIntegration,
    ciIntegration,
    progressTracker
  };
}

// Set up the automated testing
const automatedSystem = setupAutomatedTesting();

// Example of extending the tester for a specific domain (like webdev)
function createWebDevDogfoodTester(name, options = {}) {
  const tester = createTester(name, options);
  
  // Add web-specific dogfood patterns
  tester.registerDogfoodPattern(
    'componentReuse',
    (project) => {
      // Measure how much components are reused across the project
      if (!project.componentAnalysis) return 0;
      return project.componentAnalysis.reuseRate || 0;
    },
    0.6
  );
  
  tester.registerDogfoodPattern(
    'storyBookCoverage',
    (project) => {
      // Check if components have corresponding Storybook stories
      if (!project.componentAnalysis) return 0;
      return project.componentAnalysis.storybookCoverage || 0;
    },
    0.4
  );
  
  return tester;
}

// Example usage for a web project
const webTester = createWebDevDogfoodTester('WebComponents', {
  includeStorybook: true,
});

// This shows how the test functor can be specialized for different domains
// while maintaining the core dogfood testing philosophy
