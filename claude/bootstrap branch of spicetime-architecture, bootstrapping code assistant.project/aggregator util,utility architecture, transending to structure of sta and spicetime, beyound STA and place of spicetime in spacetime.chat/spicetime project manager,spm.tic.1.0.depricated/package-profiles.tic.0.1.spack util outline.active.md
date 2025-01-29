# SPack: SpiceTime Package Builder

## Core Concept

SPack is a package building utility that:

- Processes YAML package profiles
- Generates package structures
- Manages alias conventions
- Integrates with build tools

It's tool-agnostic but can use:

- Yeoman for scaffolding
- React for build-time components
- Any other generation tools

## Package Structure

```
@spicetime/utils-spack/
├── src/
│   ├── profiles/       # Profile handling
│   ├── generators/     # Build-time generation
│   ├── resolvers/      # Alias resolution
│   └── builders/       # Structure building
├── templates/          # Base templates
└── examples/           # Example profiles
```

## Profile Format

```yaml
# Example SPack profile
name: BaseComponent
version: 0.2.1  # x=2, y=1 in utils domain
type: component

structure:
  folders:
    - name: src
      alias: @src
      structure:
        - name: components
          alias: @components
    - name: tests
      alias: @tests

generators:
  - name: component
    template: react-component
    target: @components
```

## Integration Points

### Build System

```typescript
// During build process
import { SPack } from '@spicetime/utils-spack';

const builder = new SPack();
await builder.processProfiles();
await builder.generateStructures();
```

### Generator Integration

```typescript
// Wrap any generator system
class GeneratorWrapper {
  generate(profile: Profile) {
    // Use Yeoman, or any other tool
    // SPack is agnostic of actual generator
  }
}
```

### React Build Components

```typescript
// Optional React integration
const StructureBuilder = () => {
  return (
    <SPack.Generator>
      <ProfileLoader />
      <StructureResolver />
      <AliasRegistry />
    </SPack.Generator>
  );
};
```