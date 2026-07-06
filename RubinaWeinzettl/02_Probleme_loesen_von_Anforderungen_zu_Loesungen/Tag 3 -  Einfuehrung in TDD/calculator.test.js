const { add, subtract, multiply, divide, rest } = require('./calculator');

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});

// addional test
test('adds 2 + 2 to equal 3 - is supposed to fail to check if test-case works correctly when confronted with false calculations and is therefore supposed to throw an error', () => {
  expect(add(2, 2)).toBe(3);
});

test('subtracts 3 - 1 to equal 2', () => {
  expect(subtract(3, 1)).toBe(2);
});

// additional test
test('subtracts 3 - 1.5 to equal 1.5 - checks if function works with float numbers', () => {
  expect(subtract(3, 1.5)).toBe(1.5);
});

test('multiplies 2 * 3 to equal 6', () => {
  expect(multiply(2, 3)).toBe(6);
});

// additional test
test('multiplies 2 * NULL to equal 6 - should throw an error when confronted with undefined values', () => {
  expect(multiply(2, NULL)).toBe(6);
});

test('divides 4 / 2 to equal 2', () => {
  expect(divide(4, 2)).toBe(2);
});

// additional test
test('divides 4 / 0 to equal 0 - should throw an error because division with 0 is forbidden', () => {
  expect(divide(4, 0)).toBe(0);
});

// additional test
test('divides 4 / 3, test should be one - checks if rest is calculated correctly', () => {
  expect(rest(4, 3)).toBe(1);
});
