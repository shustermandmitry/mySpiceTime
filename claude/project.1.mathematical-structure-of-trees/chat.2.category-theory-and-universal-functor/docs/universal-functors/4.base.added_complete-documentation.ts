function functor() {
  // Different types of documentation in closure
  const docs = {
    // Quick reference dictionary
    dictionary: new Map([
      ['tic', 'Temporal position or navigator'],
      ['extend', 'Create new node with current as parent'],
      ['regenerate', 'Create new functor from current state'],
      ['workshop', 'Layer for building future states'],
      ['proto', 'Base layer containing core capabilities']
    ]),

    // Detailed vocabulary with usage
    vocabulary: new Map([
      ['tic', {
        description: 'Temporal position and navigation',
        usage: [
          'render(tic)           // current temporal position',
          'render(tic number 2)  // get layer at depth 2',
          'render(tic otherNode) // temporal distance to other'
        ],
        examples: [
          'const pos = render(tic)',
          'const past = render(tic number 0)',
          'const dist = render(tic futureNode)'
        ]
      }],
      // ... other detailed entries
    ]),

    // Complete user guide
    guide: `# Universal Node User Guide

## Overview
This node is a foundational element for building universal structures.
It has temporal awareness, self-documentation, and extension capabilities.

## Core Concepts
1. Temporal Layers
   - Bottom (frozen history)
   - Now (current state)
   - Workshop (future possibilities)

2. Basic Operations
   - Temporal navigation
   - State extension
   - Functor regeneration

3. Documentation Access
   - Direct questions
   - Dictionary lookups
   - Full guide access

## Usage Patterns
...`,

    // Technical design document
    design: `# Node Design Document

## Architecture
- Closure-based encapsulation
- Proto chain for temporal structure
- Workshop layer for future construction

## Key Mechanisms
1. Temporal Management
   - Proto chain represents timeline
   - Tic navigation via chain traversal
   - Workshop for temporary futures

2. Extension System
   - Clean proto inheritance
   - State preservation
   - Capability injection

## Implementation Notes
...`,

    // Quick start README
    readme: `# Universal Node

A self-aware, temporally-conscious node capable of
extension and regeneration.

## Quick Start
1. Create node: const node = functor()
2. Check position: render(tic)
3. Extend: extend(node)
4. Learn more: render(guide)

## Core Features
- Temporal awareness
- Self-documentation
- Extension capabilities
- Workshop layer
`
  };

  function createNode() {
    const node = {
      bottom: {
        frozen: {},
        proto: {
          // Original tic functionality
          tic(target = null) {
            // ... as before
          },

          // Documentation access
          get(query) {
            // Check dictionary
            if (docs.dictionary.has(query)) {
              return docs.dictionary.get(query);
            }
            
            // Check vocabulary
            if (docs.vocabulary.has(query)) {
              const entry = docs.vocabulary.get(query);
              return `${entry.description}\n\nUsage:\n${entry.usage.join('\n')}`;
            }

            // Special document requests
            switch(query) {
              case 'guide':
                return docs.guide;
              case 'design':
                return docs.design;
              case 'readme':
                return docs.readme;
              default:
                return 'Unknown term. Try "help" for available documentation.';
            }
          },

          // Help overview
          get help() {
            return `Available Documentation:
- readme: Quick start guide
- guide: Complete user guide
- design: Technical design document
- dictionary: Quick term lookup
- vocabulary: Detailed usage info

Example queries:
render(get 'tic')     // dictionary lookup
render(guide)         // full user guide
render(get 'design')  // technical design`;
          },

          // Direct document access
          get guide() { return docs.guide; },
          get design() { return docs.design; },
          get readme() { return docs.readme; },

          // Term teaching
          alias(term, details) {
            if (typeof details === 'string') {
              // Simple dictionary entry
              docs.dictionary.set(term, details);
            } else {
              // Detailed vocabulary entry
              docs.vocabulary.set(term, details);
            }
            return `Added documentation for "${term}"`;
          }
        }
      },
      now: {},
      workshop: {}
    };

    return node;
  }

  return createNode();
}

// Usage examples:
// Quick info
render(get 'tic')

// Full guides
render(guide)
render(design)
render(readme)

// Add new term
render(alias 'temporal jump' {
  description: 'Navigate directly to specific temporal layer',
  usage: ['render(tic number N)'],
  examples: ['const genesis = render(tic number 0)']
})