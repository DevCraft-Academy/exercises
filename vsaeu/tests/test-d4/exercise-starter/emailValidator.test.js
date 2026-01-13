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

  describe("Boundaries", () => {
    test("should accept max length email", () => {
      const localPart = "a".repeat(242); // 242 Zeichen
      const domain = "example.com"; // 11 Zeichen
      const email = `${localPart}@${domain}`; // 242 + 1 (@) + 11 = 254 total
      expect(validateEmail(email)).toBe(true);
    });

    test("should accept email with min length", () => {
      expect(validateEmail("a@b.c")).toBe(true);
    });
  });

  describe("Leere Werte", () => {
    test("should handle empty string", () => {
      expect(() => validateEmail("")).toThrow("Email is required");
    });
    test("should handle string with only spaces", () => {
      expect(() => validateEmail("   ")).toThrow("Email is required");
    });

    test("should handle null", () => {
      expect(() => validateEmail(null)).toThrow("Email is required");
    });

    test("should handle undefined", () => {
      expect(() => validateEmail(undefined)).toThrow("Email is required");
    });
  });

  describe("Sonderzeichen", () => {
    test("should check for included @", () => {
      expect(() => validateEmail("ab.d")).toThrow("Email must contain @");
    });
    test("should handle multiple @", () => {
      expect(() => validateEmail("ab@cd@ef")).toThrow(
        "Email must contain exactly one @"
      );
    });
    test("should handle special characters", () => {
      expect(() => validateEmail("user+tag@example.com")).toThrow(
        "Email must contain exactly one @ and no special characters"
      );
    });
    test("should handle missing domain", () => {
      expect(() => validateEmail("usertag@examplecom")).toThrow(
        "Email must have a valid domain"
      );
    });
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
