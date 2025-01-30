# **Design Document: Custom CLI Tool with Yeoman Integration**

---

## **Project Title**

Custom CLI Tool Leveraging Yeoman (**Internal Scaffolding System**)

## **Author(s)**

[Your Name or Team Name]

## **Version**

1.0.0

## **Date**

[Today’s Date]

---

## **Objectives**

The main goal of this project is to create a **custom CLI tool** that provides scaffolding (code generation)
capabilities by leveraging Yeoman’s templating and workflow features while hiding direct interaction with Yeoman. The
CLI will expose clearly-defined commands and a unified API for both Yeoman-backed generators and custom tools, making it
tailored to the specific needs of the internal development teams.

---

## **Key Features**

1. **Custom Command-Line Interface (CLI):**
    - Single entry point (`my-cli`) for developers.
    - Support for scaffolding various projects (e.g., applications, libraries, components, APIs) via **custom generators
      **.
    - Modular command structure with options for:
        - Generating code templates (via Yeoman under the hood).
        - Managing artifacts (cleaning temporary files).
        - Listing available generators.
        - Version information and help menus.

2. **Generators:**
    - Mimic Yeoman’s API (prompting, writing, templates) in a **transparent yet extensible way**.
    - Scaffold boilerplate projects (e.g., React components, TypeScript packages, API backends).
    - Templates dynamically populated with user input (name, author, description, etc.).
    - Standardized directory structure across generated projects.

3. **Custom Tools:**
    - Extend Yeoman functionality with additional CLI tools like:
        - Cleaning build artifacts.
        - Running post-generation scripts (e.g., `pnpm install`, `git init`).

4. **Dynamic Generators Registry:**
    - Dynamically load and expose available generators from the `generators/` directory.
    - Self-discovery of new generators by simply adding them to the folder.

5. **Post-Generation Automation:**
    - Automated installation of dependencies (via `pnpm install`).
    - Git initialization (`git init` in the generated directory).

6. **Ease of Use:**
    - Minimal learning curve – developers only learn `my-cli` commands, not Yeoman or additional tools.

---

## **Technical Design**

### **1. CLI Structure**

The CLI (exposed via `my-cli`) will be built using the **Commander** library. The commands will be modular and invoke
Yeoman’s generators under the hood, along with custom utilities.

#### **Structure Overview**:

- **Commands:**
    - `my-cli generate <generator>`: Invoke a custom generator.
    - `my-cli clean`: Custom command to clean up build artifacts or temporary files.
    - `my-cli list`: List all available generators in the system.
    - `my-cli --version`: Display version information.
    - `my-cli --help`: Display help documentation.

---

### **2. File/Directory Structure**

```plaintext
my-cli/
├── bin/                            # CLI entry point 
│   └── cli.js                      # Main CLI logic (Commander-based)
├── generators/                     # Custom generators (Yeoman-based)
│   ├── package/                    # Generator: Package boilerplate
│   │   ├── index.js                # Generator code for 'package'
│   │   └── templates/              # Templates for the 'package' generator
│   │       ├── src/index.ts
│   │       └── package.json.ejs
│   ├── react-component/            # Generator: React component boilerplate
│   │   ├── index.js
│   │   └── templates/
├── src/                            # Auxiliary CLI utilities
│   └── utils/cleaner.js            # Custom cleaning utility
├── .gitignore                      # Typical Git ignore rules
└── package.json                    # Define dependencies and CLI bin entry
```

---

### **3. CLI Entry Point (`bin/cli.js`)**

The **commander-based** CLI will serve as the entry point:

- Use Yeoman Environment (`yeoman-environment`) to programmatically run custom generators.
- Dynamically load from the `generators/` directory to keep the CLI extensible.

```javascript
#!/usr/bin/env node

const {Command} = require("commander");
const env = require("yeoman-environment");
const fs = require("fs");
const path = require("path");

const program = new Command();

// --- Version ---
program.version("1.0.0").description("Custom CLI Tool - Internal Scaffolding System");

// --- Generate (Scaffolding) ---
program
    .command("generate <generator>")
    .description("Scaffold a project using the specified generator")
    .action(async (generator) => {
        const generatorPath = path.join(__dirname, `../generators/${generator}`);
        const yeomanEnv = env.createEnv();

        if (!fs.existsSync(generatorPath)) {
            console.error(`❌ Generator "${generator}" not found!`);
            process.exit(1);
        }

        console.log(`✨ Running generator "${generator}"...`);
        yeomanEnv.register(require.resolve(generatorPath), `my-cli:${generator}`);

        try {
            await yeomanEnv.run(`my-cli:${generator}`);
            console.log(`✅ Successfully generated "${generator}"!`);
        } catch (err) {
            console.error(`❌ Error running generator "${generator}":`, err.message);
        }
    });

// --- List Generators ---
program
    .command("list")
    .description("List all available generators")
    .action(() => {
        const generatorsDir = path.join(__dirname, "../generators");
        const generators = fs.readdirSync(generatorsDir);
        console.log("Available generators:");
        generators.forEach((gen) => console.log(`- ${gen}`));
    });

// --- Clean (Custom Tool) ---
program
    .command("clean")
    .description("Remove temporary artifacts and clean workspace")
    .action(() => {
        require("../src/utils/cleaner").cleanArtifacts();
    });

// Parse input
program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
```

---

### **4. Custom Generators**

Each generator replicates Yeoman’s structure with `prompting` and `writing` phases.

#### **Example: Package Generator**

**Structure**:

```plaintext
generators/package/
├── index.js
└── templates/
    ├── src/index.ts
    └── package.json.ejs
```

**`index.js`**:

```javascript
const Generator = require("yeoman-generator");

module.exports = class extends Generator {
    async prompting() {
        this.answers = await this.prompt([
            {
                type: "input",
                name: "packageName",
                message: "Enter the package name:",
                default: "my-package"
            },
            {
                type: "input",
                name: "author",
                message: "Enter the author name:",
                default: "Developer"
            }
        ]);
    }

    writing() {
        const {packageName, author} = this.answers;

        this.fs.copyTpl(
            this.templatePath("src/index.ts"),
            this.destinationPath(`${packageName}/src/index.ts`),
            {packageName, author}
        );

        this.fs.copyTpl(
            this.templatePath("package.json.ejs"),
            this.destinationPath(`${packageName}/package.json`),
            {packageName, author}
        );
    }
};
```

**Template Example**:

- **`src/index.ts`**:

```typescript
export const hello = (): string => {
    return "Hello, <%= packageName %>!";
};
```

- **`package.json.ejs`**:

```json
{
  "name": "<%= packageName %>",
  "author": "<%= author %>",
  "version": "1.0.0",
  "license": "MIT"
}
```

---

### **5. Custom Utilities**

#### **Cleaner Utility**

Include non-scaffolding utilities (e.g., cleaning build artifacts). These live outside Yeoman’s scope to maintain
modularity.

**`src/utils/cleaner.js`**:

```javascript
const fs = require("fs");
const path = require("path");

const cleanArtifacts = () => {
    const dirsToClean = ["dist", "tmp", "artifacts"];
    dirsToClean.forEach((dir) => {
        const dirPath = path.join(process.cwd(), dir);
        if (fs.existsSync(dirPath)) {
            fs.rmSync(dirPath, {recursive: true});
            console.log(`🗑️ Removed: ${dirPath}`);
        }
    });
};

module.exports = {cleanArtifacts};
```

---

### **Advantages**

- **Unified CLI Experience**: Users don’t know or need Yeoman; everything is exposed via a custom API.
- **Scalable Generators**: Add new generators seamlessly (plug-and-play via `generators` folder).
- **Post-Generation Automation**: Automate recurring steps like installing dependencies or setting up Git.
- **Team-Specific Customizations**: Add organizational best practices into pre-built templates.

---

### **Conclusion**

This CLI provides developers with a robust, extensible tool for scaffolding projects, combining Yeoman’s proven
capabilities with custom extensions. It ensures **ease of use**, scalability, and alignment with team workflows.

---

Let me know if you need anything else! 😊