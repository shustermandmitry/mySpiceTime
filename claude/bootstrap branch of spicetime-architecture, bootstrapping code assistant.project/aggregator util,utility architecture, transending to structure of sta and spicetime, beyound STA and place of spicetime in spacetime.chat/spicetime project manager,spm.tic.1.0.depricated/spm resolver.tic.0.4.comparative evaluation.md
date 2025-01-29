Let me explore alternative approaches to handling versioned package resolution:

1. **File System Based Resolution**

2. **Build-Time Package Generation**

3. **Runtime Package Proxy**

Comparison of approaches:

1. **File System Based**

- Pros:
    - Simple to implement and understand
    - Fast resolution
    - Easy to debug
- Cons:
    - Needs file system access
    - Manual manifest maintenance
    - Harder to scale

2. **Build-Time Generation**

- Pros:
    - Clean development experience
    - Works with any build tool
    - Predictable behavior
- Cons:
    - Disk space usage
    - Build time overhead
    - Complex setup

3. **Runtime Proxy**

- Pros:
    - Most flexible
    - Dynamic resolution
    - Memory efficient
- Cons:
    - Performance overhead
    - Complex debugging
    - Potential runtime issues

4. **GraphDB Approach** (original)

- Pros:
    - Centralized version management
    - Rich query capabilities
    - Good for large systems
- Cons:
    - Infrastructure dependency
    - Setup complexity
    - Network overhead

There's also potential hybrid approaches:

1. **Build-Time with Runtime Fallback**

- Generate common versions at build time
- Use runtime resolution for others
- Cache resolutions in memory

2. **File System with Graph Index**

- Use file system for storage
- Use graph database for indexing/querying
- Best of both approaches

Would you like me to explore any of these approaches in more detail?