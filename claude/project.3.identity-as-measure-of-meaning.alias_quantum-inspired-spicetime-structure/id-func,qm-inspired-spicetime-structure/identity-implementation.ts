// Identity Function Implementation Guide
// ===============================
// This module implements the core identity system that allows nodes to
// maintain their identity across transformations while tracking lineage.

/**
 * Core identity interface - defines what makes a node unique and trackable
 * across transformations and phases of development
 */
export interface NodeIdentity {
  // Unique identifier that persists across all transformations
  id: string;
  
  // The current version of this node
  version: number;
  
  // When this node was first created
  createdAt: Date;
  
  // When this node was last updated
  updatedAt: Date;
  
  // IDs of parent/predecessor nodes (previous versions or source nodes)
  parents: string[];
  
  // Vector representation for machine learning and similarity matching
  // This is updated whenever the content changes significantly
  signature?: number[];
  
  // Metadata about this node's type and state
  metadata: {
    // What kind of node is this (research, component, package, etc.)
    type: 'research' | 'component' | 'package' | 'context' | 'chat';
    
    // How stable/settled is this node (0.0-1.0)
    stability: number;
    
    // Tags for categorization
    tags: string[];
    
    // Human-readable name
    name: string;
    
    // Additional type-specific metadata
    [key: string]: any;
  };
}

/**
 * Generate a new unique identity for a node
 */
export function createNodeIdentity(
  type: NodeIdentity['metadata']['type'],
  name: string,
  options: Partial<NodeIdentity> = {}
): NodeIdentity {
  const now = new Date();
  
  return {
    id: options.id || `${type}-${generateUuid()}`,
    version: 1,
    createdAt: now,
    updatedAt: now,
    parents: [],
    ...options,
    metadata: {
      type,
      stability: 0.1, // New nodes start unstable
      tags: [],
      name,
      ...(options.metadata || {})
    }
  };
}

/**
 * A base class for all nodes in our system that maintains identity
 */
export class IdentityNode<T> {
  identity: NodeIdentity;
  content: T;
  
  constructor(identity: NodeIdentity, content: T) {
    this.identity = identity;
    this.content = content;
  }
  
  /**
   * Transform this node's content while preserving its core identity
   * and tracking lineage
   */
  transform<U>(
    transformer: (content: T) => U,
    options: {
      updateStability?: number;
      addTags?: string[];
      removeTags?: string[];
      updateMetadata?: Partial<NodeIdentity['metadata']>;
    } = {}
  ): IdentityNode<U> {
    // Create a new version of the identity
    const newIdentity: NodeIdentity = {
      ...this.identity,
      version: this.identity.version + 1,
      updatedAt: new Date(),
      // Add current version to parents for lineage tracking
      parents: [
        ...this.identity.parents,
        `${this.identity.id}@v${this.identity.version}`
      ],
      metadata: {
        ...this.identity.metadata,
        // Update stability if specified
        ...(options.updateStability !== undefined && {
          stability: options.updateStability
        }),
        // Update tags if specified
        ...(options.addTags || options.removeTags) && {
          tags: [
            ...this.identity.metadata.tags.filter(
              tag => !options.removeTags?.includes(tag)
            ),
            ...(options.addTags || [])
          ]
        },
        // Add any other metadata updates
        ...(options.updateMetadata || {})
      }
    };
    
    // Transform the content
    const newContent = transformer(this.content);
    
    // Return a new node with preserved identity and transformed content
    return new IdentityNode<U>(newIdentity, newContent);
  }
  
  /**
   * Change the type of this node while preserving identity
   * Common operation when research becomes a component, or a
   * component becomes part of a package
   */
  changeType(
    newType: NodeIdentity['metadata']['type'],
    transformer: (content: T) => any,
    additionalMetadata: Partial<NodeIdentity['metadata']> = {}
  ): IdentityNode<any> {
    return this.transform(transformer, {
      updateMetadata: {
        type: newType,
        ...additionalMetadata
      }
    });
  }
  
  /**
   * Merge with another node, creating a new node that preserves both lineages
   */
  static merge<A, B>(
    nodeA: IdentityNode<A>,
    nodeB: IdentityNode<B>,
    mergeContent: (a: A, b: B) => any,
    options: {
      preferA?: boolean;
      newName?: string;
      newType?: NodeIdentity['metadata']['type'];
    } = {}
  ): IdentityNode<any> {
    // Determine which node's ID to preserve
    const primary = options.preferA ? nodeA : nodeB;
    const secondary = options.preferA ? nodeB : nodeA;
    
    // Create merged identity
    const mergedIdentity: NodeIdentity = {
      ...primary.identity,
      version: primary.identity.version + 1,
      updatedAt: new Date(),
      // Include both parents and the secondary node ID
      parents: [
        ...primary.identity.parents,
        `${primary.identity.id}@v${primary.identity.version}`,
        `${secondary.identity.id}@v${secondary.identity.version}`
      ],
      metadata: {
        ...primary.identity.metadata,
        // Override type if specified
        ...(options.newType && { type: options.newType }),
        // Merge tags
        tags: [...new Set([
          ...primary.identity.metadata.tags,
          ...secondary.identity.metadata.tags
        ])],
        // Override name if specified, otherwise keep primary's name
        name: options.newName || primary.identity.metadata.name
      }
    };
    
    // Merge the content
    const mergedContent = mergeContent(nodeA.content, nodeB.content);
    
    // Return a new node with merged identity and content
    return new IdentityNode(mergedIdentity, mergedContent);
  }
  
  /**
   * Generate a string representation of this node's lineage
   */
  getLineageString(): string {
    const lineage = [`${this.identity.id}@v${this.identity.version}`];
    
    // Recursively follow parent references
    let parents = this.identity.parents;
    while (parents.length > 0) {
      // Add the most recent parent
      const mostRecent = parents[parents.length - 1];
      if (mostRecent) lineage.push(mostRecent);
      
      // Continue with any previous parents
      parents = parents.slice(0, -1);
    }
    
    return lineage.join(' ← ');
  }
}

/**
 * Example usage: Research note transforming into a component
 */
function exampleResearchToComponent() {
  // Create a research note
  const researchNote = new IdentityNode(
    createNodeIdentity('research', 'Dynamic Form Generation'),
    {
      title: "Dynamic Form Generation",
      content: "Research on how to generate forms from JSON schema...",
      references: ["https://example.com/json-schema"]
    }
  );
  
  // Later, transform it into a component design
  const componentDesign = researchNote.changeType(
    'component',
    (research) => ({
      name: "DynamicForm",
      description: research.title,
      props: {
        schema: { type: "object", required: true },
        onSubmit: { type: "function", required: true }
      },
      inspiration: research.references
    }),
    {
      name: "DynamicForm", // Update the name in metadata
      stability: 0.4 // More stable than research, but not production-ready
    }
  );
  
  // Finally, transform it into production-ready component code
  const componentImplementation = componentDesign.transform(
    (design) => ({
      name: design.name,
      code: `
import React, { useState } from 'react';

export function ${design.name}({ schema, onSubmit }) {
  const [formData, setFormData] = useState({});
  
  // Implementation details...
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(formData);
    }}>
      {/* Form fields generated from schema */}
    </form>
  );
}`,
      props: design.props
    }),
    {
      updateStability: 0.9, // Production-ready
      addTags: ['forms', 'ui-components', 'json-schema']
    }
  );
  
  // The identity and lineage are preserved across transformations
  console.log(componentImplementation.getLineageString());
  // Output: component-uuid@v3 ← component-uuid@v2 ← research-uuid@v1
}

/**
 * Helper function to generate UUIDs
 * In a real implementation, use a proper UUID library
 */
function generateUuid(): string {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
}
