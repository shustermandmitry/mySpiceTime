# **Modular CLI System with Pluggable Parsers**

## **1. Overview**

This document outlines the design and usage of the **CLI-Builder**, a **modular CLI system** that supports pluggable
modules, each having its own parser and schema layer. The system is designed to be flexible, extensible, and highly
efficient, making it suitable for resource-constrained environments such as mobile devices.

---

## **2. Design Goals**

- **Extensibility**:  
  Support the addition of new CLI functionality via pluggable modules with minimal changes to the core system.

- **Modularity**:  
  Each plugin operates independently, with its own parser and execution logic.

- **Efficiency**:  
  Maintain lightweight schemas and parsers when running on resource-constrained environments such as phones.

- **Schema-Driven**:  
  Command configuration and integration are processed dynamically via a centralized schema.

---

## **3. Structure**

### **3.1 Folder Structure**

---

### **3.2 Centralized Schema (`global-schema.json`)**

The CLI system is configured with a schema file (`global-schema.json`) that contains:

1. **Global Commands**: Core CLI commands provided by the system itself.
2. **Plugins**: Configuration for enabled plugins, including the parser to use and commands supported by each plugin.

#### Example: `global-schema.json`

```json
{
  "name": "CLI-Builder",
  "description": "A modular CLI system with pluggable parsers",
  "plugins": [
    {
      "name": "jsonPlugin",
      "parser": "espree",
      "description": "Parses JSON-based CLI commands",
      "commands": {
        "parseJson": {
          "arguments": ["jsonData"],
          "resolver": "jsonPlugin.parse"
        }
      }
    },
    {
      "name": "customDSLPlugin",
      "parser": "chevrotain",
      "description": "Handles a custom DSL for advanced workflows",
      "commands": {
        "customCommand": {
          "arguments": ["arg1", "arg2"],
          "resolver": "customDSLPlugin.handleCommand"
        }
      }
    }
  ],
  "globalCommands": [
    {
      "verb": "add",
      "arguments": ["...nums"],
      "resolver": "global.addNumbers"
    },
    {
      "verb": "multiply",
      "arguments": ["a", "b"],
      "resolver": "global.multiplyNumbers"
    }
  ],
  "executionPipeline": "chaining"
}
```

This schema drives the CLI pipeline, specifying which parsers and command resolvers to use globally and per plugin.

---

### **3.3 Plugins**

Each plugin lives in the `plugins/` folder and follows this structure:

- **Parser**:  
  The parser defines how the input commands are understood (e.g., `espree`, `chevrotain`, or a custom parser).

- **Resolvers**:  
  A set of custom functions for executing plugin-specific commands.

- **Plugin Schema Stitching**:  
  Allows the plugin to extend and modify the global schema dynamically.

**Example Plugin Files**:

#### `plugins/jsonPlugin.js`

This plugin uses **Espree** to parse and execute JSON-based commands.

```javascript
const espree = require("espree");

module.exports = {
  name: "jsonPlugin",
  parser: espree,
  commands: {
    parseJson: {
      resolver: (jsonString) => {
        try {
          const parsed = JSON.parse(jsonString);
          return parsed;
        } catch (err) {
          throw new Error("Invalid JSON data!");
        }
      }
    }
  }
};
```

#### `plugins/customDSLPlugin.js`

This plugin implements a **custom DSL parser** using Chevrotain for advanced workflows.

```javascript
const { Lexer, CstParser, createToken } = require("chevrotain");

// Define Tokens
const Add = createToken({ name: "Add", pattern: /add/ });
const Number = createToken({ name: "Number", pattern: /\d+/ });
const WhiteSpace = createToken({ name: "WhiteSpace", pattern: /\s+/, group: Lexer.SKIPPED });

const DSLLexer = new Lexer([WhiteSpace, Add, Number]);

// Define Parser
class DSLParser extends CstParser {
  constructor() {
    super([Add, Number]);
    const $ = this;
    $.RULE("addExpression", () => {
      $.CONSUME(Add);
      $.CONSUME(Number);
      $.CONSUME(Number);
    });
  }
}

const parser = new DSLParser();

module.exports = {
  name: "customDSLPlugin",
  parser: parser,
  commands: {
    customCommand: {
      resolver: (inputString) => {
        const tokens = DSLLexer.tokenize(inputString);
        parser.input = tokens.tokens;
        const result = parser.addExpression();
        return result;
      }
    }
  }
};
```

---

### **3.4 Core CLI Pipeline (`cli-core.js`)**

The pipeline dynamically loads the global schema, initializes plugins, and routes commands for execution.

```javascript
// Load Schema
const schema = require("./global-schema.json");

// Load Plugins
const plugins = {};
for (const pluginConfig of schema.plugins) {
  const plugin = require(`./plugins/${pluginConfig.name}`);
  plugins[plugin.name] = plugin;
}

// Unified CLI Executor
const executeCommand = (commandVerb, args) => {
  // Check for plugin-specific commands
  for (const plugin of Object.values(plugins)) {
    if (plugin.commands[commandVerb]) {
      // Forward to plugin's resolver
      return plugin.commands[commandVerb].resolver(...args);
    }
  }

  // Check for global commands
  const globalCommand = schema.globalCommands.find((cmd) => cmd.verb === commandVerb);
  if (globalCommand) {
    const resolverFn = eval(globalCommand.resolver);
    return resolverFn(...args);
  }

  throw new Error(`Command '${commandVerb}' not found.`);
};

// Example CLI Entry Point
const input = "parseJson '{\"key\":\"value\"}'"; // Example input
const [command, ...args] = input.split(" ");

try {
  const result = executeCommand(command, args);
  console.log("Output:", result);
} catch (err) {
  console.error(err.message);
}
```

---

## **4. Usage**

To use the CLI-builder:

1. **Install Dependencies**:  
   Ensure the required dependencies (e.g., `espree`, `chevrotain`, etc.) are installed.

   ```bash
   pnpm install
   ```

2. **Add Plugins**:  
   To add a new plugin:

- Place the implementation file in the `plugins/` folder.
- Update the `global-schema.json` to reference the new plugin.

3. **Run Commands**:  
   Invoke the CLI with commands defined in the schema.

---

## **5. Extensibility**

- **Adding a New Plugin**:
    1. Write a new plugin file in the `plugins/` folder.
    2. Implement the custom parser and commands.
    3. Add the plugin details to the `global-schema.json`.

- **Extending the Schema**:  
  Extend the schema with new commands or plugins, ensuring the `executionPipeline` can resolve them accurately.

---

## **6. References**

- **Base Schema**: [global-schema.json](./global-schema.json)
- **Core CLI**: [cli-core.js](./cli-core.js)
- **JSON Plugin**: [plugins/jsonPlugin.js](./plugins/jsonPlugin.js)
- **Custom DSL Plugin**: [plugins/customDSLPlugin.js](./plugins/customDSLPlugin.js)

---

This design provides a **scalable and efficient CLI system** with extensible features for future growth. Let me know if
you'd like additional guidance! 🚀