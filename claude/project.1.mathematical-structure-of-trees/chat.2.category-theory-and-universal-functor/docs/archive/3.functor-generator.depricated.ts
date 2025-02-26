// The crank mechanism for generating functors
class FunctorCrank<A, B, C> {
  constructor(
    private a: A,
    private b: B,
    private c: C,
    private transforms: {
      aToB: (a: A) => B;
      bToC: (b: B) => C;
      cToA: (c: C) => A;
    }
  ) {}

  // One complete turn of the crank generates a new functor
  turn(): FunctorCrank<A, B, C> {
    // Step 1: A -> B
    const newB = this.transforms.aToB(this.a);
    
    // Step 2: B -> C
    const newC = this.transforms.bToC(newB);
    
    // Step 3: C -> A (completing the cycle)
    const newA = this.transforms.cToA(newC);

    return new FunctorCrank(
      newA,
      newB,
      newC,
      this.transforms
    );
  }

  // Get current state
  current(): [A, B, C] {
    return [this.a, this.b, this.c];
  }

  // Rotate multiple times
  turnTimes(n: number): FunctorCrank<A, B, C> {
    let result = this;
    for (let i = 0; i < n; i++) {
      result = result.turn();
    }
    return result;
  }
}

// Example usage:
interface SpacePoint {
  x: number;
  y: number;
}

interface TimePoint {
  t: number;
}

interface Node {
  id: string;
}

// Create initial crank
const crank = new FunctorCrank<SpacePoint, TimePoint, Node>(
  { x: 0, y: 0 },
  { t: 0 },
  { id: "0" },
  {
    aToB: (space) => ({ 
      t: Math.sqrt(space.x * space.x + space.y * space.y) 
    }),
    bToC: (time) => ({ 
      id: time.t.toString() 
    }),
    cToA: (node) => ({ 
      x: parseInt(node.id), 
      y: 0 
    })
  }
);

// Generate sequence of functors by turning the crank
let current = crank;
console.log("Initial:", current.current());

// First turn
current = current.turn();
console.log("After 1 turn:", current.current());

// Another turn
current = current.turn();
console.log("After 2 turns:", current.current());

// Can also do multiple turns at once
current = current.turnTimes(3);
console.log("After 3 more turns:", current.current());