const { add, subtract, multiply, divide } = require('./calculator');

//#region Tests for add
test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});
test('adds 1 + -1 to equal 0', () => {
  expect(add(1, -1)).toBe(0);
});
test('adds 0 + 0 to equal 0', () => {
    expect(add(0, 0)).toBe(0);
});
test('adds -2 + -3 to equal -5', () => {
    expect(add(-2, -3)).toBe(-5);
});
test('adds 0.1 + 0.2 to equal 0.3', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3);
    // Using toBeCloseTo for floating point precision
    // Famous failing addition test for js floaring point precision
});
//#endregion

//#region Tests for subtract
test('subtracts 7 - 3 to equal 4', () => {
  expect(subtract(7, 3)).toBe(4);
});
test('subtracts 3 - 7 to equal -4', () => {
    expect(subtract(3, 7)).toBe(-4);
});
test('subtracts 0 - 0 to equal 0', () => {
    expect(subtract(0, 0)).toBe(0);
});
test('subtracts -3 - -2 to equal -1', () => {
    expect(subtract(-3, -2)).toBe(-1);
});
//#endregion

//#region Tests for multiply
test('multiplies 3 * 4 to equal 12', () => {
  expect(multiply(3, 4)).toBe(12);
});
test('multiplies 3 * -4 to equal -12', () => {
  expect(multiply(3, -4)).toBe(-12);
});
test('multiplies 0 * 4 to equal 0', () => {
  expect(multiply(0, 4)).toBe(0);
});
test('multiplies -3 * -4 to equal 12', () => {
    expect(multiply(-3, -4)).toBe(12);
});
test('multiplies 5 * 0.2 to equal 1', () => {
    expect(multiply(5, 0.2)).toBe(1);
});
test('multiplies 0.1 * 0.2 to equal 0.02', () => {
    expect(multiply(0.1, 0.2)).toBeCloseTo(0.02);
});
//#endregion

//#region Tests for divide
test('divides 8 / 2 to equal 4', () => {
  expect(divide(8, 2)).toBe(4);
});
test('divides 8 / 0 to throw error', () => {
  expect(() => {
    divide(8, 0);
  }).toThrow("Cannot divide by zero");
});
test('divides 0 / 4 to equal 0', () => {
  expect(divide(0, 4)).toBe(0);
});
test('divides -8 / 2 to equal -4', () => {
    expect(divide(-8, 2)).toBe(-4);
});
test('divides -8 / -2 to equal 4', () => {
    expect(divide(-8, -2)).toBe(4);
});
//#endregion

