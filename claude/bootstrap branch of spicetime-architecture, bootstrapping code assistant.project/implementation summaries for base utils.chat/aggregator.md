# Base Aggregator Documentation

## Core Philosophy

The Base Aggregator serves as a foundational utility in the SpiceTime architecture, built on these key principles:

1. **Pure Functionality**
    - Core content aggregation only
    - No content processing
    - No business logic
    - Clear single responsibility

2. **Space-Time Awareness**
    - Package versioning indicates location
    - Path resolution relative to repo root
    - Version coordinates for navigation
    - Family hierarchy through versioning

3. **Error Philosophy**
    - Clean error propagation
    - No error processing
    - Rich error context
    - Clear error boundaries

## Technical Design

### Core Interfaces

```typescript
interface AggregatorConfig {
  // Required 0.base paths
  includePaths: string[];
  
  // Required file extensions
  extensions: string[];
  
  // Optional exclusion patterns
  excludePatterns?: string[];
  
  // Optional depth limit
  maxDepth?: number;
}

interface AggregateResult {
  // Combined content from all files
  content: string;
  
  // List of processed files
  files: string[];
  
  // Any errors encountered
  errors: Array<{
    path: string;
    message: string;
  }>;
  
  // Operation statistics
  stats: {
    totalFiles: number;
    totalSize: number;
    skippedFiles: number;
  };
}
```

### Base Implementation

```typescript
class BaseAggregator {
  protected config: AggregatorConfig;
  
  constructor(config: AggregatorConfig) {
    this.config = {
      ...config,
      excludePatterns: config.excludePatterns || [
        '**/node_modules/**',
        '**/dist/**'
      ],
      maxDepth: config.maxDepth || Infinity
    };
  }
  
  async aggregate(): Promise<AggregateResult> {
    const result: AggregateResult = {
      content: '',
      files: [],
      errors: [],
      stats: {
        totalFiles: 0,
        totalSize: 0,
        skippedFiles: 0
      }
    };
    
    try {
      await this.validateConfig();
      await this.collectFiles(result);
      await this.processFiles(result);
    } catch (error) {
      if (error instanceof STError) {
        result.errors.push({
          path: error.path || 'unknown',
          message: error.message
        });
      } else {
        result.errors.push({
          path: 'unknown',
          message: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
    
    return result;
  }
  
  protected async validateConfig(): Promise<void> {
    if (!this.config.includePaths?.length) {
      throw new STError('No include paths specified', {
        coordinates: this.getCoordinates(),
        operation: 'validateConfig'
      });
    }
    
    if (!this.config.extensions?.length) {
      throw new STError('No file extensions specified', {
        coordinates: this.getCoordinates(),
        operation: 'validateConfig'
      });
    }
  }
  
  protected async collectFiles(result: AggregateResult): Promise<void> {
    // Implementation specific to file collection
  }
  
  protected async processFiles(result: AggregateResult): Promise<void> {
    // Implementation specific to file processing
  }
  
  protected getCoordinates(): string {
    // Get package coordinates for error reporting
    return process.env.STA_COORDINATES || '0.0.0';
  }
}
```

## Usage Patterns

### 1. Basic Aggregation

```typescript
const aggregator = new BaseAggregator({
  includePaths: ['./src'],
  extensions: ['.ts', '.js']
});

const result = await aggregator.aggregate();
console.log(`Processed ${result.stats.totalFiles} files`);
```

### 2. With Full Configuration

```typescript
const aggregator = new BaseAggregator({
  includePaths: ['./src', './lib'],
  extensions: ['.ts', '.js', '.tsx', '.jsx'],
  excludePatterns: [
    '**/tests/**',
    '**/stories/**',
    '**/node_modules/**'
  ],
  maxDepth: 5
});
```

### 3. Error Handling

```typescript
try {
  const result = await aggregator.aggregate();
  if (result.errors.length) {
    console.warn('Aggregation completed with errors:', result.errors);
  }
} catch (error) {
  console.error('Aggregation failed:', error);
}
```

## Implementation Guidelines

### 1. File Collection

- Use async file system operations
- Respect depth limits
- Follow symlinks safely
- Handle permissions errors
- Track statistics

### 2. Content Processing

- Stream large files
- Handle encoding
- Manage memory
- Track progress
- Maintain order

### 3. Error Management

- Clear error context
- Operation tracking
- Path information
- Recovery options

## Best Practices

### 1. Configuration

- Validate early
- Normalize paths
- Check permissions
- Set reasonable limits
- Document assumptions

### 2. Performance

- Stream large files
- Batch operations
- Monitor memory
- Handle backpressure
- Cache when appropriate

### 3. Error Handling

- Rich context
- Clear messages
- Recovery paths
- Proper cleanup

## Testing Strategy

### 1. Unit Tests

```typescript
describe('BaseAggregator', () => {
  test('validates configuration', async () => {
    expect(() => new BaseAggregator({
      includePaths: [],
      extensions: []
    })).toThrow();
  });

  test('aggregates files', async () => {
    const aggregator = new BaseAggregator({
      includePaths: ['./test-files'],
      extensions: ['.txt']
    });
    
    const result = await aggregator.aggregate();
    expect(result.files.length).toBeGreaterThan(0);
  });
});
```

### 2. Integration Tests

```typescript
describe('Aggregator Integration', () => {
  test('handles large directories', async () => {
    const aggregator = new BaseAggregator({
      includePaths: ['./large-test-dir'],
      extensions: ['.ts']
    });
    
    const result = await aggregator.aggregate();
    expect(result.stats.totalSize).toBeGreaterThan(1000000);
  });
});
```

## Future Considerations

### 1. Enhanced Features

- Content transformation
- Pattern matching
- Metadata collection
- Event emission

### 2. Performance Optimization

- Worker threads
- Incremental updates
- Smart caching
- Parallel processing

### 3. Integration Points

- Build tools
- IDE plugins
- CI/CD systems
- Analysis tools