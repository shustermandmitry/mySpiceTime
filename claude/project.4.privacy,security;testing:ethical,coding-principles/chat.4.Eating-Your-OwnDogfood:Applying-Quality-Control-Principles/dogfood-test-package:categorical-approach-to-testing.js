// @ts-check
/**
 * DogfoodTester - A categorical approach to testing
 * Measures how well a project "eats its own dogfood" while providing
 * traditional testing capabilities enhanced with categorical principles.
 */

// Base Category for dogfood testing
class DogfoodCategory {
  /**
   * @typedef {Object} TestResult
   * @property {string} name - Name of the test
   * @property {boolean} passed - Whether the test passed
   * @property {number} dogfoodScore - Score from 0-1 indicating dogfood usage
   */

  /**
   * Creates a new DogfoodCategory
   * @param {string} name - Category name
   */
  constructor(name) {
    this.name = name;
    this.tests = [];
    this.morphisms = new Map(); // Maps between test objects
  }

  /**
   * Add a test to this category
   * @param {string} name - Test name
   * @param {Function} testFn - Test function
   * @param {Object} options - Test options
   * @returns {this}
   */
  addTest(name, testFn, options = {}) {
    this.tests.push({ name, testFn, options });
    return this;
  }

  /**
   * Define a morphism between tests
   * @param {string} sourceTest - Source test name
   * @param {string} targetTest - Target test name
   * @param {Function} morphismFn - Transformation function
   * @returns {this}
   */
  defineMorphism(sourceTest, targetTest, morphismFn) {
    const key = `${sourceTest}->${targetTest}`;
    this.morphisms.set(key, morphismFn);
    return this;
  }

  /**
   * Run tests in this category
   * @returns {Promise<TestResult[]>}
   */
  async runTests() {
    const results = [];
    for (const test of this.tests) {
      try {
        const result = await test.testFn();
        const dogfoodScore = this.calculateDogfoodScore(test, result);
        results.push({
          name: test.name,
          passed: result === true || (typeof result === 'object' && result.passed),
          dogfoodScore
        });
      } catch (error) {
        results.push({
          name: test.name,
          passed: false,
          dogfoodScore: 0,
          error: error.message
        });
      }
    }
    return results;
  }

  /**
   * Calculate how well this test eats its own dogfood
   * @param {Object} test - Test object
   * @param {any} result - Test result
   * @returns {number} Score from 0-1
   */
  calculateDogfoodScore(test, result) {
    // Default implementation - override in subclasses
    return 0.5;
  }
}

// DogfoodFunctor - Transforms one category to another
class DogfoodFunctor {
  /**
   * @param {DogfoodCategory} sourceCategory - Source category
   * @param {DogfoodCategory} targetCategory - Target category  
   */
  constructor(sourceCategory, targetCategory) {
    this.sourceCategory = sourceCategory;
    this.targetCategory = targetCategory;
    this.objectMappings = new Map();
    this.morphismMappings = new Map();
  }

  /**
   * Map a test from source to target category
   * @param {string} sourceTest - Source test name
   * @param {string} targetTest - Target test name
   * @returns {this}
   */
  mapObject(sourceTest, targetTest) {
    this.objectMappings.set(sourceTest, targetTest);
    return this;
  }

  /**
   * Apply this functor to transform results
   * @param {Array} sourceResults - Results from source category
   * @returns {Array} Transformed results
   */
  apply(sourceResults) {
    return sourceResults.map(result => {
      const targetName = this.objectMappings.get(result.name) || result.name;
      return {
        ...result,
        name: targetName,
        // Transform other properties as needed
      };
    });
  }
}

// TestFunctor - Extends DogfoodFunctor with testing utilities
class TestFunctor extends DogfoodFunctor {
  /**
   * @param {DogfoodCategory} sourceCategory - Source category
   * @param {DogfoodCategory} targetCategory - Target category
   * @param {Object} options - Testing options
   */
  constructor(sourceCategory, targetCategory, options = {}) {
    super(sourceCategory, targetCategory);
    this.options = options;
    this.assertions = new Map();
    this.metrics = [];
  }

  /**
   * Add an assertion method to this test functor
   * @param {string} name - Assertion name
   * @param {Function} assertFn - Assertion function
   * @returns {this}
   */
  addAssertion(name, assertFn) {
    this.assertions.set(name, assertFn);
    return this;
  }

  /**
   * Add a metric to evaluate tests
   * @param {string} name - Metric name
   * @param {Function} metricFn - Function to calculate metric
   * @returns {this}
   */
  addMetric(name, metricFn) {
    this.metrics.push({ name, metricFn });
    return this;
  }

  /**
   * Create assertion methods on an object
   * @param {Object} target - Target object to add assertions to
   * @returns {Object} Target with assertions added
   */
  createAssertions(target = {}) {
    for (const [name, assertFn] of this.assertions.entries()) {
      target[name] = assertFn;
    }
    return target;
  }

  /**
   * Evaluate results using all registered metrics
   * @param {Array} results - Test results
   * @returns {Object} Metrics evaluation
   */
  evaluateMetrics(results) {
    const evaluation = {};
    for (const metric of this.metrics) {
      evaluation[metric.name] = metric.metricFn(results);
    }
    return evaluation;
  }
}

// Mixin to enhance TestFunctor with dogfood pattern functionality
const dogfoodFunctorMixin = (TestFunctorClass) => {
  return class DogfoodEnhancedTestFunctor extends TestFunctorClass {
    constructor(...args) {
      super(...args);
      this.dogfoodPatterns = [];
      this.selfUseMetrics = new Map();
      
      // Add default dogfood metrics
      this.addMetric('dogfoodConsumption', this.calculateOverallDogfoodConsumption.bind(this));
      this.addMetric('selfReferentialUse', this.calculateSelfReferentialUse.bind(this));
      
      // Register core dogfood patterns that are always present
      this.registerDogfoodPattern(
        'selfUsage',
        (project) => this.calculateSelfUsage(project.packageJson),
        1.0 // Highest importance - fundamental principle
      );
      
      this.registerDogfoodPattern(
        'incrementalImprovement',
        this.measureIncrementalImprovement.bind(this),
        0.8 // High importance - core temporal aspect
      );
    }

    /**
     * Register a dogfood pattern to detect
     * @param {string} name - Pattern name
     * @param {Function} detectorFn - Function to detect pattern
     * @param {number} weight - Pattern importance (0-1)
     * @returns {this}
     */
    registerDogfoodPattern(name, detectorFn, weight = 1) {
      this.dogfoodPatterns.push({ name, detectorFn, weight });
      return this;
    }

    /**
     * Calculate how much a project uses its own components
     * @param {Object} packageJson - Package.json contents
     * @returns {number} Score from 0-1
     */
    calculateSelfUsage(packageJson) {
      if (!packageJson || !packageJson.dependencies) return 0;
      
      const ownScope = this.getPackageScope(packageJson.name);
      if (!ownScope) return 0;
      
      const allDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies
      };
      
      const ownDeps = Object.keys(allDeps).filter(dep => 
        dep.startsWith(ownScope) || 
        (packageJson.workspaces && this.isWorkspaceDependency(dep, packageJson.workspaces))
      );
      
      // Return ratio of own dependencies to all dependencies
      return ownDeps.length / Object.keys(allDeps).length;
    }
    
    /**
     * Extract scope from package name
     * @param {string} packageName - Package name
     * @returns {string|null} Scope or null
     */
    getPackageScope(packageName) {
      if (!packageName) return null;
      const match = packageName.match(/^(@[^/]+)\/.+$/);
      return match ? match[1] : null;
    }
    
    /**
     * Check if dependency is in workspace
     * @param {string} dep - Dependency name
     * @param {Array|Object} workspaces - Workspace configuration
     * @returns {boolean}
     */
    isWorkspaceDependency(dep, workspaces) {
      // Implementation depends on workspace structure
      // Simple check for demonstration purposes
      const patterns = Array.isArray(workspaces) ? workspaces : 
                      (workspaces.packages || []);
                      
      // Simplistic check - in practice, would use glob matching
      return patterns.some(pattern => dep.includes(pattern.replace('/*', '')));
    }

    /**
     * Calculate overall dogfood consumption from test results
     * @param {Array} results - Test results
     * @returns {number} Overall score from 0-1
     */
    calculateOverallDogfoodConsumption(results) {
      if (!results || !results.length) return 0;
      
      const sum = results.reduce((acc, result) => 
        acc + (result.dogfoodScore || 0), 0);
        
      return sum / results.length;
    }

    /**
     * Calculate how self-referential the codebase is
     * @param {Object} projectInfo - Project information
     * @returns {number} Score from 0-1
     */
    calculateSelfReferentialUse(projectInfo) {
      if (!projectInfo || !projectInfo.packageJson) return 0;
      
      const selfUsage = this.calculateSelfUsage(projectInfo.packageJson);
      const testUsage = this.calculateTestCoverage(projectInfo.testFiles, projectInfo.sourceFiles);
      
      return (selfUsage * 0.7) + (testUsage * 0.3);
    }
    
    /**
     * Calculate test coverage for project files
     * @param {Array} testFiles - Test files
     * @param {Array} sourceFiles - Source files
     * @returns {number} Coverage from 0-1
     */
    calculateTestCoverage(testFiles, sourceFiles) {
      if (!testFiles || !sourceFiles || !testFiles.length || !sourceFiles.length) return 0;
      
      // Simple implementation - in practice would analyze imports
      const normalizedSourceFiles = sourceFiles.map(f => this.normalizeFilename(f));
      const testSourceRefs = testFiles.filter(tf => {
        const content = this.getFileContent(tf);
        return normalizedSourceFiles.some(sf => content.includes(sf));
      }).length;
      
      return testSourceRefs / sourceFiles.length;
    }
    
    /**
     * Normalize a filename for comparison
     * @param {string} filename - Filename
     * @returns {string} Normalized filename
     */
    normalizeFilename(filename) {
      // Remove extension and path
      return filename.split('/').pop().split('.')[0];
    }
    
    /**
     * Get file content - stub implementation
     * @param {string} filename - Filename
     * @returns {string} File content
     */
    getFileContent(filename) {
      // In real implementation, would read file from fs
      return '';
    }

    /**
     * Analyze project for dogfood patterns
     * @param {Object} project - Project information
     * @returns {Object} Analysis results
     */
    analyzeDogfoodUsage(project) {
      const ratings = {};
      let totalScore = 0;
      let totalWeight = 0;
      
      for (const pattern of this.dogfoodPatterns) {
        const score = pattern.detectorFn(project);
        ratings[pattern.name] = score;
        totalScore += score * pattern.weight;
        totalWeight += pattern.weight;
      }
      
      return {
        patterns: ratings,
        overallScore: totalWeight ? totalScore / totalWeight : 0,
        suggestions: this.generateSuggestions(ratings)
      };
    }
    
    /**
     * Generate improvement suggestions based on ratings
     * @param {Object} ratings - Pattern ratings
     * @returns {Array} Suggestions
     */
    generateSuggestions(ratings) {
      const suggestions = [];
      
      // Core suggestions based on fundamental dogfood principles
      if (ratings.selfUsage < 0.3) {
        suggestions.push({
          pattern: 'selfUsage',
          message: 'Consider using more of your own packages as dependencies',
          priority: 'high',
          implementationTip: 'Before adding external dependencies, check if you can use one of your own packages'
        });
      }
      
      if (ratings.incrementalImprovement < 0.5) {
        suggestions.push({
          pattern: 'incrementalImprovement',
          message: 'Work in smaller increments and validate each step',
          priority: 'high',
          implementationTip: 'Make smaller commits that each represent a testable improvement'
        });
      }
      
      if (ratings.testCoverage < 0.5) {
        suggestions.push({
          pattern: 'testCoverage',
          message: 'Increase test coverage by testing more of your components',
          priority: 'medium',
          implementationTip: 'Add tests for recently modified components first'
        });
      }
      
      return suggestions;
    }

    /**
     * Create a test suite that implements the dogfood testing pattern
     * @param {string} name - Suite name
     * @returns {Object} Configured test suite
     */
    createDogfoodTestSuite(name) {
      return {
        name,
        patterns: this.dogfoodPatterns.map(p => p.name),
        async runAnalysis(project) {
          return this.analyzeDogfoodUsage(project);
        }.bind(this),
        // Automated integration methods that don't require developer intervention
        integrateWithBuild(buildSystem) {
          // Hook into the build system to automatically run analysis
          return {
            beforeBuild: async () => this.runPreBuildAnalysis(),
            afterBuild: async (artifacts) => this.runPostBuildAnalysis(artifacts)
          };
        },
        
        integrateWithCI(ciConfig) {
          // Set up CI integration for automated dogfood testing
          return {
            generateConfig: () => this.generateCIConfiguration(ciConfig),
            reporters: this.createCIReporters()
          };
        },
        
        // Temporal resolution - track improvements over time
        trackProgress(historyProvider) {
          return {
            getHistoricalTrend: async () => this.calculateHistoricalTrend(historyProvider),
            predictFutureAdherence: async () => this.predictFutureAdherence(historyProvider)
          };
        }
      };
    },
    
    /**
     * Measure how well the project improves incrementally over time
     * @param {Object} project - Project information including history
     * @returns {number} Score from 0-1
     */
    measureIncrementalImprovement(project) {
      if (!project.history || !project.history.commits) return 0.5; // Default midpoint if no history
      
      // Analyze commit patterns
      const commits = project.history.commits;
      
      // Metrics for good incremental development
      const avgCommitSize = this.calculateAverageCommitSize(commits);
      const commitFrequency = this.calculateCommitFrequency(commits);
      const incrementalityScore = this.calculateIncrementalityScore(commits);
      
      // Combine metrics (smaller commits, regular frequency, incremental changes get higher scores)
      return (
        this.normalizeCommitSize(avgCommitSize) * 0.4 +
        this.normalizeCommitFrequency(commitFrequency) * 0.2 +
        incrementalityScore * 0.4
      );
    },
    
    /**
     * Calculate average commit size
     * @param {Array} commits - Commit history
     * @returns {number} Average size
     */
    calculateAverageCommitSize(commits) {
      if (!commits || !commits.length) return 0;
      
      const totalChanges = commits.reduce((sum, commit) => 
        sum + (commit.additions || 0) + (commit.deletions || 0), 0);
        
      return totalChanges / commits.length;
    },
    
    /**
     * Normalize commit size to a 0-1 score (smaller is better, up to a point)
     * @param {number} avgSize - Average commit size
     * @returns {number} Normalized score
     */
    normalizeCommitSize(avgSize) {
      // Ideal commit size around 100-300 changes
      if (avgSize < 50) return 0.7; // Too small can be inefficient
      if (avgSize < 300) return 1.0; // Ideal range
      if (avgSize < 500) return 0.8;
      if (avgSize < 1000) return 0.6;
      if (avgSize < 2000) return 0.3;
      return 0.1; // Very large commits are hard to review and test
    },
    
    /**
     * Calculate commit frequency
     * @param {Array} commits - Commit history
     * @returns {number} Average days between commits
     */
    calculateCommitFrequency(commits) {
      if (!commits || commits.length < 2) return 0;
      
      // Sort by date
      const sortedCommits = [...commits].sort((a, b) => 
        new Date(a.date) - new Date(b.date));
      
      // Calculate time between commits
      let totalDays = 0;
      for (let i = 1; i < sortedCommits.length; i++) {
        const prev = new Date(sortedCommits[i-1].date);
        const curr = new Date(sortedCommits[i].date);
        const diffDays = (curr - prev) / (1000 * 60 * 60 * 24);
        totalDays += diffDays;
      }
      
      return totalDays / (sortedCommits.length - 1);
    },
    
    /**
     * Normalize commit frequency to a 0-1 score
     * @param {number} avgDays - Average days between commits
     * @returns {number} Normalized score
     */
    normalizeCommitFrequency(avgDays) {
      if (avgDays < 0.1) return 0.5; // Too frequent could indicate chaotic development
      if (avgDays < 1) return 1.0; // Daily commits are ideal
      if (avgDays < 2) return 0.9;
      if (avgDays < 3) return 0.7;
      if (avgDays < 7) return 0.5;
      if (avgDays < 14) return 0.3;
      return 0.1; // Very infrequent commits indicate lack of incremental development
    },
    
    /**
     * Calculate how incremental the development process is
     * @param {Array} commits - Commit history
     * @returns {number} Score from 0-1
     */
    calculateIncrementalityScore(commits) {
      if (!commits || !commits.length) return 0;
      
      // Check if commits build on each other incrementally
      // This is a simplified version - real implementation would analyze file changes
      
      // Count how many commits modify the same files as previous commits
      let incrementalCommits = 0;
      const touchedFiles = new Set();
      
      for (const commit of commits) {
        const files = commit.files || [];
        let incrementalCommit = false;
        
        for (const file of files) {
          if (touchedFiles.has(file)) {
            incrementalCommit = true;
          }
          touchedFiles.add(file);
        }
        
        if (incrementalCommit) {
          incrementalCommits++;
        }
      }
      
      return incrementalCommits / commits.length;
    }
  };
};

// Create the enhanced TestFunctor with dogfood functionality
const DogfoodTestFunctor = dogfoodFunctorMixin(TestFunctor);

// Export the final API
module.exports = {
  DogfoodCategory,
  DogfoodFunctor,
  TestFunctor,
  DogfoodTestFunctor,
  createTester(name, options = {}) {
    const sourceCategory = new DogfoodCategory(`${name}Source`);
    const targetCategory = new DogfoodCategory(`${name}Target`);
    return new DogfoodTestFunctor(sourceCategory, targetCategory, options);
  }
};
