const espree = require("espree");

module.exports = {
    name: "jsonPlugin",
    parser: espree,
    commands: {
        parseJson: {
            resolver: (jsonString) => {
                try {
                    // Parse JSON input and execute logic
                    const parsed = JSON.parse(jsonString);
                    return parsed;
                } catch (err) {
                    throw new Error("Invalid JSON data!");
                }
            }
        }
    }
};