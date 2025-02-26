function functor() {
  function createNode() {
    const node = {
      bottom: {
        frozen: {},
        proto: {
          // tic as both getter and temporal navigator
          tic(target = null) {
            // If no args, return current temporal position
            if (target === null) {
              let count = 0;
              let current = this;
              while (current.parent) {
                count++;
                current = current.parent;
              }
              return count;
            }
            
            // If number provided, get that layer
            if (typeof target === 'number') {
              let current = this;
              let depth = this.tic();
              
              // Walk back until we find target depth
              while (depth > target && current.parent) {
                current = current.parent;
                depth--;
              }
              
              return current;
            }
            
            // If object provided, get temporal distance
            if (typeof target === 'object') {
              let thisDepth = this.tic();
              let targetDepth = target.bottom.proto.tic();
              return Math.abs(thisDepth - targetDepth);
            }
          }
        }
      },
      now: {},
      workshop: {}
    };

    node.bottom.proto.regenerate = function() {
      return functor();
    };

    return node;
  }

  return createNode();
}

// Usage examples:
const genesis = functor()
const next = extend(genesis)
const future = extend(next)

// As simple getter
render(tic)  // returns current temporal position

// Get specific layer
render(tic number 1)  // returns the layer at depth 1

// Get temporal distance
render(tic future)  // returns distance between current and future node

// Direct temporal navigation
const pastLayer = render(tic number 0)  // gets genesis layer
const distance = render(tic pastLayer)   // distance to that layer