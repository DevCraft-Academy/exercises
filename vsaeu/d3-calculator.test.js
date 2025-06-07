const { add, subtract, multiply, divide } = require('./calculator');

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});

test('subtracts 2 - 1 to equal 1', () => {
  expect(subtract(2, 1)).toBe(1);
});

test('multiplies 2 * 4 to equal 8', () => {
  expect(multiply(2, 4)).toBe(8);
});

// test ob multiplizieren mit Kommazhalen geht
test('multiplies 2.5 * 2 to equal 5', () => {
  expect(multiply(2.5, 2)).toBe(5);
});

test('divide 2 / 2 to equal 1', () => {
  expect(divide(2, 2)).toBe(1);
});

// Durch 0 darf man nicht teilen
test('dicvide 4 / 0 to throw error', () => {
  expect(() => divide(4, 0)).toThrow('Cannot divide by zero');
});

// mathematisch nicht ganz korrekt, aber es soll nichts kleriner wie 0 werden
test('substract 2-5 to thorw error', () => {
  expect(() => subtract(2, 5)).toThrow('negative number');
});
