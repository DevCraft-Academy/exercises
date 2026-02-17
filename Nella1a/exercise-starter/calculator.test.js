const { add, subtract, multiply } = require('./calculator');

// ========================================
// WARM-UP: Uncomment this test to experience the Red-Green cycle
// ========================================
test('add returns the sum of two positive numbers', () => {
  // Arrange
  const a = 2;
  const b = 3;

  // Act
  const result = add(a, b);

  // Assert
  expect(result).toBe(5);
});

// TODO: Write a test for the add function
// Tip: Use the AAA Pattern (Arrange-Act-Assert)
// You can use the numbers from the example or choose your own.
//
// Example structure:
test('add should return sum of two numbers', () => {
  // Arrange
  const a = 32;
  const b = 53;

  // Act
  const result = add(a, b);

  // Assert
  expect(result).toBe(85);
});

// TODO: Write a test for the subtract function
// Test with a larger number minus a smaller number (e.g., 10 - 4)
test('subtract returns the difference between two numbers', () => {
  const a = 1000;
  const b = 400;

  const result = subtract(a, b);

  expect(result).toBe(600);
});

// TODO: Write a test for multiply with 0 as an edge case
// What happens when you multiply a number by 0?
test('multiply returns 0 when one factor is 0', () => {
  const a = 2;
  const b = 0;

  const result = multiply(a, b);

  expect(result).toBe(0);
});
