function functor(adjunct, name) {
  // Cosmos configuration in closure
  const cosmosConfig = {
    // The cosmological constant - controls rate of expansion/contraction
    lambda: 0.0001,
    
    // Linguistic pressure thresholds
    pressureThresholds: {
      expansion: 0.7,  // Above this creates expansion
      contraction: 0.3,  // Below this creates contraction
      stability: 0.5    // Target for stability
    },
    
    // Linguistic pattern weight
    patternWeights: {
      creation: 1.2,     // Words of creation increase expansion
      reduction: 0.8,    // Words of reduction increase contraction
      balance: 1.0,      // Words of balance stabilize
      chaos: 1.5,        // Words of chaos amplify current direction
      order: 0.5         // Words of order dampen current direction
    },
    
    // Word categories
    wordCategories: {
      creation: new Set(['create', 'expand', 'grow', 'develop', 'increase']),
      reduction: new Set(['reduce', 'contract', 'shrink', 'diminish', 'decrease']),
      balance: new Set(['balance', 'stabilize', 'harmonize', 'center', 'align']),
      chaos: new Set(['chaos', 'disrupt', 'random', 'untamed', 'wild']),
      order: new Set(['order', 'structure', 'system', 'organization', 'pattern'])
    }
  };
  
  // Self-documentation in closure
  const docs = {
    dictionary: new Map([
      ['cosmological constant', 'Parameter controlling space expansion/contraction rate'],
      ['lambda', 'Numeric value of the cosmological constant'],
      ['linguistic pressure', 'Effect of language patterns on space dynamics'],
      ['expansion pressure', 'Tendency of space to expand based on language'],
      ['contraction pressure', 'Tendency of space to contract based on language'],
      ['word category', 'Classification of words by their effect on spatial dynamics']
    ]),
    
    vocabulary: new Map([
      ['adjustLambda', {
        description: 'Directly adjust the cosmological constant',
        usage: ['adjustLambda(value)', 'adjustLambda("+0.001")', 'adjustLambda("-0.0005")'],
        examples: ['adjustLambda(0.002)', 'adjustLambda("+10%")']
      }],
      ['linguisticPressure', {
        description: 'Calculate linguistic pressure from text',
        usage: ['linguisticPressure(text)', 'linguisticPressure(text, options)'],
        examples: ['const pressure = linguisticPressure("expand and grow")', 
                  'linguisticPressure("reduce and stabilize", {detailed: true})']
      }]
    ]),
    
    guide: `# Cosmological Constant Guide

## Overview
The cosmological constant (lambda) controls the fundamental rate of
space expansion or contraction. This can be adjusted through direct
manipulation or through linguistic pressure.

## Core Concepts
1. Lambda - The cosmological constant value
2. Linguistic Pressure - How language affects space
3. Word Categories - How words are classified
4. Expansion/Contraction - The two directions of space evolution
5. Stability - The balance point

## Methods of Control
1. Direct adjustment - Set lambda value manually
2. Linguistic - Use specific language patterns
3. Threshold manipulation - Change trigger points
4. Word categorization - Reclassify words
5. Pattern weights - Adjust impact of categories

## Effects
1. Space expansion/contraction rate
2. Component relationship distance
3. Information propagation speed
4. Entanglement strength
5. Group cohesion dynamics
`
  };
  
  function createNode() {
    const node = {
      bottom: {
        frozen: {},
        proto: {
          // Basic temporal operations
          tic: function(target = null) {
            // Temporal navigation as before
          },
          
          // Documentation access
          get: function(query) {
            if (docs.dictionary.has(query)) {
              return docs.dictionary.get(query);
            }
            
            if (docs.vocabulary.has(query)) {
              const entry = docs.vocabulary.get(query);
              return `${entry.description}\n\nUsage:\n${entry.usage.join('\n')}`;
            }
            
            if (query === 'guide') {
              return docs.guide;
            }
            
            return `Unknown term: ${query}. Try "help" for available documentation.`;
          },
          
          // Guide access
          get guide() { return docs.guide; },
          
          // Add documentation
          alias: function(term, details) {
            if (typeof details === 'string') {
              docs.dictionary.set(term, details);
            } else {
              docs.vocabulary.set(term, details);
            }
            return `Added '${term}' to vocabulary`;
          }
        }
      },
      
      now: {},
      
      workshop: {
        // Cosmos control tools
        cosmos: {
          // Get current lambda
          get lambda() {
            return cosmosConfig.lambda;
          },
          
          // Direct lambda adjustment
          adjustLambda: function(adjustment) {
            let newValue = cosmosConfig.lambda;
            
            // Handle string adjustments like "+0.001" or "-10%"
            if (typeof adjustment === 'string') {
              if (adjustment.includes('%')) {
                // Percentage adjustment
                const percent = parseFloat(adjustment) / 100;
                newValue = cosmosConfig.lambda * (1 + percent);
              } else {
                // Direct addition/subtraction
                newValue = cosmosConfig.lambda + parseFloat(adjustment);
              }
            } else if (typeof adjustment === 'number') {
              // Direct value setting
              newValue = adjustment;
            }
            
            // Ensure lambda is within reasonable bounds
            newValue = Math.max(0, Math.min(1, newValue));
            
            // Set new value
            cosmosConfig.lambda = newValue;
            
            return {
              previous: cosmosConfig.lambda,
              new: newValue,
              change: newValue - cosmosConfig.lambda,
              effect: describeEffect(newValue)
            };
          },
          
          // Calculate linguistic pressure
          linguisticPressure: function(text, options = {}) {
            const words = text.toLowerCase().split(/\W+/).filter(w => w.length > 0);
            let pressure = cosmosConfig.pressureThresholds.stability; // Start at stability
            
            // Count words in each category
            const categoryCounts = {
              creation: 0,
              reduction: 0,
              balance: 0,
              chaos: 0,
              order: 0
            };
            
            // Process each word
            for (const word of words) {
              for (const [category, wordSet] of Object.entries(cosmosConfig.wordCategories)) {
                if (wordSet.has(word)) {
                  categoryCounts[category]++;
                  break;
                }
              }
            }
            
            // Calculate overall pressure
            let totalWeight = 0;
            let weightedPressure = 0;
            
            for (const [category, count] of Object.entries(categoryCounts)) {
              if (count > 0) {
                const weight = cosmosConfig.patternWeights[category] * count;
                totalWeight += weight;
                
                // Different categories affect pressure differently
                switch(category) {
                  case 'creation':
                    weightedPressure += weight * 0.7; // Bias toward expansion
                    break;
                  case 'reduction':
                    weightedPressure += weight * 0.3; // Bias toward contraction
                    break;
                  case 'balance':
                    weightedPressure += weight * 0.5; // Bias toward stability
                    break;
                  case 'chaos':
                    // Amplifies deviation from stability
                    const deviation = Math.abs(pressure - 0.5);
                    weightedPressure += weight * (pressure > 0.5 ? 0.7 + deviation : 0.3 - deviation);
                    break;
                  case 'order':
                    // Pulls toward stability
                    weightedPressure += weight * 0.5;
                    break;
                }
              }
            }
            
            // Calculate final pressure
            if (totalWeight > 0) {
              pressure = weightedPressure / totalWeight;
            }
            
            // Adjust lambda based on pressure
            if (!options.analyzeOnly) {
              if (pressure > cosmosConfig.pressureThresholds.expansion) {
                // Increase lambda (expansion)
                cosmosConfig.lambda *= 1.1;
              } else if (pressure < cosmosConfig.pressureThresholds.contraction) {
                // Decrease lambda (contraction)
                cosmosConfig.lambda *= 0.9;
              }
              
              // Ensure lambda is within bounds
              cosmosConfig.lambda = Math.max(0, Math.min(1, cosmosConfig.lambda));
            }
            
            // Return results
            const result = {
              pressure,
              effect: pressure > 0.6 ? "expansion" : pressure < 0.4 ? "contraction" : "stability",
              lambda: cosmosConfig.lambda
            };
            
            // Include detailed breakdown if requested
            if (options.detailed) {
              result.details = {
                categoryCounts,
                words: words.length,
                weightedPressure,
                totalWeight
              };
            }
            
            return result;
          },
          
          // Categorize a new word
          categorizeWord: function(word, category) {
            word = word.toLowerCase();
            
            // Remove from any existing category
            for (const [cat, wordSet] of Object.entries(cosmosConfig.wordCategories)) {
              wordSet.delete(word);
            }
            
            // Add to new category
            if (cosmosConfig.wordCategories[category]) {
              cosmosConfig.wordCategories[category].add(word);
              return `Added '${word}' to ${category} category`;
            }
            
            return `Invalid category: ${category}`;
          },
          
          // Set category weight
          setCategoryWeight: function(category, weight) {
            if (cosmosConfig.patternWeights[category] !== undefined) {
              cosmosConfig.patternWeights[category] = weight;
              return `Set ${category} weight to ${weight}`;
            }
            
            return `Invalid category: ${category}`;
          },
          
          // Get cosmos status
          status: function() {
            return {
              lambda: cosmosConfig.lambda,
              state: cosmosConfig.lambda > 0.0005 ? "expanding" : 
                    cosmosConfig.lambda < 0.0001 ? "contracting" : "stable",
              thresholds: cosmosConfig.pressureThresholds,
              categories: Object.entries(cosmosConfig.wordCategories).map(([name, words]) => ({
                name,
                words: Array.from(words).slice(0, 5), // Show first 5 words
                weight: cosmosConfig.patternWeights[name]
              }))
            };
          }
        }
      }
    };
    
    return node;
  }
  
  // Helper function for describing lambda effects
  function describeEffect(lambda) {
    if (lambda > 0.001) {
      return "Rapid universal expansion, components drift apart, connections weaken";
    } else if (lambda > 0.0005) {
      return "Moderate expansion, component relationships extend";
    } else if (lambda > 0.0001) {
      return "Slight expansion, gradual stretching of relationships";
    } else if (lambda < 0.00001) {
      return "Strong contraction, dense packing of components, risk of singularity";
    } else if (lambda < 0.00005) {
      return "Moderate contraction, components draw closer";
    } else if (lambda < 0.0001) {
      return "Slight contraction, relationships becoming more tightly bound";
    } else {
      return "Stable, balanced component relationships";
    }
  }
  
  return createNode();
}

// Example usage
const node = functor("parentContext", "cosmic-reality");

// Direct lambda adjustment
const newLambda = node.workshop.cosmos.adjustLambda(0.0008);
console.log(`Lambda adjusted to ${newLambda.new} - Effect: ${newLambda.effect}`);

// Linguistic pressure adjustment
const text = "expand grow develop create new possibilities";
const pressure = node.workshop.cosmos.linguisticPressure(text, { detailed: true });
console.log(`Linguistic pressure: ${pressure.pressure} - Effect: ${pressure.effect}`);

// Add new word to category
node.workshop.cosmos.categorizeWord("flourish", "creation");

// Get current cosmos status
const status = node.workshop.cosmos.status();
console.log(`Current cosmos state: ${status.state} (λ=${status.lambda})`);

// Access documentation
console.log(node.get("cosmological constant"));
console.log(node.guide);