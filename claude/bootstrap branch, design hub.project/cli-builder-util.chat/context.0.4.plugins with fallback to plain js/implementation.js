// fallbacks/jsonFallback.js
module.exports = {
    parse: (jsonString) => {
        try {
            // Basic JSON parsing using plain JavaScript
            return JSON.parse(jsonString);
        } catch (err) {
            return {error: "Invalid JSON string", details: err.message};
        }
    }
};

//fallbacks/customDSLFallback
module.exports = {
    handleCommand: (inputString) => {
        const tokens = inputString.split(" ");
        if (tokens[0] === "add" && tokens.length === 3) {
            const num1 = parseInt(tokens[1], 10);
            const num2 = parseInt(tokens[2], 10);
            if (!isNaN(num1) && !isNaN(num2)) {
                return {result: num1 + num2};
            }
        }
        return {error: "Invalid command or format"};
    }
};

// updated cli-core.js
// Load Schema
const schema = require("./global-schema.json");

// Load Plugins
const plugins = {};
const fallbacks = {};

// Load Plugins and Fallbacks
for (const pluginConfig of schema.plugins) {
    try {
        const plugin = require(`./plugins/${pluginConfig.name}`);
        plugins[plugin.name] = plugin;
    } catch (err) {
        console.warn(`Plugin ${pluginConfig.name} not found. Falling back.`);
    }

    try {
        const fallback = require(`./${pluginConfig.commands[Object.keys(pluginConfig.commands)[0]].fallback}`);
        fallbacks[pluginConfig.name] = fallback;
    } catch (err) {
        console.error(`Fallback for ${pluginConfig.name} not found.`);
        process.exit(1);
    }
}

// Unified CLI Executor
const executeCommand = (commandVerb, args) => {
    // Check for plugin-specific execution
    for (const plugin of Object.values(plugins)) {
        if (plugin.commands[commandVerb]) {
            return plugin.commands[commandVerb].resolver(...args);
        }
    }

    // Check for fallback execution
    for (const fallback of Object.values(fallbacks)) {
        if (fallback[commandVerb]) {
            console.warn(`Using fallback for ${commandVerb}`);
            return fallback[commandVerb](...args);
        }
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

