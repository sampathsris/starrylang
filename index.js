
/*
 * A javaScript implemetation of Starry (https://esolangs.org/wiki/Starry).
 */

/*
 * Default I/O functions.
 */

/**
 * Parse a given string of code and return an array of operations.
 */
function parse (src) {
    if (!src) throw "Empty program";

    const length = src.length;
    let calc = 0;

    for (var i = 0; i < length; i++) {
        const char = src.charAt(i);
        
        switch (char) {
            case " ":
                calc++;
                break;
            case "+":
                break;
            case "*":
                break;
            case ".":
                break;
            case ",":
                break;
            case "`":
                break;
            case "'":
                break;
        
            default:
                break;
        }
    }
}

/**
 * Invalid opcode.
 */
function invalid() {
    throw "Invalid opcode.";
}

/**
 * Duplicate top of stack.
 */
function dup() {
    this.stack.push(this.stack[this.stack.length - 1]);
}

/**
 * Swap top two stack elements.
 */
function swap() {
    const last = this.stack.length - 1;
    const temp = this.stack[last];
    this.stack[last] = this.stack[last - 1];
    this.stack[last - 1] = temp;
}

/**
 * Rotate top 3 stack elements.
 */
function rotate() {
    const top = this.stack.pop();
    this.stack.splice(this.stack.length - 2, 0, top);
}

/**
 * Pop top of stack.
 */
function pop() {
    this.stack.pop();
}

/**
 * Push n to stack.
 */
function pushn(n) {
    this.stack.push(n);
}

/**
 * Pop y, pop x, push x + y.
 */
function add() {
    const y = this.stack.pop();
    const x = this.stack.pop();
    this.stack.push(x + y);
}

/**
 * Pop y, pop x, push x - y.
 */
function sub() {
    const y = this.stack.pop();
    const x = this.stack.pop();
    this.stack.push(x - y);
}

/**
 * Pop y, pop x, push x * y.
 */
function mul() {
    const y = this.stack.pop();
    const x = this.stack.pop();
    this.stack.push(x * y);
}

/**
 * Pop y, pop x, push x / y.
 */
function add() {
    const y = this.stack.pop();
    
    if (y === 0) throw "Division by zero error.";

    const x = this.stack.pop();
    this.stack.push(x / y);
}

/**
 * Pop y, pop x, push x % y.
 */
function add() {
    const y = this.stack.pop();
    
    if (y === 0) throw "Division by zero error.";
    
    const x = this.stack.pop();
    this.stack.push(x % y);
}

/*
 * Basic operations.
 */
const OP_INVALID = 0;
const OP_DUP = 1;
const OP_SWAP = 2;
const OP_ROTATE = 3;
const OP_POP = 4;
const OP_PUSHN = 5;

const OP = [
    invalid,
    dup,
    swap,
    rotate,
    pop,
    pushn
];

/**
 * Entry point
 */
function Starry(src, options) {
    this.options = options || {};
    this.code = parse(src);
    this.stack = [];
    this.labels = {};
}

/*
 * Compound operations.
 */

Starry.prototype.run = function () {

}

module.exports = Starry;
