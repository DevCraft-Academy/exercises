const { trim, capitalize, slugify } = require("./stringUtils");

/**
 * YOUR TASK:
 *
 * Refactor these tests! They are too vague and let bugs slip through.
 * Replace the vague assertions with specific, meaningful assertions.
 *
 * HINT: Some tests will fail after refactoring –
 * that's good! Those are the bugs the vague assertions missed.
 */

describe("trim", () => {
  test("removes whitespace", () => {
    const result = trim("  hello  ");

    // expect(result).toBeTruthy();
    expect(result).toBe("hello");
  });

  test("returns empty string for empty input", () => {
    const result = trim("");

    // expect(result == '').toBe(true);
    expect(result).toBe("");
  });

  test("returns empty string for non-string input", () => {
    const result = trim(123);

    expect(result).toBe("");
  });

  test("returns empty string for string with only spaces", () => {
    const result = trim("     ");

    expect(result).toBe("");
  });

  test("works with string without spaces", () => {
    const result = trim("hello");

    // expect(typeof result).toBe('string');
    expect(result).toBe("hello");
  });
});

describe("capitalize", () => {
  test("makes first letter uppercase", () => {
    const result = capitalize("hello");

    // expect(result.charAt(0)).toBe('H');
    expect(result).toBe("Hello");
  });

  test("works with single character strings", () => {
    const result = capitalize("a");

    // expect(result.length).toBe(1);
    expect(result).toBe("A");
  });

  test("capitalizes UPPERCASE correctly", () => {
    const result = capitalize("HELLO");

    // expect(result.charAt(0)).toBe('H');
    expect(result).toBe("Hello");
  });
});

describe("slugify", () => {
  test("replaces spaces with dashes", () => {
    const result = slugify("Hello World");

    // expect(result).toContain('-');
    expect(result).toBe("hello-world");
  });

  test("converts to lowercase", () => {
    const result = slugify("HELLO");

    // expect(typeof result).toBe('string');
    expect(result).toBe("hello");
  });

  test("works with multiple words", () => {
    const result = slugify("Hello  Beautiful  World");

    // expect(result).toContain('-');
    expect(result).toBe("hello-beautiful-world");
  });

  test("returns empty string for empty input", () => {
    const result = slugify("");

    // expect(result == '').toBe(true);
    expect(result).toBe("");
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
