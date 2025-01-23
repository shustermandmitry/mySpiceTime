# SpiceTime Timescapes: Component Family Evolution

## Overview

SpiceTime organizes code around React component families, where each component family exists in its own timescape - a
domain of related packages that evolve together. This mirrors React's compound component pattern while providing clear
boundaries for package evolution and dependency management.

## Component Family Structure

### Base Organization

```
repo-root/
  components/           # Component families (not counted in nesting)
    ComponentA/         # Parent component (Level 1)
      packages/
        domain-a/      # Level 2
          packages/
            utils/     # Level 3 (max)
```

### Family Boundaries

1. **Component Level**
    - Parent component defines the family
    - Contains core component logic
    - Establishes family's API

2. **Domain Level**
    - Packages grouped by domain
    - Clear functional boundaries
    - Domain-specific evolution

3. **Implementation Level**
    - Specific utilities and tools
    - Maximum nesting depth
    - Clean dependency paths

## Space-Time Coordinates

### Root Location

The local semver of a package serves as a precise indicator of its distance from the repo root:

- `^0.0.0` indicates one level deep from root (packages folder)
- This allows any utility to locate the repo root by reading its own coordinates
- Path resolution becomes agnostic of the actual repo name
- Makes all path-based operations fully portable across repos

Example:

```javascript
// A utility can determine its distance from root
// by reading its own package version
const distanceFromRoot = version.startsWith('^') ? 1 : 0;
const rootPath = Array(distanceFromRoot).fill('..').join('/');
```

### Package Identifiers

```
@spicetime/util-fs@^0.0.0
[scope  ]/[name]@[horizon][coordinates]
```

Where:

- `^` indicates position relative to component family
- `0.0.0` tracks evolution in local time
- Package name reflects domain role

### Evolution Tracking

1. **Base Implementation**

```javascript
// aggregator.js - Base implementation
export class Aggregator {
...
}
```

2. **Time Increments**

```javascript
// aggregator.tic.1.js - First evolution
export class Aggregator {
...
}
```

3. **Family Inheritance**
    - Changes flow through component family
    - Evolution tracked per domain
    - Clear upgrade paths

## Component Family Dependencies

### Import Patterns

```javascript
// Clean imports through family scope
import {fs, events} from '@componentName/domain-utils';

const {thing1, thing2} = {...fs, ...events};
```

### Dependency Resolution

- Relative to component family
- Clear version tracking
- Domain-scoped changes
- Family-wide consistency

## Benefits

### 1. Root-Agnostic Resolution

- Local semver indicates distance from repo root
- Path resolution independent of repo name
- Automatic root location through version coordinates
- Enables fully portable path handling

### 2. Natural React Structure

- Mirrors compound components
- Clear family boundaries
- Intuitive organization
- Maintainable growth

### 2. Evolution Management

- Family-scoped changes
- Domain isolation
- Clear history
- Controlled updates

### 3. Dependency Control

- Limited nesting
- Clean imports
- Natural boundaries
- Self-organizing

## Practical Application

### Component Development

1. Start with parent component
2. Grow domain packages as needed
3. Implement specific utilities
4. Maintain family boundaries

### Package Evolution

1. Track changes within domains
2. Evolve through time ticks
3. Preserve family history
4. Control dependency spread

## Future Considerations

### 1. Tooling Support

- Family tree visualization
- Dependency mapping
- Evolution tracking
- Boundary enforcement

### 2. Development Workflow

- Component-first design
- Natural organization
- Clear evolution paths
- Maintainable structure

## Conclusion

SpiceTime timescapes provide a natural way to organize and evolve React component families. By treating each component
as the head of its own family of packages, we maintain React's compound component philosophy while providing clear
boundaries for package evolution and dependency management. This creates a system that grows naturally with your React
components while keeping complexity under control.

## Implementation Notes

1. **Component Family Creation**
    - Start with React component
    - Add packages as needed
    - Maintain clear boundaries
    - Track family evolution

2. **Package Management**
    - Family-scoped versioning
    - Domain-level organization
    - Clean dependency paths
    - Controlled nesting

3. **Evolution Tracking**
    - Time ticks per domain
    - Family-wide consistency
    - Clear upgrade paths
    - History preservation
