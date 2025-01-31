# NodeBuilder System API Documentation

## Core Components

### NodeBuilder

Root component that orchestrates the entire build process.

```graphql
type NodeBuilder {
  # Component hierarchy
  children: [Component!]!
  parentDomains: [Domain!]!
  
  # Build process
  stages: [BuildStage!]!
  currentStage: BuildStage!
  
  # Variant management
  variants: [ComponentVariant!]!
  userProfile: UserProfile!
  
  # Actions
  startBuild(config: BuildConfig!): BuildProcess!
  selectVariant(componentId: ID!, variantId: ID!): Boolean!
}

type BuildStage {
  id: ID!
  name: String!
  type: StageType! # SEQUENTIAL | PARALLEL | COLLABORATIVE
  status: StageStatus!
  childStages: [BuildStage!]!
}

type ComponentVariant {
  id: ID!
  componentId: ID!
  performance: PerformanceMetrics!
  weight: Float! # Calculated based on user profile
  hardwareRequirements: HardwareSpec!
}
```

### DomainBuilder

Manages domain-specific build processes and timelines.

```graphql
type DomainBuilder {
  # Timeline management
  mainline: Timeline!
  specialtyTimelines: [Timeline!]!
  
  # State management
  globalState: StateTree!
  processContexts: [ProcessContext!]!
  
  # Actions
  createTimeline(config: TimelineConfig!): Timeline!
  updateState(update: StateUpdate!): Boolean!
}

type Timeline {
  id: ID!
  processes: [Process!]!
  state: ProcessState!
  dependencies: [TimelineDependency!]!
}
```

### ComponentSelector

Handles variant selection and dependency resolution.

```graphql
type ComponentSelector {
  # Variant selection
  availableVariants: [ComponentVariant!]!
  selectedVariants: [ComponentVariant!]!
  
  # Hardware constraints
  hardwareProfile: HardwareProfile!
  
  # Actions
  selectVariant(variantId: ID!): SelectionResult!
  autoSelect(): [SelectionResult!]!
}

type SelectionResult {
  success: Boolean!
  variant: ComponentVariant
  dependencies: [ComponentVariant!]!
}
```

## Package.json Structure

```json
{
  "name": "@nodebuilder/component",
  "info": {
    "parents": {
      "component": ["parent1", "parent2"],
      "domain": ["domain1", "domain2"]
    },
    "performance": {
      "memory": 0.8,
      "cpu": 0.6,
      "network": 0.7,
      "storage": 0.5
    }
  }
}
```

## Component Organization

Components are organized in a flat structure but related through:

1. Parent-child relationships in package.json
2. Performance scores in multiple dimensions
3. Domain groupings

The system provides:

- Dynamic loading of components based on context
- Automated variant selection based on hardware constraints
- Flexible process orchestration (sequential/parallel/collaborative)
- State management across component boundaries