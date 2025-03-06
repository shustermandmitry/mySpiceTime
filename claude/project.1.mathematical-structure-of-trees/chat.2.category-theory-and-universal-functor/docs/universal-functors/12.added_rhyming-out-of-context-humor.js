function functor(adjunct, name) {
  // Rhyme tree structure in closure
  const rhymeTree = {
    // Organized by ending sounds
    endings: {
      'ate': {
        words: ['accelerate', 'interpolate', 'gravitate', 'meditate'],
        tech: ['calculate', 'iterate', 'validate', 'integrate'],
        nature: ['germinate', 'pollinate', 'hibernate', 'migrate'],
        business: ['innovate', 'operate', 'regulate', 'facilitate']
      },
      'ize': {
        words: ['realize', 'synthesize', 'analyze', 'harmonize'],
        tech: ['optimize', 'digitize', 'tokenize', 'normalize'],
        nature: ['crystallize', 'fossilize', 'stabilize'],
        business: ['monetize', 'incentivize', 'strategize']
      },
      'tion': {
        words: ['creation', 'relation', 'motion', 'notion'],
        tech: ['computation', 'compilation', 'validation'],
        nature: ['evolution', 'mutation', 'migration'],
        business: ['innovation', 'disruption', 'solution']
      }
      // ... more endings
    },

    // Sound patterns for matching
    patterns: {
      vowels: new Set(['a', 'e', 'i', 'o', 'u']),
      consonants: new Set('bcdfghjklmnpqrstvwxyz'.split('')),
      endings: new Set(['ing', 'ed', 'er', 'est', 'ly'])
    },

    // Rhyme strength levels
    strength: {
      PERFECT: 3,   // exact same ending
      STRONG: 2,    // same sound pattern
      WEAK: 1       // similar sound pattern
    }
  };

  // Extended contexts with rhyming
  const contexts = {
    tech: {
      verbs: {
        action: ['compile', 'debug', 'deploy', 'iterate'],
        state: ['crash', 'buffer', 'cache', 'stream']
      },
      nouns: {
        objects: ['function', 'module', 'server', 'buffer'],
        concepts: ['latency', 'entropy', 'quantum', 'thread']
      }
    },
    // ... other contexts as before
  };

  function createNode() {
    const node = {
      bottom: {
        frozen: {},
        proto: {
          // Original humor operations preserved
        }
      },
      
      workshop: {
        humor: {
          // Add rhyming capabilities
          rhyme: {
            // Find rhyming words
            findRhymes: function(word, options = {}) {
              const ending = getEnding(word);
              const rhymes = rhymeTree.endings[ending];
              
              if (!rhymes) return [];
              
              const results = [];
              
              // Get general rhymes
              results.push(...(rhymes.words || []));
              
              // Get context-specific rhymes if requested
              if (options.context && rhymes[options.context]) {
                results.push(...rhymes[options.context]);
              }
              
              return results;
            },

            // Create rhyming humor
            rhymingHumor: function(text, options = {}) {
              const words = text.split(/\s+/);
              const rhymePattern = options.pattern || 'AABB'; // default to couplets
              const contextPattern = options.contexts || ['tech', 'nature'];
              
              let result = [];
              let patternIndex = 0;
              
              for (const word of words) {
                const targetRhyme = rhymePattern[patternIndex % rhymePattern.length];
                const context = contextPattern[patternIndex % contextPattern.length];
                
                if (result.length > 0 && 
                    targetRhyme === rhymePattern[(patternIndex - 1) % rhymePattern.length]) {
                  // Need to rhyme with previous word
                  const rhymes = this.findRhymes(result[result.length - 1], { context });
                  const replacements = node.workshop.humor.humorize(word).humor.split(/\s+/);
                  
                  // Find a replacement that rhymes
                  const rhymingReplacement = findBestRhymingReplacement(
                    replacements, rhymes
                  );
                  
                  result.push(rhymingReplacement || word);
                } else {
                  // No rhyme needed, just humor transform
                  result.push(node.workshop.humor.humorize(word).humor);
                }
                
                patternIndex++;
              }
              
              return {
                original: text,
                rhyming: result.join(' '),
                pattern: rhymePattern
              };
            },

            // Create a rhyming story
            rhymingStory: function(topic, options = {}) {
              const stanzaCount = options.stanzas || 2;
              const linesPerStanza = options.linesPerStanza || 4;
              const pattern = options.pattern || 'AABB';
              
              let story = [];
              
              // Generate 0.base story structure
              for (let i = 0; i < stanzaCount; i++) {
                let stanza = [];
                for (let j = 0; j < linesPerStanza; j++) {
                  // Generate line based on topic and context
                  const line = generateTopicalLine(topic, {
                    context: options.contexts?.[i % options.contexts.length]
                  });
                  stanza.push(line);
                }
                story.push(stanza);
              }
              
              // Apply rhyming transformation
              return story.map(stanza => 
                this.rhymingHumor(stanza.join('\n'), {
                  pattern,
                  contexts: options.contexts
                })
              );
            }
          }
        }
      }
    };

    return node;
  }

  // Helper functions
  function getEnding(word) {
    // Extract rhyming ending from word
    return word.match(/[aeiou][^aeiou]*$/)?.[0] || word;
  }

  function findBestRhymingReplacement(words, rhymes) {
    // Find best rhyming match from possibilities
    for (const word of words) {
      for (const rhyme of rhymes) {
        if (getRhymeStrength(word, rhyme) >= rhymeTree.strength.STRONG) {
          return rhyme;
        }
      }
    }
    return words[0]; // fallback to first word if no rhyme found
  }

  function getRhymeStrength(word1, word2) {
    // Calculate rhyme strength between words
    if (word1 === word2) return rhymeTree.strength.PERFECT;
    if (getEnding(word1) === getEnding(word2)) return rhymeTree.strength.STRONG;
    return rhymeTree.strength.WEAK;
  }

  function generateTopicalLine(topic, options = {}) {
    // Generate a line of text related to the topic
    const templates = [
      "The [adj] [noun] did [verb]",
      "When [noun] would [verb] and [verb]",
      "Through [adj] [noun] we [verb]",
      "As [noun] [verb] with [noun]"
    ];
    
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    // Fill template with context-appropriate words
    return template.replace(/\[(.*?)\]/g, (match, type) => {
      const context = options.context || 'tech';
      const words = contexts[context][type + 's']?.words || ['default'];
      return words[Math.floor(Math.random() * words.length)];
    });
  }

  return createNode();
}

// Example usage
const node = functor("parent", "rhyming-humor");

// Generate rhyming humor
const rhyme = node.workshop.humor.rhyme.rhymingHumor(
  "The system runs fast and computes with grace",
  { pattern: 'AABB', contexts: ['tech', 'nature'] }
);

// Generate rhyming story
const story = node.workshop.humor.rhyme.rhymingStory(
  "computing",
  {
    stanzas: 2,
    linesPerStanza: 4,
    pattern: 'AABB',
    contexts: ['tech', 'nature']
  }
);

/* Example output:
{
  original: "The system runs fast and computes with grace",
  rhyming: "The quantum iterates past and executes with trace",
  pattern: 'AABB'
}

Story might generate something like:
The quantum server starts to calculate
While neural networks try to validate
Through streams of data flowing bright
The algorithms dance at night

In digital gardens we compute
As blockchain flowers take root
The cached results begin to grow
In patterns only parsers know
*/