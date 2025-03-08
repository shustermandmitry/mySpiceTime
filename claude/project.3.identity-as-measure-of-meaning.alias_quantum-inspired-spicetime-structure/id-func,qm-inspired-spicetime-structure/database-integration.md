# Multi-Database Integration Strategy

This document outlines how to combine MongoDB, Neo4j, and a vector database into a cohesive system for managing our quantum-inspired structure projections.

## System Architecture Overview

Our architecture uses three specialized databases, each handling a different aspect of the system:

![Architecture Diagram](https://placeholder-image.com/architecture)

| Database | Purpose | Strengths | Data Stored |
|----------|---------|-----------|-------------|
| MongoDB | Content & Identity | Document storage, versioning | Node content, metadata, versions |
| Neo4j | Relationships | Graph traversal, path finding | RGB links, relationship properties |
| Vector DB | Semantic Search | Similarity matching | Node embeddings, vector representations |

## Schema Definitions

### MongoDB Collections

```javascript
// MongoDB Schema
db.nodes = {
  // Core node identity and current content
  _id: ObjectId,
  nodeId: String,          // Our system's persistent ID
  version: Number,         // Current version
  type: String,            // 'research'|'component'|'package'|'context'|'chat'
  content: Object,         // The actual content (schema varies by type)
  metadata: {
    createdAt: Date,
    updatedAt: Date,
    stability: Number,     // 0.0-1.0
    tags: [String],
    name: String,
    [additionalFields]: Any
  },
  parents: [String],       // References to parent/predecessor versions
  signature: [Number]      // Vector representation (optional)
}

db.versions = {
  // Historical versions of nodes
  _id: ObjectId,
  nodeId: String,
  version: Number,
  content: Object,
  metadata: Object,
  timestamp: Date
}

db.projects = {
  // Project metadata and configuration
  _id: ObjectId,
  name: String,
  description: String,
  rootNodeIds: [String],   // Entry point nodes
  members: [{ userId: String, role: String }],
  settings: {
    defaultProjections: [{
      name: String,
      focusNodeId: String,
      colorEmphasis: [Number, Number, Number],
      collapseStrength: Number
    }]
  }
}
```

### Neo4j Graph Structure

```cypher
// Neo4j Schema

// Nodes represent our system's nodes
CREATE (n:Node {
  nodeId: String,          // Our system's persistent ID
  version: Number,         // Current version
  type: String,            // Node type
  name: String,            // Display name
  stability: Float         // 0.0-1.0
})

// Relationships represent RGB links between nodes
CREATE (a:Node)-[r:LINKS_TO {
  red: Float,              // 0.0-1.0 inheritance strength
  green: Float,            // 0.0-1.0 functional strength
  blue: Float,             // 0.0-1.0 contextual strength
  weight: Float,           // Combined/computed weight
  description: String,     // Human-readable description
  lastUpdated: DateTime    // When this link was last verified/updated
}]->(b:Node)

// Version relationships for navigating history
CREATE (current:Node)-[r:PREVIOUS_VERSION]->(previous:Node)

// Project grouping
CREATE (p:Project)-[r:CONTAINS]->(n:Node)
```

### Vector Database Structure

```javascript
// Vector Database Schema (e.g., Pinecone)
{
  vectors: {
    dimensions: 1536,              // Vector dimension
    metric: "cosine",              // Similarity metric
    pods: 1,                       // Number of pods
    replicas: 1                    // Replication factor
  },
  items: [
    {
      id: "node-uuid-v1",          // Matches our nodeId@version
      values: [0.1, 0.2, ...],     // The embedding vector
      metadata: {
        nodeType: "research",      // Node type
        name: "Dynamic Forms",     // Node name
        tags: ["forms", "ui"],     // Tags for filtering
        projectId: "project-123"   // Project association
      }
    }
  ]
}
```

## Synchronization Strategy

### Write Operations

When a node is created or updated:

1. **MongoDB**: Store the complete node data
   ```javascript
   db.nodes.updateOne(
     { nodeId, version },
     { $set: nodeData },
     { upsert: true }
   )
   
   // For updates, store previous version in versions collection
   if (isUpdate) {
     db.versions.insertOne({
       nodeId,
       version: previousVersion,
       content: previousContent,
       metadata: previousMetadata,
       timestamp: previousUpdatedAt
     })
   }
   ```

2. **Neo4j**: Update node representation and relationships
   ```cypher
   // Create or update node
   MERGE (n:Node {nodeId: $nodeId, version: $version})
   SET n.type = $type,
       n.name = $name,
       n.stability = $stability
   
   // For updates, create version relationship
   WITH n
   MATCH (prev: