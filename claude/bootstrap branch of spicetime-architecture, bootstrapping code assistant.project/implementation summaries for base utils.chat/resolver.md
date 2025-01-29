# Path Resolver Documentation

## Core Philosophy

The Path Resolver provides fundamental path resolution for the SpiceTime architecture, following these key principles:

1. **Space-Time Awareness**
    - Package coordinates determine context
    - Paths relative to coordinates
    - Version-aware resolution
    - Cross-platform compatibility

2. **Pure Resolution**
    - No file system operations
    - Pure path manipulation
    - Platform abstraction
    - Clean error handling

3. **Flexible Resolution**
    - Support glob patterns
    - Handle package paths
    - Resolve coordinates
    - Maintain context

## Technical Design

### Core Interfaces

```typescript
interface ResolverConfig {
  // Base directory for resolution
  baseDir: string;
  
  // Package coordinates
  coordinates: string;
  
  // Optional platform override
  platform?: 'win32' | 'posix';
}

interface ResolutionResult {
  // Resolved absolute path
  absolutePath: string;
  
  // Original input path
  originalPath: string;
  
  // Resolution context
  context: {
    coordinates: string;
    baseDir: string;
    platform: string;
  };
}

interface GlobResult extends ResolutionResult {
  // Matched paths
  matches: string[];
  
  // Pattern used
  pattern: string;
}
```

### Base Implementation

```typescript
class PathResolver {
  protected config: ResolverConfig;
  
  constructor(config: ResolverConfig) {
    this.config = {
      ...config,
      platform: config.platform || process.platform
    };
  }
  
  async resolve(inputPath: string): Promise<ResolutionResult> {
    try {
      const absolutePath = this.getAbsolutePath(input