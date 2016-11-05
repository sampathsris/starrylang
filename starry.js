
/*
 * A javaScript implemetation of Starry (https://esolangs.org/wiki/Starry).
 */

/*
 * Default I/O functions.
 */
function print(str) {
    process.stdout.write(str);
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
function div() {
    const y = this.stack.pop();
    
    if (y === 0) throw "Division by zero error.";

    const x = this.stack.pop();
    this.stack.push(x / y);
}

/**
 * Pop y, pop x, push x % y.
 */
function mod() {
    const y = this.stack.pop();
    
    if (y === 0) throw "Division by zero error.";
    
    const x = this.stack.pop();
    this.stack.push(x % y);
}

/**
 * Pop a value and print it as a number.
 */
function printn() {
    this.print(this.stack.pop().toString());
}

/**
 * Pop a value and print it as an ASCII character.
 */
function printc() {
    this.print(String.fromCharCode(this.stack.pop()));
}

/**
 * Read a number from input and push it to stack.
 */
function readn() {
    throw "Not implemented.";
}

/**
 * Read an ASCII value from input and push it to stack.
 */
function readc() {
    throw "Not implemented.";
}

/**
 * Pop a value; if non-zero, jump to label n.
 */
function jnz(jump) {
    const top = this.stack.pop();

    if (top !== 0) {
        this.pc = jump;
    }
}

const OP_BASIC = [
    undefined,
    dup,
    swap,
    rotate,
    pop,
    pushn
];

const OP_ARITHMATIC = [
    add,
    sub,
    mul,
    div,
    mod
];

const OP_PRINT = [
    printn,
    printc
];

const OP_READ = [
    readn,
    readc
];

function ParserError(message, location) {
    this.message = message;
    this.location = location;
}

/**
 * Interpret a given string of code and return an array of operations.
 */
function interpret() {
    if (!this.code) throw new ParserError("Empty program", 0);

    const codeLength = this.code.length;
    let calc = 0;

    while (this.pc < codeLength) {
        const char = this.code.charAt(this.pc);
        
        switch (char) {
            case " ":
                calc++;
                break;

            case "+":
                if (calc === 0) {
                    throw new ParserError("Invalid operation", this.pc);
                } else if (calc < 5) {
                    (OP_BASIC[calc]).call(this);
                } else {
                    pushn.call(this, calc - 5);
                }

                calc = 0;
                break;

            case "*":
                (OP_ARITHMATIC[calc % OP_ARITHMATIC.length]).call(this);
                calc = 0;
                break;

            case ".":
                (OP_PRINT[calc % OP_PRINT.length]).call(this);
                calc = 0;
                break;

            case ",":
                (OP_READ[calc % OP_READ.length]).call(this);
                calc = 0;
                break;

            case "`":
                if (this.labels[calc]) {
                    throw new ParserError("Duplicate label " + calc, this.pc);
                }

                this.labels[calc] = this.pc;
                calc = 0;
                break;

            case "'":
                let label = calc;
                let jump = this.labels[label];

                if (!jump) {
                    throw new ParserError("Unrecognized label " + calc, this.pc);
                }

                jnz.call(this, jump);
                calc = 0;
                break;

            default:
                break;
        }

        this.pc++;
    }
}

/**
 * Entry point
 */
function Starry(src, options) {
    options = options || {};
    
    let vm = {
        "options": options,
        "print": options.print || print,
        "code": src,
        "stack": [],
        "labels": {},
        "pc": 0
    };

    try {
        interpret.call(vm);
    } catch (error) {
        if (error instanceof ParserError) {
            console.log("PARSER ERROR: " + error.message);
            console.log("    at " + error.location);
        } else {
            console.log("UNEXPECTED ERROR: " + error.message ? error.message : "");
            console.log(error)
        }
    }
}

module.exports = Starry;
