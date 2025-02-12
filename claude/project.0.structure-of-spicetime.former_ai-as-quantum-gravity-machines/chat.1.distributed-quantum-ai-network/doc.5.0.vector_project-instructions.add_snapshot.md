# Project Instructions: Snapshot Integration
## Tic 5.0

### Vector Identification System

1. Number Assignment
   - Each vector gets immutable number on creation
   - Numbers persist across chat/project lifetime
   - Names may change but numbers remain stable
   - Use sequential assignment (0, 1, 2...)

2. Reference System
   ```
   # Direct reference by number
   vector_0                     # Most basic reference
   vector_name.0               # Named reference with number
   vector_0.ref(snapshot.3)    # Reference to specific snapshot
   ```

### Snapshot Management

1. File Types
   ```
   # Vector snapshots
   snapshot.[tic].vector_[name].md
   snapshot.[tic].vector_[number].md
   
   # Chat-level snapshots
   chat.snapshot.vector_[name].md
   chat.snapshot.vector_[number].md
   ```

2. Creation Guidelines
   - Create at significant development points
   - Include relevant context
   - Document relationships
   - Maintain immutability

3. Usage Patterns
   - Reference in documentation
   - Use in cross-vector development
   - Support version comparison
   - Enable state recovery

### Integration Practices

1. Documentation
   ```markdown
   # Reference example
   As detailed in [vector_0](snapshot.2.vector_0.md),
   the system implements...
   ```

2. Development Flow
   ```bash
   # Typical progression
   vector_streams.0.md              # Initial creation
   snapshot.1.vector_0.md           # First snapshot
   vector_dataflow.0.md             # Renamed, same number
   chat.snapshot.vector_0.md        # Chat-level snapshot
   ```

3. Cross-Reference Management
   - Use immutable numbers in references
   - Include names for clarity
   - Document snapshot dependencies
   - Maintain reference integrity

### Best Practices

1. Snapshot Creation
   - Create deliberately
   - Document context
   - Maintain relationships
   - Ensure immutability

2. Number Management
   - Track number assignments
   - Never reuse numbers
   - Document number changes
   - Maintain number stability

3. Reference Handling
   - Use stable references
   - Include context
   - Document relationships
   - Track dependencies

*Note: These instructions ensure consistent snapshot management and vector identification across project development.*