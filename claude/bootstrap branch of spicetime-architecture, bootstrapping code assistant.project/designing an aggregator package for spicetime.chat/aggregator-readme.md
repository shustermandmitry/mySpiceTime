# @spicetime/aggregator

File content aggregator utility for the SpiceTime architecture toolkit. Combines multiple source files into a single
output with flexible filtering and formatting options.

## Features

- 📁 Aggregate content from multiple directories
- 🔍 Filter by file extensions
- ⛔ Exclude patterns support
- 🌲 Configurable directory depth
- 💪 Works as CLI tool or library
- 🎯 Path resolution based on current directory

## Installation

```bash
# Global installation for CLI usage
npm install -g @spicetime/aggregator

# Local installation as a dependency
npm install @spicetime/aggregator
```

## Quick Usage

### CLI

```bash
# Basic usage
spicetime-aggregate --paths "./src" --extensions ".ts,.js"

# With output file
spicetime-aggregate -p "./src,./lib" -e ".ts,.tsx" -o "aggregated.txt"
```

### API

```typescript
import { Aggregator } from '@spicetime/aggregator';

const aggregator = new Aggregator({
  includePaths: ['./src'],
  extensions: ['.ts', '.js'],
  excludePatterns: ['node_modules']
});

const result = await aggregator.aggregate();
```

## Documentation

- [CLI Reference](./docs/CLI.md)
- [API Documentation](./docs/API.md)
- [Design Guide](./docs/DESIGN.md)
- [User Guide](./docs/USER_GUIDE.md)

## Contributing

1. Clone the repository
2. Install dependencies: `npm install`
3. Build: `npm run build`
4. Run tests: `npm test`

## License

MIT - See [LICENSE](./LICENSE) for details.
