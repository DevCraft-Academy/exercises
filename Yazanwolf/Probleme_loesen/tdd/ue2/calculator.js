function add(a, b) {
    validateInput(a, b);
    return a + b;
}

function subtract(a, b) {
    validateInput(a, b);
    return a - b;
}

function multiply(a, b) {
    validateInput(a, b);
    return a * b;
}

function devide(a, b) {
    validateInput(a, b);
    if (b === 0) {
        throw new Error('Cannot devide by zero!');
    }
    return a / b;
}

function validateInput(a, b) {
    if (isNaN(a) || isNaN(b)) {
        throw new Error('Only numbers are allowed');
    }
}

module.exports = { add, subtract, multiply, devide };
