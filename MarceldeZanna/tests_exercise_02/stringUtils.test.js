const { trim, capitalize, slugify } = require('./stringUtils');

/**
 * YOUR TASK:
 *
 * Refactor these tests! They are too vague and let bugs slip through.
 * Replace the vague assertions with specific, meaningful assertions.
 *
 * HINT: Some tests will fail after refactoring –
 * that's good! Those are the bugs the vague assertions missed.
 */

describe('trim', () => {
  test('removes whitespace', () => {
    const result = trim('  hello  ');
    // TODO: This is too vague - just checks if something is returned
    // Origin: expect(result).toBeTruthy();
    expect(result).toBe('hello')
  });

  test('returns empty string for empty input', () => {
    const result = trim('');
    // TODO: Boolean comparison instead of checking the actual value
    // Origin: expect(result == '').toBe(true);
    expect(result).toBe('');
  });

  test('works with string without spaces', () => {
    const result = trim('hello');
    // TODO: Only checks the type, not the value
    //Origin: expect(typeof result).toBe('string');
    expect(result).not.toContain(' ')
  });
});

describe('capitalize', () => {
  test('makes first letter uppercase', () => {
    const result = capitalize('hello');
    // TODO: Only checks first character, not the rest
    //Origin: expect(result.charAt(0)).toBe('H');
    expect(result).toBe('Hello')
  })

  test('works with single character strings', () => {
    const result = capitalize('a');
    // TODO: Only checks length, not the actual value
    //Origin: expect(result.length).toBe(1);
    expect(result).toBe('A')
  });

  test('capitalizes UPPERCASE correctly', () => {
    const result = capitalize('HELLO');
    // TODO: Only checks first character - misses that rest should be lowercase
    expect(result).toContain('Hello');
  });
});

describe('slugify', () => {
  test('replaces spaces with dashes', () => {
    const result = slugify('Hello World');
    // TODO: Too broad - only checks if dash exists somewhere
    expect(result).toBe('hello-world');
  });

  test('converts to lowercase', () => {
    const result = slugify('HELLO');
    // TODO: Only checks type, not the value
    expect(result).toBe('hello');
  });

  test('works with multiple words', () => {
    const result = slugify('Hello  Beautiful  World');
    // TODO: Only checks if dash exists - doesn't catch double dashes
    expect(result).toBe('hello-beautiful-world');
  });

  test('returns empty string for empty input', () => {
    const result = slugify('');
    // TODO: Boolean comparison instead of checking the actual value
    expect(result).toBe('');
  });
});

/**
 * EXPECTED RESULTS WITH THESE VAGUE ASSERTIONS:
 *
 * All tests should PASS (green) - but that's the problem!
 * The vague assertions let bugs slip through:
 * 1. trim() only removes leading spaces, not trailing
 * 2. capitalize() doesn't lowercase the rest ('HELLO' -> 'HELLO' instead of 'Hello')
 * 3. slugify() creates double dashes with multiple spaces
 *
 * YOUR TASK:
 * - Replace the vague assertions with specific ones
 * - Use toBe() with exact expected values
 * - Watch the tests turn RED and discover the bugs!
 * - Document the bugs in BUGS.md
 */
