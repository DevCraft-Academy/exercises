const { add, subtract, multiply } = require("./calculator");

test("add should return sum of two numbers", () => {
  // Arrange
  const a = 5;
  const b = 2;

  // Act
  const result = add(a, b);

  // Assert
  expect(result).toBe(7);
});

test("add should return correct sum of negative numbers", () => {
  // Arrange
  const a = -3;
  const b = -7;

  // Act
  const result = add(a, b);

  // Assert
  expect(result).toBe(-10);
});

test("subtract should return difference of two numbers", () => {
  // Arrange
  const a = 10;
  const b = 4;

  // Act
  const result = subtract(a, b);

  // Assert
  expect(result).toBe(6);
});

test("subtract should return a negative result when the second number is larger", () => {
  // Arrange
  const a = 5;
  const b = 10;

  // Act
  const result = subtract(a, b);

  // Assert
  expect(result).toBe(-5);
});

test("multiply should return product of two numbers", () => {
  // Arrange
  const a = 3;
  const b = 4;

  // Act
  const result = multiply(a, b);

  // Assert
  expect(result).toBe(12);
});

test("multiply should return a negative result when one of the numbers is negative", () => {
  // Arrange
  const a = -3;
  const b = 4;

  // Act
  const result = multiply(a, b);

  // Assert
  expect(result).toBe(-12);
});

test("multiply should return a positive result when both numbers are negative", () => {
  // Arrange
  const a = -3;
  const b = -4;

  // Act
  const result = multiply(a, b);

  // Assert
  expect(result).toBe(12);
});

test("multiply should return 0 when one of the numbers is 0", () => {
  // Arrange
  const a = 5;
  const b = 0;

  // Act
  const result = multiply(a, b);

  // Assert
  expect(result).toBe(0);
});
