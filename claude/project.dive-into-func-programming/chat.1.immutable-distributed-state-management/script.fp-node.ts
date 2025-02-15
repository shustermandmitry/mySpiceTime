type NodeId = string;
type LocalTime = number;

// A node within a spice with its own local time
class SpiceNode<T> {
  private state: T;
  private localTime: LocalTime = 0;
  private history: Map<LocalTime, T> = new Map();
  
  constructor(
    readonly id: NodeId,
    initial: T
  ) {
    this.state = initial;
  }

  // Local time progression
  private tick(): LocalTime {
    return ++this.localTime;
  }

  // Evolve state in local time
  evolve(mutation: (state: T) => void): LocalTime {
    mutation(this.state);
    const t = this.tick();
    this.history.set(t, Object.create(this.state));
    return t;
  }

  // View state at local time
  at(t: LocalTime): T | undefined {
    return this.history.get(t);
  }
}

// A spice is a collection of nodes sharing a context
class Spice<T> {
  private nodes: Map<NodeId, SpiceNode<T>> = new Map();
  private connections: Map<NodeId, Set<NodeId>> = new Map();
  private causalOrder: Map<NodeId, Map<LocalTime, Set<{node: NodeId, time: LocalTime}>>> = new Map();

  constructor(readonly context: string) {}

  // Add a node to this spice
  addNode(id: NodeId, initial: T): void {
    const node = new SpiceNode(id, initial);
    this.nodes.set(id, node);
    this.connections.set(id, new Set());
    this.causalOrder.set(id, new Map());
  }

  // Connect nodes (allows causal flow)
  connect(from: NodeId, to: NodeId): void {
    this.connections.get(from)?.add(to);
  }

  // Record causal relationship between node states
  private recordCausalLink(
    fromNode: NodeId, 
    fromTime: LocalTime,
    toNode: NodeId,
    toTime: LocalTime
  ): void {
    const nodeOrder = this.causalOrder.get(toNode);
    if (!nodeOrder) return;

    const timeOrder = nodeOrder.get(toTime) || new Set();
    timeOrder.add({ node: fromNode, time: fromTime });
    nodeOrder.set(toTime, timeOrder);
  }

  // Evolve a node's state and record causal relationships
  evolveNode(id: NodeId, mutation: (state: T) => void): void {
    const node = this.nodes.get(id);
    if (!node) return;

    const newTime = node.evolve(mutation);
    
    // Record causal relationships with connected nodes
    this.connections.get(id)?.forEach(connectedId => {
      const connected = this.nodes.get(connectedId);
      if (connected) {
        this.recordCausalLink(id, newTime, connectedId, this.getLatestTime(connectedId));
      }
    });
  }

  // Get latest local time for a node
  private getLatestTime(id: NodeId): LocalTime {
    return Array.from(this.causalOrder.get(id)?.keys() || [])
      .reduce((max, t) => Math.max(max, t), 0);
  }

  // Check if one state happened before another
  happenedBefore(
    nodeA: NodeId, timeA: LocalTime,
    nodeB: NodeId, timeB: LocalTime
  ): boolean {
    const orderB = this.causalOrder.get(nodeB)?.get(timeB);
    if (!orderB) return false;

    // Direct causal relationship
    if (Array.from(orderB).some(({node, time}) => 
      node === nodeA && time === timeA)) return true;

    // Check transitive relationships
    return Array.from(orderB).some(({node, time}) =>
      this.happenedBefore(nodeA, timeA, node, time));
  }
}

// Example usage
type Thought = {
  content: string;
  associations: Set<string>;
};

const mindSpice = new Spice<Thought>('consciousness');

// Different nodes in consciousness
mindSpice.addNode('perception', {
  content: '',
  associations: new Set()
});

mindSpice.addNode('memory', {
  content: '',
  associations: new Set()
});

mindSpice.addNode('reasoning', {
  content: '',
  associations: new Set()
});

// Connect nodes (information flow paths)
mindSpice.connect('perception', 'memory');
mindSpice.connect('memory', 'reasoning');

// Evolution happens in local time for each node
mindSpice.evolveNode('perception', state => {
  state.content = 'saw red flower';
  state.associations.add('color');
});

mindSpice.evolveNode('memory', state => {
  state.content = 'reminds me of summer';
  state.associations.add('season');
});