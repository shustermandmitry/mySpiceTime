function functor() {
  // Vocabulary lives in closure
  const vocabulary = new Map([
    ['introduction', 'I am a basic node with temporal awareness and self-documentation'],
    ['who am i', 'A self-aware node capable of extension and regeneration'],
    ['purpose', 'To serve as a foundation for building complex universal structures'],
    ['help', 'Available commands: tic, extend, regenerate, alias'],
    ['tic help', 'tic: Get temporal position\ntic number N: Get layer N\ntic other: Get temporal distance']
  ]);

  function createNode() {
    const node = {
      bottom: {
        frozen: {},
        proto: {
          // Original tic functionality
          tic(target = null) {
            if (target === null) {
              let count = 0;
              let current = this;
              while (current.parent) {
                count++;
                current = current.parent;
              }
              return count;
            }
            // ... rest of tic implementation
          },

          // Access documentation through direct questions
          get(query) {
            return vocabulary.get(query.toLowerCase()) || 
              'I don\'t know about that yet. Teach me with alias.';
          },

          // Add new vocabulary
          alias(phrase, meaning) {
            vocabulary.set(phrase.toLowerCase(), meaning);
            // Create getter automatically
            Object.defineProperty(this, phrase, {
              get: () => this.get(phrase)
            });
            return `I now understand "${phrase}"`;
          }
        }
      },
      now: {},
      workshop: {}
    };

    // Add regeneration
    node.bottom.proto.regenerate = function() {
      return functor();
    };

    return node;
  }

  return createNode();
}

// Usage examples:

// Direct questions
render(get 'who am i')
render(get 'help')
render(get 'tic help')

// Add new vocabulary
render(alias 'temporal nature' 'I exist across multiple tics in time')
render(get 'temporal nature')

// Question becomes getter
render(temporal nature)

// Teaching relationships
render(alias 'what is tic 0' 'The genesis layer of this node')
render(what is tic 0)

// Add domain-specific knowledge
render(alias 'quantum state' 'I maintain coherence across temporal layers')
render(quantum state)