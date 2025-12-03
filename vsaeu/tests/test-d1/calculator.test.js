const { add, subtract, multiply } = require('./calculator');

// ========================================
// WARM-UP: Uncomment this test to experience the Red-Green cycle
// ========================================
test('add should return sum of two numbers', () => {
  // Arrange
  const a = 2;
  const b = 3;

  // Act
  const result = add(a, b);

  // Assert
  expect(result).toBe(5);
});
test('add should should handle addition of two negative numbers', () => {
  // Arrange
  const a = -7;
  const b = -2;

  // Act
  const result = add(a, b);

  // Assert
  expect(result).toBe(-9);
});

test('substract should return the substraction from to numbers', () => {
  // Arrange
  const a = 10;
  const b = 3;

  // Act
  const result = subtract(a, b);

  // Assert
  expect(result).toBe(7);
});

test('substract should return negative number when second number is larer than first', () => {
  // Arrange
  const a = 10;
  const b = 25;

  // Act
  const result = subtract(a, b);

  // Assert
  expect(result).toBe(-15);
});

test('multyply should return 0 when multiplied by 0', () => {
  // Arrange
  const a = 13;
  const b = 0;

  // Act
  const result = multiply(a, b);

  // Assert
  expect(result).toBe(0);
});

test('multyply should return positive number when two negative numbers are multiplied', () => {
  // Arrange
  const a = -5;
  const b = -6;

  // Act
  const result = multiply(a, b);

  // Assert
//   expect(result).toBe(30);
});

// TODO: Write a test for the add function
// Tip: Use the AAA Pattern (Arrange-Act-Assert)
// You can use the numbers from the example or choose your own.
//
// Example structure:
// test('add should return sum of two numbers', () => {
//   // Arrange
//   const a = 2;
//   const b = 3;
//
//   // Act
//   const result = add(a, b);
//
//   // Assert
//   expect(result).toBe(5);
// });

// TODO: Write a test for the subtract function
// Test with a larger number minus a smaller number (e.g., 10 - 4)

// TODO: Write a test for multiply with 0 as an edge case
// What happens when you multiply a number by 0?
