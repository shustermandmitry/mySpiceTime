# Project Instructions Vector
## Complete State at Tic 7

### Core File Structure

1. Time-Based Organization
   ```
   chat/
     summary.[tic].md             # Tic summary
     summary.[tic].[vector].md    # Vector summary
     log.[tic].md                # Development log
     doc.[tic].[vector].md       # Detailed docs
   ```

2. Vector Identification
   - Number-based navigation (tic.vector)
   - Immutable vector numbers
   - Sequential assignment
   - Clear temporal position

### Operation Types

1. Add (Default)
   ```
   doc.2.3.feature.md           # Implicit add
   doc.2.3.add_feature.md      # Explicit add
   ```

2. Update
   ```
   doc.2.3.update_3.md         # By number
   doc.2.3.update_feature.md   # By name (legacy)
   ```

### Multi-Vector Operations

1. Vector Lists
   ```
   # Comma separation
   summary.2.3.add_(feature1,feature2)

   # Range notation
   doc.2.(3-5).update_impl     # Vectors 3,4,5
   ```

2. Combined Operations
   ```
   # Multiple actions
   summary.2.3.add_(x,y),update_z.md

   # Ranged multiple actions
   doc.2.(1-3).add_a,update_b.md
   ```

### Patch System

1. In-File Patches
   ```markdown
   # Initial content...

   Note to patchDispatch: add_feature
   [Feature implementation...]

   Note to patchDispatch: update_component
   [Component updates...]
   ```

2. Aggregation Rules
   - Sequential application
   - Order preservation
   - State validation
   - Consistency checks

### Snapshot Management

1. Vector State
   ```
   snapshot.[tic].md           # Complete vector state
   - Sequential patch application
   - Full documentation state
   - Cross-reference preservation
   - Context inclusion
   ```

2. Timing Requirements
   - Creation within tic window
   - Complete scope coverage
   - Relationship preservation
   - Detachment prevention

### Best Practices

1. File Organization
   - Group related changes
   - Clear action specification
   - Logical ordering
   - State consistency

2. Vector Management
   - Use number references
   - Maintain immutability
   - Track assignments
   - Document relationships

3. Patch Processing
   - Sequential application
   - Clear documentation
   - State validation
   - Change tracking

4. Multi-Vector Handling
   - Use ranges appropriately
   - Group related changes
   - Maintain consistency
   - Document dependencies

### Implementation Guidelines

1. Number Assignment
   - Automatic in scope
   - Never reuse numbers
   - Maintain across renames
   - Track in documentation

2. Operation Flow
   - Validate inputs
   - Apply changes sequentially
   - Update related vectors
   - Maintain references

3. State Management
   - Track dependencies
   - Preserve relationships
   - Validate consistency
   - Handle conflicts

4. Documentation Standards
   - Clear action intent
   - Complete context
   - Cross-references
   - Version tracking

*Note: This snapshot represents the complete project instruction system as of Tic 7, incorporating all updates and modifications.*