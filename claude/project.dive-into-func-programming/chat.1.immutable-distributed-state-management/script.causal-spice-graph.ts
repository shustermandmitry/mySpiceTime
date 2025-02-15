type EventId = string;
type SpiceId = string;

// Captures causal relationships between events
class CausalGraph {
  private edges: Map<EventId, Set<EventId>> = new Map();
  
  addEvent(event: EventId, predecessors: EventId[] = []): void {
    this.edges.set(event, new Set(predecessors));
  }

  // Returns true if a happened before b
  happenedBefore(a: EventId, b: EventId): boolean {
    if (a === b) return false;
    const predecessors = this.edges.get(b) || new Set();
    if (predecessors.has(a)) return true;
    return Array.from(predecessors).some(p => this.happenedBefore(a, p));
  }

  // Get all events that must happen before given event
  getCausalPast(event: EventId): Set<EventId> {
    const past = new Set<EventId>();
    const predecessors = this.edges.get(event) || new Set();
    
    predecessors.forEach(p => {
      past.add(p);
      this.getCausalPast(p).forEach(pp => past.add(pp));
    });
    
    return past;
  }
}

// A cultural/conceptual space with its own causality
class Spice<T> {
  private state: T;
  private causalGraph = new CausalGraph();
  private events: Map<EventId, {
    state: T,
    context: string
  }> = new Map();
  
  readonly id: SpiceId;
  readonly domain: string;

  constructor(id: SpiceId, domain: string, initial: T) {
    this.id = id;
    this.domain = domain;
    this.state = initial;
  }

  // Record a new event in this spice's causal history
  evolve(mutation: (state: T) => void, context: string): EventId {
    mutation(this.state);
    
    const event: EventId = `${this.id}-${this.events.size}`;
    this.events.set(event, {
      state: Object.create(this.state),
      context
    });

    // Connect to causal past
    const latestEvents = Array.from(this.events.keys())
      .filter(e => !Array.from(this.events.keys())
        .some(other => this.causalGraph.happenedBefore(e, other)));
    
    this.causalGraph.addEvent(event, latestEvents);
    return event;
  }

  // Share state with respect to causal history
  observe(after?: EventId): T {
    if (!after) return this.state;
    
    const event = this.events.get(after);
    return event ? event.state : this.state;
  }

  // Check if one state evolved from another
  isDescendantOf(descendant: EventId, ancestor: EventId): boolean {
    return this.causalGraph.happenedBefore(ancestor, descendant);
  }
}

// Network of interrelated spices
class SpiceNetwork {
  private spices: Map<SpiceId, Spice<unknown>> = new Map();
  private relationships: Map<SpiceId, Map<SpiceId, string>> = new Map();

  addSpice<T>(spice: Spice<T>): void {
    this.spices.set(spice.id, spice);
    this.relationships.set(spice.id, new Map());
  }

  // Define how spices relate to each other
  relate(from: SpiceId, to: SpiceId, relationship: string): void {
    this.relationships.get(from)?.set(to, relationship);
  }

  // Find spices that share cultural/conceptual connections
  findRelated(spiceId: SpiceId, relationship: string): SpiceId[] {
    return Array.from(this.relationships.get(spiceId)?.entries() || [])
      .filter(([_, rel]) => rel === relationship)
      .map(([id]) => id);
  }
}

// Example usage
type Culture = {
  beliefs: Map<string, string>;
  practices: Set<string>;
  influences: Set<string>;
};

const artMovement = new Spice<Culture>(
  'impressionism',
  'art',
  {
    beliefs: new Map([['nature', 'direct observation']]),
    practices: new Set(['plein air painting']),
    influences: new Set()
  }
);

// Evolution within the spice
const event1 = artMovement.evolve(
  state => state.practices.add('broken color'),
  'Monet experiments with technique'
);

const event2 = artMovement.evolve(
  state => state.influences.add('photography'),
  'Impact of new technology'
);

// Observers agree event1 happened before event2
console.log(artMovement.isDescendantOf(event2, event1)); // true