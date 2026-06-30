const fizzBuzz = require('./fizzBuzz');

describe("red green refactor", () => {
// test('should test something', () => {
//   expect(fizzBuzz(1)).toBe(true);
// });

test('should- return Fizz with 3', () => {
  expect(fizzBuzz(3)).toBe('Fizz');
});

test('should return Fizz when dividable with 3', () => {
  expect(fizzBuzz(9)).toBe('Fizz');
});

test('should return Buzz when dividable with 5', () => {
  expect(fizzBuzz(5)).toBe('Buzz');
});

test('should return FizzBuzz when dividable with 5 and 3', () => {
  expect(fizzBuzz(15)).toBe('FizzBuzz');
});

test('should return number as string for other numbers', () => {
  expect(fizzBuzz(2)).toBe('2');
});

test('should return Whizz with 7', () => {
  expect(fizzBuzz(7)).toBe('Whizz');
});

test('should return FizzBuzzWhizz when dividable through 3, 5 and 7', () => {
  expect(fizzBuzz(105)).toBe('FizzBuzzWhizz');
});

// test('should return Buzz with 3', () => {
//   expect(fizzBuzz(3)).toBe('Fizz');
// });



});