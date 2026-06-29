// little helperfunction

function validateNumbers(a, b) {
  const n1 = Number(a);
  const n2 = Number(b);

  if (Number.isNaN(n1) || Number.isNaN(n2)) {
    throw new TypeError(`Invalid number(s): ${a}, ${b}`);
  }

  return [n1, n2];
}

function add(a, b) {
  const [n1, n2] = validateNumbers(a, b);
  return n1 + n2;
}

function subtract(a, b) {
  const [n1, n2] = validateNumbers(a, b);
  return n1 - n2;
}

function multiply(a, b) {
  const [n1, n2] = validateNumbers(a, b);
  return n1 * n2;
}

function divide(a, b) {
  const [n1, n2] = validateNumbers(a, b);

  if (n2 === 0) {
    throw new TypeError('Division by zero is not allowed');
  }

  return n1 / n2;
}

module.exports = { add, subtract, multiply, divide };
