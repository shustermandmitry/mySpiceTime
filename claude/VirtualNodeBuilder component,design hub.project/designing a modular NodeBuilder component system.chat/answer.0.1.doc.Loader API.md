# Loader Component API Documentation

## Overview

The Loader component manages lazy loading, caching, and resource distribution for node components. It orchestrates the
transition from centralized server dependencies to distributed local resources.

## GraphQL Schema

```graphql
type Loader {
  # Core loading functionality
  status: LoaderStatus!
  activeLoads: [LoadProcess!]!
  cachedResources: [Resource!]!
  
  # IPFS integration
  ipfsNode: IPFSNode
  gatewayStatus: GatewayStatus!
  
  # Resource management
  resourceQueue: LoadQueue!
  loadingStrategy: LoadingStrategy!
  cachePolicy: CachePolicy!
  
  # Actions
  requestResource(cid: ID!, priority: Priority): LoadProcess!
  prefetchResources(resources: [ResourceRequest!]!): [LoadProcess!]!
  clearCache(filter: CacheFilter): Boolean!
}

type LoadProcess {
  id: ID!
  status: ProcessStatus!
  resource: Resource!
  progress: Float!
  source: LoadSource! # LOCAL | PEER | GATEWAY
  error: Error
}

type Resource {
  id: ID!
  cid: ID!
  type: ResourceType!
  size: Int!
  lastAccessed: DateTime!
  accessCount: Int!
  dependencies: [Resource!]!
}

type LoadQueue {
  pending: [LoadProcess!]!
  active: [LoadProcess!]!
  completed: [LoadProcess!]!
  
  # Queue management
  prioritize(processId: ID!): Boolean!
  pause(processId: ID!): Boolean!
  resume(processId: ID!): Boolean!
}

type LoadingStrategy {
  mode: LoadMode! # EAGER | LAZY | ADAPTIVE
  concurrentLoads: Int!
  retryPolicy: RetryPolicy!
  sourcePreference: [LoadSource!]!
}

type CachePolicy {
  maxSize: Int!
  evictionStrategy: EvictionStrategy!
  prefetchThreshold: Float!
  retentionRules: [RetentionRule!]!
}

# Enums and Input Types
enum LoadMode {
  EAGER      # Load dependencies upfront
  LAZY       # Load only when requested
  ADAPTIVE   # Adjust based on usage patterns
}

enum LoadSource {
  LOCAL      # From local cache
  PEER       # From peer node
  GATEWAY    # From IPFS gateway
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}

input ResourceRequest {
  cid: ID!
  priority: Priority!
  dependencies: [ID!]
}

input CacheFilter {
  olderThan: DateTime
  accessedBefore: DateTime
  typeIn: [ResourceType!]
  sizeGreaterThan: Int
}
```

## Component Integration

### Package.json Configuration

```json
{
  "name": "@nodebuilder/loader",
  "info": {
    "parents": {
      "component": [
        "nodebuilder"
      ],
      "domain": [
        "resource-management"
      ]
    },
    "performance": {
      "memory": 0.7,
      "network": 0.9,
      "storage": 0.8,
      "latency": 0.6
    }
  }
}
```

### Usage Example

```typescript
const loader = await LoaderBuilder.create({
    ipfsConfig: {
        gatewayUrl: 'https://ipfs.example.com',
        swarmKey: '...'
    },
    cachePolicy: {
        maxSize: 1000000000, // 1GB
        evictionStrategy: 'LRU'
    },
    loadingStrategy: {
        mode: 'ADAPTIVE',
        concurrentLoads: 3
    }
});

// Request a resource
const loadProcess = await loader.requestResource('Qm...', Priority.HIGH);

// Monitor progress
loadProcess.on('progress', (progress: number) => {
    console.log(`Loading: ${progress}%`);
});

// Handle completion
loadProcess.on('complete', (resource: Resource) => {
    console.log(`Resource loaded: ${resource.id}`);
});
```

## Features

### Lazy Loading

- Defers resource loading until needed
- Prioritizes critical resources
- Manages dependencies intelligently

### Resource Management

- Adaptive cache policies based on usage patterns
- Intelligent eviction strategies
- Background prefetching of likely-needed resources

### Distribution Strategy

1. Initial bootstrap from gateway
2. Progressive transition to peer sources
3. Local caching for offline capability
4. Load balancing across available sources

### Performance Optimization

- Concurrent loading based on hardware capabilities
- Bandwidth-aware transfer speeds
- Memory-conscious caching strategies

## Integration Points

### With NodeBuilder

- Receives component loading requests
- Reports loading progress
- Manages resource dependencies

### With DomainBuilder

- Aligns loading with domain timelines
- Prioritizes resources based on domain requirements

### With ComponentSelector

- Loads selected component variants
- Manages variant-specific resources
- Handles dependency resolution