# Use Case: Folder-Bound CLI

## Problem

In many projects, developers often need to interact with specific folders or resolve paths dynamically. Examples
include:

- Root project folder.
- `src/` directory.
- Specific subdirectories like `components/` or `assets/`.

Manually resolving these paths every time can lead to repetitive, error-prone workflows—especially in large-scale
projects.

---

## Solution

Using the CLI Builder Utility, you can create a custom CLI that allows developers to **map symbolic commands** (e.g.,
`@project`, `@src`) to specific folder paths. These commands:

- Can resolve to **static paths** for frequently used directories.
- Can dynamically compute or resolve paths based on runtime context (e.g., `cwd`).

The result is a **Folder-Bound CLI** that simplifies working with common folder structures.

---

## Example Scenario

### Folder Structure

```plaintext
/Users/username/project
├── src/
│   ├── index.js
│   ├── components/
├── dist/
├── assets/
└── package.json
```

### Desired CLI Commands

| Command           | Output Path                              | Behavior                              |
|-------------------|------------------------------------------|---------------------------------------|
| `@project`        | `/Users/username/project`                | Resolves to the root folder.          |
| `@src`            | `/Users/username/project/src`            | Resolves to the `src/` folder.        |
| `@src/components` | `/Users/username/project/src/components` | Resolves to the `components/` folder. |

---

## Implementation Steps

### CLI Configuration (JSON)

Create your CLI definition using the CLI Builder Utility in **JSON** format.

```json
{
  "name": "FolderBoundCLI",
  "description": "CLI for resolving folders in a project structure",
  "commands": [
    {
      "symbol": "@project",
      "description": "Root of the project",
      "resolver": "/Users/username/project"
    },
    {
      "symbol": "@src",
      "description": "Resolve the `src` folder",
      "resolver": "function() { return '/Users/username/project/src'; }"
    },
    {
      "symbol": "@src/components",
      "description": "Resolve `src/components` subdirectory",
      "resolver": "function() { return '/Users/username/project/src/components'; }"
    }
  ]
}
```

### CLI Configuration (JavaScript)

Alternatively, define the CLI commands using the utility directly in a **JavaScript object**.

```javascript
const cliConfig = {
  name: "FolderBoundCLI",
  description: "CLI for resolving folders in a project structure",
  commands: [
    {
      symbol: "@project",
      description: "Root of the project",
      resolver: "/Users/username/project",
    },
    {
      symbol: "@src",
      description: "Resolve the `src` folder",
      resolver: function () {
        const projectRoot = "/Users/username/project";
        return `${projectRoot}/src`;
      },
    },
    {
      symbol: "@src/components",
      description: "Resolve `src/components` subdirectory",
      resolver: function () {
        const projectRoot = "/Users/username/project";
        return `${projectRoot}/src/components`;
      },
    },
  ],
};

module.exports = cliConfig;
```

---

## Example Code to Build the CLI

Using the CLI configuration, generate the Folder-Bound CLI dynamically.

### `examples/folder-bound/cli.js`

```javascript
const CLIUtility = require("../../index"); // Import the CLI Builder Utility
const cliConfig = require("./config.json"); // Import the CLI definition (JSON)

// Create the CLI
const cli = new CLIUtility(cliConfig);

try {
  // Validate and generate the CLI
  cli.generate();
  console.log("FolderBoundCLI generated successfully!");
} catch (err) {
  console.error("Error:", err.message);
}
```

---

## Executing the CLI

Once generated, test the commands for resolving folder structures.

### Example Commands

1. Resolve the root of the project:
   ```bash
   ./FolderBoundCLI.js @project
   ```
   **Output**:
   ```plaintext
   /Users/username/project
   ```

2. Resolve the `src` folder:
   ```bash
   ./FolderBoundCLI.js @src
   ```
   **Output**:
   ```plaintext
   /Users/username/project/src
   ```

3. Resolve the `src/components` folder:
   ```bash
   ./FolderBoundCLI.js @src/components
   ```
   **Output**:
   ```plaintext
   /Users/username/project/src/components
   ```

---

## Notes

1. The Folder-Bound CLI is fully customizable:
    - Update the `resolver` logic to point to different folders.
    - Add more commands for different subdirectories or external resources.

2. **Dynamic Resolvers**:
    - Use functions to compute the paths dynamically, based on runtime context (e.g., `cwd`, environment variables).

3. The generated CLI can be distributed to team members or included in CI/CD pipelines for automation tasks.