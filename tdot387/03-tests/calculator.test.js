const { add, substract, multiply, divide } = require('./calculator');

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});

test('subtracts 2 - 1 to equal 1', () => {
  expect(substract(2, 1)).toBe(1);
});

test('multiplies 2 * 2 to equal 4', () => {
  expect(multiply(2, 2)).toBe(4);
});

test('divides 4 / 2 to equal 2', () => {
  expect(divide(4, 2)).toBe(2);
});

/** weitere Tests **/

test('add -2 + 4 to equal 2', () => {
  expect(add(-2, 4)).toBe(2);
});

test('divides 6 / 0 should throw an error', () => {
  expect(() => divide(6, 0)).toThrow('Divided by zero');
});

test('multiply 1.5 * 2 to equal 3', () => {
  expect(multiply(1.5, 2)).toBe(3);
});
