File: docs/concepts/architecture/space-time.md

# Space-Time: Structure and Coordinates

## Link Types

The graph records various relationships between nodes:

```typescript
// Core link types
interface Link {
  from: string;
  to: string;
  type: LinkType;
  meta?: Record<string, any>;
}

// Hierarchical - define parent/child relationships
enum HierarchicalLinkType {
  INHERITS_FROM = 'inherits_from',      // Primary inheritance
  MIXES_IN = 'mixes_in',                // Additional inheritance
  CONTAINED_IN = 'contained_in',        // Physical containment
  ORGANIZED_UNDER = 'organized_under'    // Logical grouping
}

// Meta - record rich ecosystem of relationships
enum MetaLinkType {
  INSPIRED_BY = 'inspired_by',          // Conceptual influence
  DERIVED_FROM = 'derived_from',        // Historical origin
  COLLABORATES_WITH = 'collaborates_with', // Working relationship
  DEPENDS_ON = 'depends_on',            // Runtime dependency
  REFERENCES = 'references',            // Documentation/citation
  RELATED_TO = 'related_to'            // General connection
}

// Version links - track time evolution
enum VersionLinkType {
  TICKED_FROM = 'ticked_from',          // Direct version increment
  BRANCHED_FROM = 'branched_from',      // New development path
  MERGED_WITH = 'merged_with',          // Path combination
  FORKED_FROM = 'forked_from'          // Independent path
}
```

## Inheritance and Mixing

Nodes can inherit from multiple sources:

```typescript
interface Node {
  id: string;
  primary_parent?: string;    // Main inheritance
  mixins: string[];          // Additional inheritance
  meta: {
    influences: string[];    // Recorded relationships
    origins: string[];      // Historical sources
    collaborators: string[]; // Working connections
  };
}

// Example inheritance structure
const packageNode = {
  id: 'pkg_123',
  primary_parent: 'base_package',  // Main inheritance
  mixins: ['logger', 'configurable'],  // Additional features
  meta: {
    influences: ['similar_pkg', 'pattern_source'],
    origins: ['original_implementation'],
    collaborators: ['related_pkg_1', 'related_pkg_2']
  }
};
```

## Structure Emergence

Hierarchical relationships create ordered spaces:

```typescript
interface HierarchicalSpace {
  root: string;
  relationships: HierarchicalLinkType[];
  
  // Methods to explore the space
  getChildren: (nodeId: string) => string[];
  getParent: (nodeId: string) => string;
  getDepth: (nodeId: string) => number;
  getSiblings: (nodeId: string) => string[];
}

// Multiple hierarchies can exist
const spaces = new Map<string, HierarchicalSpace>();

// Add new organizational structure
const addHierarchy = (
  name: string, 
  root: string,
  relationships: HierarchicalLinkType[]
) => {
  spaces.set(name, {
    root,
    relationships,
    // ... implementation
  });
};
```

## Time and Metrics

Version ticks and splits define distance:

```typescript
interface VersionNode {
  id: string;
  parent_version: string;
  tick_number: number;
  branch_depth: number;  // Number of splits from main
}

// Calculate distance between versions
const getDistance = (v1: VersionNode, v2: VersionNode): number => {
  const tickDiff = Math.abs(v1.tick_number - v2.tick_number);
  const branchDiff = Math.abs(v1.branch_depth - v2.branch_depth);
  return tickDiff + branchDiff;  // Simple metric
};

// Track branch evolution
interface Branch {
  id: string;
  origin: string;  // Where branch split
  tick_base: number;  // Starting tick
  ticks: VersionNode[];
}
```

## Domain Trees

Different hierarchical views emerge from the same interconnected graph:

```typescript
// Different organizing principles
enum DomainType {
  CODE_STRUCTURE = 'code',          // Package/module hierarchy
  CONCEPT_SPACE = 'concepts',       // Idea relationships
  PROJECT_MANAGEMENT = 'projects',  // Tasks and deliverables
  FOCUS_RELEVANCE = 'focus',       // Distance from current work
  DEPENDENCY_TREE = 'dependencies', // Runtime/build requirements
  KNOWLEDGE_MAP = 'knowledge'       // Learning/documentation
}

// Each domain builds its own tree
interface DomainTree {
  type: DomainType;
  root: string;
  getHierarchy: (node: string) => string[];
  
  // But no tree exists in isolation
  intersections: Map<DomainType, {
    shared_nodes: string[];
    relationship_type: string;
  }>;
}

// Example of entangled domains
const codeTree = {
  type: DomainType.CODE_STRUCTURE,
  root: 'base_package',
  intersections: new Map([
    [DomainType.CONCEPT_SPACE, {
      shared_nodes: ['aggregator', 'processor'],
      relationship_type: 'implements_concept'
    }],
    [DomainType.PROJECT_MANAGEMENT, {
      shared_nodes: ['new_feature', 'bug_fix'],
      relationship_type: 'work_item'
    }]
  ])
};

const conceptTree = {
  type: DomainType.CONCEPT_SPACE,
  root: 'core_ideas',
  intersections: new Map([
    [DomainType.CODE_STRUCTURE, {
      shared_nodes: ['aggregator', 'processor'],
      relationship_type: 'implemented_by'
    }],
    [DomainType.KNOWLEDGE_MAP, {
      shared_nodes: ['patterns', 'principles'],
      relationship_type: 'documented_in'
    }]
  ])
};

// Every tree view affects others
interface TreeUpdate {
  domain: DomainType;
  node: string;
  change: 'add' | 'move' | 'remove';
  
  // Ripple effects
  impacts: Map<DomainType, {
    affected_nodes: string[];
    required_updates: string[];
  }>;
}
```

## Entangled Spaces

No hierarchy can be fully isolated:

```typescript
// Attempt to view single domain
const viewDomain = (type: DomainType): DomainTree => {
  const tree = buildTree(type);
  
  // But we must acknowledge connections
  const entanglements = getEntanglements(type);
  
  return {
    ...tree,
    // Every node potentially connects to other domains
    nodes: new Map(Array.from(tree.nodes).map(([id, node]) => [
      id,
      {
        ...node,
        cross_domain_links: entanglements.get(id) || []
      }
    ]))
  };
};

interface Entanglement {
  source_domain: DomainType;
  target_domain: DomainType;
  shared_nodes: string[];
  relationship_strength: number;  // How tightly coupled
  impact_factor: number;         // How changes propagate
}

// Example of interconnected nature
const domainEntanglements = [
  {
    source_domain: DomainType.CODE_STRUCTURE,
    target_domain: DomainType.CONCEPT_SPACE,
    shared_nodes: ['aggregator', 'processor'],
    relationship_strength: 0.8,  // Strongly coupled
    impact_factor: 0.9          // Changes highly propagate
  },
  {
    source_domain: DomainType.PROJECT_MANAGEMENT,
    target_domain: DomainType.FOCUS_RELEVANCE,
    shared_nodes: ['current_sprint', 'active_tasks'],
    relationship_strength: 0.9,
    impact_factor: 0.7
  }
];
```

## Multi-Space Navigation

Movement in one space affects others:

```typescript
interface MultiSpacePosition {
  // Current location in each domain
  positions: Map<DomainType, string>;
  
  // How positions relate
  correlations: Map<string, {
    domains: DomainType[];
    strength: number;
  }>;
}

// Moving in one space shifts others
const moveInSpace = (
  domain: DomainType,
  from: string,
  to: string
): MultiSpacePosition => {
  // Direct movement in target domain
  const primary_move = executeMove(domain, from, to);
  
  // Calculate induced movements
  const ripples = calculateRipples(domain, from, to);
  
  // Return new positions across all spaces
  return {
    positions: new Map([
      [domain, to],
      ...ripples.movements
    ]),
    correlations: ripples.correlations
  };
};

// Everything affects everything
interface SpaceRipples {
  primary_domain: DomainType;
  movements: Map<DomainType, string>;
  correlations: Map<string, {
    domains: DomainType[];
    strength: number;
  }>;
  impact_chain: {
    sequence: DomainType[];
    strength_decay: number[];
  };
}
```

## Local Time and Pathways

Time is fundamentally local to each node:

```typescript
interface LocalTimeline {
  nodeId: string;
  ticks: number[];
  // No global timestamp - time is local
}

interface Connection {
  from: string;
  to: string;
  // Shared ticks between nodes when connection formed
  commonTicks: {
    fromNode: number[];
    toNode: number[];
  };
}

// Multiple possible paths between nodes
interface TimePath {
  nodes: string[];        // Path through nodes
  connections: Connection[];
  totalTicks: number;     // Accumulated through this path
}

// Find all possible time-paths between nodes
const findTimePaths = (
  start: string,
  end: string,
  graph: Graph
): TimePath[] => {
  const paths: TimePath[] = [];
  // Can be multiple valid paths due to non-local connections
  // Each giving different time accumulation
  
  return paths;
};

// Time distance must consider all paths
interface TimeDistance {
  shortestPath: TimePath;
  alternatePaths: TimePath[];
  // Non-local connections create path multiplicity
  pathDeviation: number;  // Measure of time metric distortion
}

const calculateTimeDistance = (
  node1: string,
  node2: string,
  graph: Graph
): TimeDistance => {
  const paths = findTimePaths(node1, node2, graph);
  
  // Sort by accumulated ticks
  paths.sort((a, b) => a.totalTicks - b.totalTicks);
  
  return {
    shortestPath: paths[0],
    alternatePaths: paths.slice(1),
    // Measure how much non-local connections
    // distort the time metric
    pathDeviation: calculatePathDeviation(paths)
  };
};

// Example of path accumulation
const path: TimePath = {
  nodes: ['A', 'B', 'C', 'D'],
  connections: [
    {
      from: 'A',
      to: 'B',
      commonTicks: {
        fromNode: [1, 2, 3],
        toNode: [1, 2]
      }
    },
    {
      from: 'B',
      to: 'C',
      commonTicks: {
        fromNode: [4, 5],
        toNode: [1, 2]
      }
    },
    // Non-local connection creating alternate path
    {
      from: 'A',
      to: 'D',
      commonTicks: {
        fromNode: [1, 2],
        toNode: [5, 6]
      }
    }
  ],
  totalTicks: 7  // Accumulated through this specific path
};

// Non-local connections distort the metric
interface MetricDistortion {
  baseMetric: number;     // From primary causal paths
  nonLocalEffects: {
    connections: Connection[];
    distortion: number;   // Like gravitational effects
  };
}
```

Key insights:

- Time is purely local to each node
- Nodes can only compare time through actual connections
- Multiple paths possible due to non-local links
- Non-local connections distort time metric
- Path multiplicity creates metric distortion
- Similar to gravitational effects in aggregate