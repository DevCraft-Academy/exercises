const { add, subtract, multiply, divide } = require('./calculator');

// basic tests

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});

test('subtract 2-1 to equal 1', () => {
  expect(subtract(2, 1)).toBe(1);
});

test('multiply 1 * 2  to equal 2', () => {
  expect(multiply(1, 2)).toBe(2);
});

test('divide 2/2 to equal 1', () => {
  expect(divide(2, 2)).toBe(1);
});

// addtional tests

test('adds -1 + -2 to equal -3', () => {
  expect(add(-1, -2)).toBe(-3);
});

test('adds -1 + 2 to equal 1', () => {
  expect(add(-1, 2)).toBe(1);
});

test('multiply -1 * -1 to equal 1', () => {
  expect(multiply(-1, -1)).toBe(1);
});

test('divide 2/0 throws error', () => {
  expect(() => divide(2, 0)).toThrow('Cannot divide by zero');
});
