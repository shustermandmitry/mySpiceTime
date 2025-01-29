# Package Profiles: Composable Structure Definitions

## Profile System

### Base Profile Example

```yaml
# base-component.yml
name: ComponentBase
type: component
structure:
  folders:
    - name: src
      aliases:
        - @components
      structure:
        - name: components
        - name: hooks
        - name: utils
    - name: tests
      alias: @tests
    - name: styles
      alias: @styles

generators:
  - name: component
    template: react-component
    location: @components
  - name: test
    template: jest-test
    location: @tests
```

### Feature Profile

```yaml
# aggregator-component.yml
extends: base-component
name: AggregatorComponent
customization:
  folders:
    - name: parsers
      alias: @parsers
    - name: formatters
      alias: @formatters
  
  generators:
    - name: parser
      template: ts-class
      location: @parsers
```

## Build-Time Components

### Profile Generator

```typescript
// ProfileGenerator.tsx - Build-time component
import { Generator } from '@spicetime/generators';
import { ProfileReader } from '@spicetime/profiles';

export const ProfileGenerator = () => {
  // Runs at build time
  const profiles = ProfileReader.loadProfiles();
  
  return (
    <Generator>
      {profiles.map(profile => (
        <FolderStructure
          key={profile.name}
          structure={profile.structure}
          aliases={profile.aliases}
        />
      ))}
    </Generator>
  );
};
```

### Structure Generator

```typescript
// FolderStructure.tsx - Build-time component
const FolderStructure = ({ structure, aliases }) => {
  return (
    <Directory>
      {structure.folders.map(folder => (
        <Folder
          key={folder.name}
          name={folder.name}
          alias={folder.alias}
        >
          {folder.structure && (
            <FolderStructure 
              structure={folder.structure}
              aliases={aliases}
            />
          )}
        </Folder>
      ))}
    </Directory>
  );
};
```

## Generator Integration

### Yeoman Generator

```typescript
// generator-spicetime/index.ts
import {Generator} from 'yeoman-generator';
import {ProfileReader} from '@spicetime/profiles';

export default class SpiceTimeGenerator extends Generator {
    async prompting() {
        const profiles = await ProfileReader.loadProfiles();
        this.answers = await this.prompt([
            {
                type: 'list',
                name: 'profile',
                message: 'Select package profile:',
                choices: profiles.map(p => p.name)
            }
        ]);
    }

    writing() {
        const profile = ProfileReader.getProfile(this.answers.profile);
        this.fs.copyTpl(
            this.templatePath(profile.template),
            this.destinationPath(),
            profile
        );
    }
}
```

## Profile Composition

### Inheritance Chain

```yaml
# levels of customization
base-profile.yml
└── component-profile.yml
    └── feature-profile.yml
        └── aggregator-profile.yml
```

### Alias Resolution

```yaml
# alias-definitions.yml
global:
  @src: src
  @tests: tests
  @styles: styles

component:
  @components: src/components
  @hooks: src/hooks
  @utils: src/utils

aggregator:
  @parsers: src/parsers
  @formatters: src/formatters
```

## Build Process

### 1. Profile Resolution

```typescript
// Build time process
const profiles = await loadProfiles();
const resolvedStructure = await resolveInheritance(profiles);
```

### 2. Generator Execution

```typescript
// During build
const structure = await generateStructure(resolvedStructure);
await validateStructure(structure);
```

### 3. Alias Registration

```typescript
// Register resolved aliases
await registerAliases(structure.aliases);
// Now available for patch targeting
```

## Development Workflow

### 1. Create New Package

```bash
# Using yo generator
yo spicetime-package

? Select package profile: AggregatorComponent
? Package name: DataAggregator
? Version: 1.0.0
```

### 2. Profile Customization

```yaml
# custom-profile.yml
extends: aggregator-component
name: DataAggregator
customization:
  folders:
    - name: transformers
      alias: @transformers
```

### 3. Structure Generation

```typescript
// Happens at build time
await generatePackageStructure('DataAggregator');
// Creates folders, registers aliases
```

## Future Extensions

### 1. Profile Registry

- Central profile repository
- Version control for profiles
- Profile sharing
- Dependency tracking

### 2. Smart Generation

- Context-aware structure
- Feature detection
- Automatic customization
- Performance optimization

### 3. Integration Tools

- IDE support
- Visual editors
- Profile validators
- Migration tools