# Domain Filesystem Profile: Snapshot Support
## Tic 5.0

### Core Profile Types
All profile files below are optional and can be present at any tic:

1. Vector Snapshots
   ```
   snapshot.[tic].vector_[name].md        # Named vector snapshot
   snapshot.[tic].vector_[number].md      # Numbered vector snapshot
   chat.snapshot.vector_[name].md         # Chat-level named snapshot
   chat.snapshot.vector_[number].md       # Chat-level numbered snapshot
   ```

2. Vector Identification
   - Vector numbers are immutable throughout chat lifetime
   - Vector numbers persist across project timelines
   - Names may change but numbers provide stable reference
   - Both name and number can be used for snapshots

3. Snapshot Properties
   - Point-in-time capture of vector state
   - Immutable once created
   - May include context at time of capture
   - Referenced by other vectors/documents

### Implementation Notes

1. Vector Number Persistence
   ```
   Tic 1: vector_streams.0.md
   Tic 2: vector_dataflow.0.md    # Name changed, number stable
   Tic 3: vector_pipelines.0.md   # Name changed again, same vector
   ```

2. Snapshot Usage
   ```
   # Vector-specific snapshot
   snapshot.2.vector_0.md         # Snapshot of vector 0 at tic 2
   
   # Chat-level snapshot
   chat.snapshot.vector_0.md      # Latest chat-level snapshot of vector 0
   ```

3. Reference Patterns
   ```
   doc.5.0.ref(snapshot.2.vector_0)   # Reference to specific snapshot
   summary.5.0.ref(vector_0)          # Reference by immutable number
   ```

### Best Practices

1. Vector Numbering
   - Assign numbers sequentially
   - Never reuse numbers
   - Maintain number across renames
   - Document number assignments

2. Snapshot Creation
   - Create at significant changes
   - Include context when needed
   - Reference from documentation
   - Maintain immutability

3. Reference Management
   - Use numbers for stability
   - Include names for readability
   - Document references clearly
   - Track snapshot dependencies

*Note: These conventions ensure stable vector identification and state capture while maintaining system flexibility.*