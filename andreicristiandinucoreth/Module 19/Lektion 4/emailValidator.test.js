const { validateEmail } = require("./emailValidator");

// These tests are all happy path - no edge cases!
// Your task: Add at least 10 edge case tests.

describe("validateEmail - Happy Path", () => {
  test("should accept valid email", () => {
    expect(validateEmail("user@example.com")).toBe(true);
  });

  test("should accept email with subdomain", () => {
    expect(validateEmail("user@mail.example.com")).toBe(true);
  });

  test("should accept email with numbers", () => {
    expect(validateEmail("user123@example.com")).toBe(true);
  });
});

describe("boundary cases", () => {
  test("should accept minimum length email", () => {
    expect(validateEmail("a@b.c")).toBe(true);
  });

  test("should reject email that is too short", () => {
    expect(() => validateEmail("a@b")).toThrow("Invalid email format");
  });

  test("should accept long email", () => {
    const longEmail = "a".repeat(64) + "@example.com";
    expect(validateEmail(longEmail)).toBe(true);
  });

  test("should accept maximum length email", () => {
    const longEmail = "a".repeat(242) + "@example.com";
    expect(validateEmail(longEmail)).toBe(true);
  });

  test("should reject email that is too long", () => {
    const longEmail = "a".repeat(243) + "@example.com";
    expect(() => validateEmail(longEmail)).toThrow("Invalid email format");
  });
});

describe("null/undefined/empty cases", () => {
  test("should reject null email", () => {
    expect(() => validateEmail(null)).toThrow("Email is required");
  });

  test("should reject undefined email", () => {
    expect(() => validateEmail(undefined)).toThrow("Email is required");
  });

  test("should reject empty string email", () => {
    expect(() => validateEmail("")).toThrow("Email is required");
  });

  test("should reject email with only spaces", () => {
    expect(() => validateEmail("   ")).toThrow("Email is required");
  });
});

describe("invalid format cases", () => {
  test("should reject email without @", () => {
    expect(() => validateEmail("userexample.com")).toThrow(
      "Email must contain @",
    );
  });

  test("should reject email with multiple @", () => {
    expect(() => validateEmail("user@@example.com")).toThrow(
      "Email must contain @",
    );
  });

  test("should reject email with @ at the end", () => {
    expect(() => validateEmail("userexample.com@")).toThrow(
      "Invalid email format",
    );
  });

  test("should reject email with @ at the beginning", () => {
    expect(() => validateEmail("@userexample.com")).toThrow(
      "Invalid email format",
    );
  });

  test("should reject email without tld", () => {
    expect(() => validateEmail("user@example")).toThrow("Invalid email format");
  });
});
