function functor(adjunct, name) {
  // Context and alias maps in closure
  const contexts = {
    tech: {
      'run': ['execute', 'compile', 'crash', 'buffer'],
      'eat': ['consume', 'process', 'byte', 'buffer'],
      'fast': ['optimized', 'cached', 'quantum', 'threaded'],
      'dog': ['bug', 'bot', 'daemon', 'parser'],
      'jump': ['overflow', 'exception', 'stack', 'hop']
    },
    nature: {
      'run': ['flow', 'bloom', 'grow', 'sprout'],
      'eat': ['absorb', 'photosynthesize', 'decompose'],
      'fast': ['wind-like', 'river-quick', 'lightning'],
      'dog': ['wolf', 'fox', 'beaver', 'squirrel'],
      'jump': ['leap', 'spring', 'bounce', 'flutter']
    },
    business: {
      'run': ['manage', 'leverage', 'streamline', 'optimize'],
      'eat': ['acquire', 'merge', 'consume', 'capitalize'],
      'fast': ['agile', 'lean', 'disrupting', 'pivoting'],
      'dog': ['entrepreneur', 'stakeholder', 'consultant'],
      'jump': ['innovate', 'disrupt', 'scale', 'pivot']
    },
    space: {
      'run': ['orbit', 'launch', 'accelerate', 'warp'],
      'eat': ['absorb', 'consume', 'collapse', 'implode'],
      'fast': ['relativistic', 'superluminal', 'quantum'],
      'dog': ['alien', 'being', 'entity', 'lifeform'],
      'jump': ['warp', 'teleport', 'quantum-leap']
    }
  };

  // Self documentation
  const docs = {
    dictionary: new Map([
      ['humor functor', 'Generates humor through context shifting'],
      ['context shift', 'Applying random contexts to words'],
      ['alias substitution', 'Replacing words with random contextual aliases']
    ]),

    vocabulary: new Map([
      ['humorize', {
        description: 'Transform text through random context shifts',
        usage: ['humorize(text)', 'humorize(text, {contexts: ["tech", "nature"]})'],
        examples: [
          'Input: "The fast dog runs"',
          'Output: "The quantum squirrel orbits"',
          '(tech:fast → quantum, nature:dog → squirrel, space:run → orbit)'
        ]
      }]
    ]),

    guide: `# Humor Functor User Guide

## Overview
The humor functor generates amusing text by shifting words through
random contexts and selecting unexpected but semantically related aliases.

## Example Transformations

1. Original: "The dog runs fast"
   Humor: "The daemon pivots quantum"
   Contexts: [tech:dog, business:run, tech:fast]

2. Original: "Time to eat lunch"
   Humor: "Spacetime to photosynthesize stakeholders"
   Contexts: [space:time, nature:eat, business:lunch]

3. Original: "Jump over the fence"
   Humor: "Quantum-leap over the firewall"
   Contexts: [space:jump, unchanged:over, tech:fence]

## How It Works
1. Each word is assigned a random context
2. Words are replaced with random aliases from their context
3. Grammar structure is preserved
4. Some words may remain unchanged for coherence

## Context Categories
- Tech: Computing and software terms
- Nature: Natural world and biology
- Business: Corporate and startup jargon
- Space: Astronomical and physics terms

## Usage Tips
1. Longer sentences provide more opportunities for humor
2. Technical terms often create amusing business contexts
3. Nature terms in tech context can be particularly funny
4. Space terms add cosmic significance to mundane activities`
  };

  function createNode() {
    const node = {
      bottom: {
        frozen: {},
        proto: {
          get: function(query) {
            return docs.dictionary.get(query) || 
                   docs.vocabulary.get(query)?.description ||
                   (query === 'guide' ? docs.guide : 'Unknown term');
          }
        }
      },
      now: {},
      workshop: {
        humor: {
          // Transform text through context shifting
          humorize: function(text, options = {}) {
            const words = text.split(/\b/);
            const availableContexts = options.contexts || 
                                    Object.keys(contexts);
            
            // Keep track of chosen contexts for explanation
            const contextChoices = new Map();
            
            const transformed = words.map(word => {
              // Skip whitespace and punctuation
              if (!/^\w+$/.test(word)) return word;
              
              // Randomly decide whether to transform
              if (Math.random() < 0.8) { // 80% chance of transformation
                // Pick random context
                const context = availableContexts[
                  Math.floor(Math.random() * availableContexts.length)
                ];
                
                // Find possible aliases
                const aliases = contexts[context]?.[word.toLowerCase()];
                
                if (aliases) {
                  // Record the transformation
                  contextChoices.set(word, `${context}:${word}`);
                  
                  // Return random alias
                  return aliases[Math.floor(Math.random() * aliases.length)];
                }
              }
              
              return word;
            });
            
            return {
              original: text,
              humor: transformed.join(''),
              contexts: Array.from(contextChoices.entries())
                .map(([word, context]) => `${context} → ${transformed.find(t => t !== word)}`)
            };
          },

          // Add new context
          addContext: function(name, mappings) {
            contexts[name] = mappings;
            return `Added ${name} context with ${Object.keys(mappings).length} mappings`;
          },

          // Add word to context
          addWord: function(context, word, aliases) {
            if (contexts[context]) {
              contexts[context][word] = aliases;
              return `Added '${word}' to ${context} context`;
            }
            return `Context ${context} not found`;
          }
        }
      }
    };

    return node;
  }

  return createNode();
}

// Example usage
const node = functor("parent", "humor-space");

// Generate humor
const humor = node.workshop.humor.humorize(
  "The fast dog runs and jumps"
);
console.log(humor);
// Might output: 
// {
//   original: "The fast dog runs and jumps",
//   humor: "The quantum daemon orbits and teleports",
//   contexts: [
//     "tech:fast → quantum",
//     "tech:dog → daemon",
//     "space:run → orbit",
//     "space:jump → teleport"
//   ]
// }

// Add new context
node.workshop.humor.addContext("pirates", {
  run: ["sail", "navigate", "plunder"],
  fast: ["swift-as-wind", "flying", "racing"],
  dog: ["parrot", "mate", "scallywag"]
});

// Get documentation
console.log(node.get("guide"));