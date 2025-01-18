const add = require('./calculator');
const subtract = require('./subtract');
const multiply = require('./multiply');
const divide = require('./divide');

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});

test('subtracts 3 - 1 to equal 2', () => {
    expect(subtract(3, 1)).toBe(2);
});
  
test('multiplies 2 * 3 to equal 6', () => {
    expect(multiply(2, 3)).toBe(6);
});
  
test('divides 4 / 2 to equal 2', () => {
    expect(subtract(4, 2)).toBe(2);
});