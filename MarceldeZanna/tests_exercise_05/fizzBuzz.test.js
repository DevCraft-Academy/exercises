// TODO: Import the fizzBuzz function
const fizzBuzz = require('./fizzBuzz');

// TODO: Step 1 - Test for normal numbers (not divisible by 3 or 5)
// Tip: Write the test FIRST, run it (RED), then write the function

test('fizzBuzz should return "1" for 1', () => {
  expect(fizzBuzz(1)).toBe('1');
});

test('fizzBuzz should return "2" for 2', () => {
  expect(fizzBuzz(2)).toBe('2');
});

// TODO: Step 2 - Test for numbers divisible by 3
// These should return "Fizz"

test('fizzBuzz should return "Fizz" for 3', () => {
  expect(fizzBuzz(3)).toBe('Fizz');
});

// TODO: Step 3 - Test for numbers divisible by 5
// These should return "Buzz"

test('fizzBuzz should return "Buzz" for 5', () => {
  expect(fizzBuzz(5)).toBe('Buzz');
});

// TODO: Step 4 - Test for numbers divisible by 3 AND 5
// These should return "FizzBuzz"

test('fizzBuzz should return "FizzBuzz" for 15', () => {
  expect(fizzBuzz(15)).toBe('FizzBuzz');
});

test('fizzBuzz should return "Fizz" for 6', () => {
  expect(fizzBuzz(6)).toBe('Fizz');
});

test('fizzBuzz should return "Buzz" for 10', () => {
  expect(fizzBuzz(10)).toBe('Buzz');
});

test('fizzBuzz should return "FizzBuzz" for 30', () => {
  expect(fizzBuzz(30)).toBe('FizzBuzz');
});

// IMPORTANT: Write each test FIRST before extending the function!
// Follow the Red-Green-Refactor cycle:
// 1. Write test (RED)
// 2. Write minimal code (GREEN)
// 3. Refactor if needed
// 4. Repeat
