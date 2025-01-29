# STError: SpiceTime Error System

## Core Philosophy

STError provides foundational error handling for the SpiceTime architecture, built on these key principles:

1. **Space-Time Awareness**
    - Errors capture their exact coordinates in the codebase
    - Each error knows its location in package hierarchy
    - Error paths are relative to coordinates
    - Maintains context during propagation

2. **Pure Information Capture**
    - Errors only capture information, never process it
    - Processing is left to React error boundaries
    - Error details preserved through propagation
    - Rich context without interpretation

3. **Clean Error Boundaries**
    - Clear separation between capture and handling
    - React components manage error processing
    - Error flow follows component hierarchy
    - Context determines handling strategy

## Technical Design

### Core Error Structure

```typescript
interface STErrorOptions {
  // Space-time coordinates of error origin
  coordinates: string;
  
  // Original error if wrapping
  cause?: Error;
  
  // Additional context
  context?: Record<string, unknown>;
  
  // File path if relevant, relative to coordinates
  path?: string;
  
  // Operation being performed when error occurred
  operation?: string;
}

class STError extends Error {
  readonly coordinates: string;
  readonly context?: Record<string, unknown>;
  readonly path?: string;
  readonly operation?: string;
  readonly cause?: Error;
  
  constructor(message: string, options: STErrorOptions) {
    super(message);
    this.name = 'STError';
    Object.assign(this, options);
  }
  
  // Get full error chain for debugging
  getErrorChain(): string[] {
    const chain = [this.message];
    let currentCause = this.cause;
    
    while (currentCause) {
      chain.push(currentCause.message);
      currentCause = currentCause instanceof STError 
        ? currentCause.cause
        : undefined;
    }
    
    return chain;
  }
}
```

### Usage Patterns

1. **Basic Error Creation**

```typescript
throw new STError('File not found', {
  coordinates: '1.2.3',
  path: './config.json',
  operation: 'readFile'
});
```

2. **Error Wrapping**

```typescript
try {
  await fs.readFile(path);
} catch (error) {
  throw new STError('Failed to read configuration', {
    coordinates: '1.2.3',
    path,
    operation: 'readConfig',
    cause: error
  });
}
```

3. **With Additional Context**

```typescript
throw new STError('Invalid configuration', {
  coordinates: '1.2.3',
  context: {
    configVersion: '2.0',
    validationErrors: ['missing field: name']
  }
});
```

## Implementation Guidelines

### 1. Error Creation

- Always provide coordinates
- Include relevant file paths
- Specify operation name
- Add meaningful context
- Preserve original errors

### 2. Error Propagation

- Maintain error chain
- Preserve all context
- Add new context if needed
- Keep coordinate trail

### 3. Error Boundaries

```typescript
class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(error: STError) {
    // Process error based on:
    // - error.coordinates (location)
    // - error.operation (what failed)
    // - error.context (why it failed)
    return { error };
  }
}
```

## Best Practices

1. **Error Messages**
    - Clear and descriptive
    - Action-oriented
    - Include what failed
    - Suggest recovery if possible

2. **Context Information**
    - Relevant to error
    - Helps with debugging
    - Avoids sensitive data
    - Structured format

3. **Coordinate Usage**
    - Accurate location
    - Package hierarchy
    - Version information
    - Clear error path

## Integration Points

### 1. With File System

```typescript
async function readConfig(path: string) {
  try {
    return await fs.readFile(path);
  } catch (error) {
    throw new STError('Config read failed', {
      coordinates: getCoordinates(),
      path,
      operation: 'readConfig',
      cause: error
    });
  }
}
```

### 2. With React Components

```typescript
function ConfigLoader({ path }: { path: string }) {
  try {
    const config = useConfig(path);
    return <ConfigDisplay config={config} />;
  } catch (error) {
    throw new STError('Config load failed', {
      coordinates: '1.2.3',
      path,
      operation: 'ConfigLoader',
      cause: error
    });
  }
}
```

### 3. With Build Tools

```typescript
build.onError(error => {
  throw new STError('Build failed', {
    coordinates: getBuildCoordinates(),
    operation: 'build',
    context: { config: build.config },
    cause: error
  });
});
```

## Testing Strategy

### 1. Unit Tests

```typescript
describe('STError', () => {
  test('captures coordinates', () => {
    const error = new STError('test', {
      coordinates: '1.2.3'
    });
    expect(error.coordinates).toBe('1.2.3');
  });

  test('maintains error chain', () => {
    const original = new Error('original');
    const wrapped = new STError('wrapped', {
      coordinates: '1.2.3',
      cause: original
    });
    
    expect(wrapped.getErrorChain()).toEqual([
      'wrapped',
      'original'
    ]);
  });
});
```

### 2. Integration Tests

```typescript
test('error boundary handling', async () => {
  const { container } = render(
    <ErrorBoundary>
      <ComponentThatThrows />
    </ErrorBoundary>
  );
  
  // Verify error handling
  expect(container).toHaveTextContent('Error at 1.2.3');
});
```

## Future Considerations

### 1. Enhanced Context

- More structured context
- Better type safety
- Richer debugging info
- Performance metrics

### 2. Error Analytics

- Error patterns
- Common failures
- Recovery success
- System health

### 3. Developer Tools

- Better error visualization
- debugging helpers
- Error navigation
- Context exploration