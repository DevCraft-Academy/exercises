const { add, subtract, multiply } = require('./calculator');

// ========================================
// WARM-UP: Uncomment this test to experience the Red-Green cycle
// ========================================

// TODO: Write a test for the add function
// Tip: Use the AAA Pattern (Arrange-Act-Assert)
test('add should return sum of two numbers', () => {
    const a = 5;
    const b = 30;

    const result = add(a, b)

    expect(result).toBe(35)
})


// TODO: Write a test for the subtract function
// Test with a larger number minus a smaller number (e.g., 10 - 4)
test('subtract should return a smaller number', () => {
    const a = 8;
    const b = 4;

    const result = subtract(a, b);

    expect(result).toBe(4)
})


// TODO: Write a test for multiply with 0 as an edge case
// What happens when you multiply a number by 0?
test('multiply a number by 0', () => {
    const a = 5
    const b = 0

    const result = multiply(a, b)

    expect(result).toBe(0)
})