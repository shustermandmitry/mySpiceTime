const {Lexer, CstParser} = require("chevrotain");

// Define a lexer/parser for the custom DSL
const Add = createToken({name: "Add", pattern: /add/});
const Number = createToken({name: "Number", pattern: /\d+/});
const WhiteSpace = createToken({name: "WhiteSpace", pattern: /\s+/, group: Lexer.SKIPPED});

const DSLLexer = new Lexer([WhiteSpace, Add, Number]);

class DSLParser extends CstParser {
    constructor() {
        super([Add, Number]);
        const $ = this;

        $.RULE("addExpression", () => {
            $.CONSUME(Add); // Command `add`
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