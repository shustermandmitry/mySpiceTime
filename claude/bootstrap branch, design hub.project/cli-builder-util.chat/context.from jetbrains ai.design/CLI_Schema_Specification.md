# CLI Builder Utility - Command Schema Specification

## Overview

This document outlines the **JSON-like DSL** used to define CLI commands and their configurations. These schemas are
parsed and processed by the CLI builder utility to generate custom interpreters.

---

## Schema Structure

The CLI schema is a **JavaScript object** or **JSON file** consisting of the following properties:

### 1. CLI Configuration

Top-level configuration for the CLI tool being defined.

| Field         | Type   | Required | Description                             |
|---------------|--------|----------|-----------------------------------------|
| `name`        | String | Yes      | Name of the CLI tool.                   |
| `description` | String | No       | Optional description for the CLI tool.  |
| `commands`    | Array  | Yes      | List of commands to include in the CLI. |

### 2. Commands

Each command has the following structure:

| Field         | Type               | Required | Description                                                         |
|---------------|--------------------|----------|---------------------------------------------------------------------|
| `symbol`      | String             | Yes      | Unique identifier for the CLI command (e.g., `@command`).           |
| `description` | String             | No       | Optional description of the command.                                |
| `resolver`    | String or Function | Yes      | A static value or dynamic logic for resolving the command's output. |

---

## Example CLI Schema (JSON)

```json
{
  "name": "FolderBoundCLI",
  "description": "CLI for resolving folder paths dynamically.",
  "commands": [
    {
      "symbol": "@project",
      "description": "Root of the project folder",
      "resolver": "/Users/username/project"
    },
    {
      "symbol": "@src",
      "description": "Resolve the `src` directory",
      "resolver": "function() { return '/Users/username/project/src'; }"
    }
  ]
}
```

## Example CLI Schema (JavaScript Object)

```javascript
const cliConfig = {
  name: "FolderBoundCLI",
  description: "CLI for resolving folder paths dynamically.",
  commands: [
    {
      symbol: "@project",
      description: "Root of the project folder",
      resolver: "/Users/username/project",
    },
    {
      symbol: "@src",
      description: "Resolve the `src` directory",
      resolver: function () {
        return "/Users/username/project/src";
      },
    },
  ],
};

module.exports = cliConfig;
```

---

## Notes

- **Static Resolvers**: Strings are used when the output is fixed (e.g., folder paths, constants).
- **Dynamic Resolvers**: Functions enable flexible command behavior (e.g., computations, conditional outputs).
- **Extensibility**: This schema can later be extended to support additional features such as flags, arguments, and
  chaining.