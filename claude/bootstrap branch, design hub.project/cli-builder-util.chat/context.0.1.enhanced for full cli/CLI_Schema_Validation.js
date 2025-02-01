const schema = require("./schema.json"); // The enhanced CLI schema (JSON)
const {validateSchema} = require("./validator");

const errors = validateSchema(schema);

if (errors.length > 0) {
    console.error("Schema Validation Failed:", errors);
    process.exit(1);
} else {
    console.log("Schema is valid!");
}