const { validateEmail } = require('./emailValidator');

// These tests are all happy path - no edge cases!
// Your task: Add at least 10 edge case tests.

describe('validateEmail - Happy Path', () => {
  test('should accept valid email', () => {
    expect(validateEmail('user@example.com')).toBe(true);
  });

  test('should accept email with subdomain', () => {
    expect(validateEmail('user@mail.example.com')).toBe(true);
  });

  test('should accept email with numbers', () => {
    expect(validateEmail('user123@example.com')).toBe(true);
  });
});

// TODO: Add your edge case tests here!
//
// Use the checklists from the article:
// 1. Boundary Cases (very short/long emails)
// 2. Null/Undefined/Empty Cases
// 3. Invalid Format Cases (no @, multiple @, etc.)
// 4. Special Characters
//
// Example:
// describe('validateEmail - Boundary Cases', () => {
//   test('should accept minimum length email', () => {
//     expect(validateEmail('a@b.c')).toBe(true);
//   });
//
//   test('should reject email that is too short', () => {
//     expect(() => validateEmail('a@b')).toThrow('Invalid email format');
//   });
// });
