# Base Aggregator: User Guide

## Overview

The Base Aggregator is a foundational utility for collecting and combining content from multiple files. It provides core
file aggregation functionality with flexible configuration options and comprehensive error reporting.

## Installation

```bash
# Installing within SpiceTime monorepo
pnpm add @spicetime/util-aggregator

# Installing in external project
pnpm add spicetime-architecture
```

## Quick Start

### Basic Usage

```typescript
import { Aggregator } from '@spicetime/util-aggregator';

// Create aggregator instance
const aggregator = new Aggregator({
  includePaths: ['./src'],
  extensions: ['.ts', '.js']
});

// Aggregate content
const result = await aggregator.aggregate();
console.log(`Processed ${result.stats.totalFiles} files`);
```

### With Full Configuration

```typescript
const aggregator = new Aggregator({
  // Paths to include
  includePaths: ['./src', './lib'],
  
  // File extensions to process
  extensions: ['.ts', '.js', '.jsx', '.tsx'],
  
  // Patterns to exclude
  excludePatterns: [
    '**/node_modules/**',
    '**/dist/**',
    '**/*.test.*'
  ],
  
  // Maximum directory depth
  maxDepth: 5
});
```

## Configuration Options

### Required Options

| Option         | Type       | Description                          |
|----------------|------------|--------------------------------------|
| `includePaths` | `string[]` | Base paths to start aggregation from |
| `extensions`   | `string[]` | File extensions to include           |

### Optional Options

| Option            | Type       | Default                                | Description             |
|-------------------|------------|----------------------------------------|-------------------------|
| `excludePatterns` | `string[]` | `['**/node_modules/**', '**/dist/**']` | Patterns to exclude     |
| `maxDepth`        | `number`   | `Infinity`                             | Maximum directory depth |

## Result Structure

The aggregation operation returns a result object with the following structure:

```typescript
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

## Common Use Cases

### 1. Project Documentation

Aggregate all documentation files:

```typescript
const aggregator = new Aggregator({
  includePaths: ['./docs'],
  extensions: ['.md'],
  excludePatterns: ['**/drafts/**']
});
```

### 2. Source Analysis

Collect all source files for analysis:

```typescript
const aggregator = new Aggregator({
  includePaths: ['./src'],
  extensions: ['.ts', '.tsx'],
  excludePatterns: ['**/*.test.*', '**/*.stories.*']
});
```

### 3. Configuration Management

Aggregate configuration files:

```typescript
const aggregator = new Aggregator({
  includePaths: ['./config', './packages/*/config'],
  extensions: ['.json', '.yaml', '.env'],
  maxDepth: 2
});
```

## Error Handling

The aggregator collects errors during operation but continues processing when possible. Errors are reported in the
result object:

```typescript
const result = await aggregator.aggregate();

if (result.errors.length > 0) {
  console.log('Errors encountered:');
  result.errors.forEach(error => {
    console.log(`${error.path}: ${error.message}`);
  });
}
```

## Best Practices

### 1. Path Selection

- Use relative paths from working directory
- Be specific with include paths
- Exclude unnecessary directories
- Limit depth for large trees

### 2. Extension Selection

- Be specific with extensions
- Include all relevant variants
- Consider case sensitivity
- Group related extensions

### 3. Performance

- Limit depth for large directories
- Use specific include paths
- Exclude unnecessary paths
- Monitor statistics

## Troubleshooting

### Common Issues

1. **No Files Found**
    - Check include paths exist
    - Verify extension list
    - Review exclude patterns
    - Check maxDepth setting

2. **Performance Issues**
    - Reduce include paths
    - Add exclude patterns
    - Limit directory depth
    - Check file sizes

3. **Permission Errors**
    - Verify file permissions
    - Check directory access
    - Review path validity
    - Check user rights

## Advanced Usage

### Custom Error Handling

```typescript
const result = await aggregator.aggregate();

// Custom error processing
const criticalErrors = result.errors.filter(error => 
  error.message.includes('CRITICAL')
);

if (criticalErrors.length > 0) {
  // Handle critical errors
}
```

### Statistics Monitoring

```typescript
const result = await aggregator.aggregate();

console.log('Aggregation Statistics:');
console.log(`Total Files: ${result.stats.totalFiles}`);
console.log(`Total Size: ${result.stats.totalSize} bytes`);
console.log(`Skipped Files: ${result.stats.skippedFiles}`);
```

## Contributing

1. **Development Setup**
   ```bash
   git clone <repository>
   cd packages/utils/aggregator
   pnpm install
   ```

2. **Running Tests**
   ```bash
   pnpm test
   ```

3. **Building**
   ```bash
   pnpm build
   ```

## License

MIT License - See LICENSE file for details.