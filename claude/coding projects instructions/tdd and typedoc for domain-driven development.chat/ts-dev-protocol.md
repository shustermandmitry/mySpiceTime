# typescript-dev-protocol.artifact.001.md

## Core Development Flow

### Script Requirements

```typescript
/**
 * Production Package Scripts:
 * - Full TypeDoc annotations
 * - Category/subcategory module tags
 * - No prompt.0.utils design/context documentation
 * - Tests required in separate files
 * 
 * Demo/Example Scripts:
 * - Full TypeDoc annotations
 * - Separate design/usage documentation module
 * - Prompt context preserved in module
 * - Tests optional
 */
```

### TDD Protocol

```typescript
// 1. Domain Definition
/**
 * @module domain/subdomain
 * @category DomainCategory
 * @subcategory SubCategory
 */

// 2. Test Specification
describe('DomainObject', () => {
  it('should enforce domain invariant', () => {
    // Given domain preconditions
    // When domain event occurs
    // Then domain rules upheld
  });
});

// 3. Implementation
/**
 * Enforces domain invariants for EntityName
 * @class DomainObject
 * @implements {DomainInterface}
 */
```

### Context Transfer

```
Script Evolution:
1. Start from existing artifacts
2. Extend based on prompts
3. Preserve structure/patterns
4. Link to domain categories

Version Control:
- Increment artifact versions
- Document changes inline
- Link related artifacts
- Maintain test coverage
```

## Documentation Standards

### TypeDoc Format

```typescript
/**
 * Module purpose and domain context
 * @module domain/subdomain
 * @packageDocumentation
 */

/**
 * Entity description with invariants
 * @class EntityName
 * @implements {Interface}
 */
export class Entity {
  /**
   * Operation purpose and constraints
   * @param {Type} name - Parameter role
   * @returns {Type} Return significance
   * @throws {Error} Invariant violations
   */
  method(param: Type): ReturnType {}
}
```

### Domain Documentation

```typescript
// domain/category/docs/entity-name.doc.ts
/**
 * @module domain/category
 * @packageDocumentation
 * 
 * Design Decisions:
 * 1. Core invariants
 * 2. Value objects
 * 3. Aggregates
 * 
 * Usage Patterns:
 * 1. Common flows
 * 2. Integration points
 * 3. Extension cases
 */
```

## Script Organization

### Production Code

```
domain/
├── category/
│   ├── entity-name.ts      # Implementation
│   ├── entity-name.test.ts # Test suite
│   └── docs/
│       └── category.doc.ts # Domain docs
```

### Example Code

```
examples/
├── feature-name.ts         # Implementation
├── feature-name.doc.ts     # Design/Usage
└── feature-name.test.ts    # Optional tests
```