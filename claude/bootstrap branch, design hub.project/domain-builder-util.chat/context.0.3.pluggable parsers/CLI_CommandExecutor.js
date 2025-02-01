// Step 1: Load the Schema
const schema = require("./cli-schema.json");

// Step 2: Register Plugins
const plugins = {};
for (const pluginConfig of schema.plugins) {
    const plugin = require(`./plugins/${pluginConfig.name}`);
    plugins[plugin.name] = plugin;
}

// Step 3: Unified Command Executor
const executeCommand = (commandVerb, args) => {
    // Check if the command belongs to global or a plugin
    for (const plugin of Object.values(plugins)) {
        if (plugin.commands[commandVerb]) {
            // Forward to plugin resolver
            return plugin.commands[commandVerb].resolver(...args);
        }
    }

    // Otherwise, resolve via the global schema's commands
    const globalCommand = schema.globalCommands.find((cmd) => cmd.verb === commandVerb);
    if (globalCommand) {
        const resolverFn = eval(globalCommand.resolver);
        return resolverFn(...args);
    }

    throw new Error(`Command '${commandVerb}' not found.`);
};

// Step 4: Add CLI Entry Point
const input = "parseJson '{\"key\":\"value\"}'"; // Example command
const [command, ...args] = input.split(" ");

try {
    const result = executeCommand(command, args);
    console.log("Output:", result);
} catch (err) {
    console.error(err.message);
}