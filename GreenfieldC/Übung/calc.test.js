// calculator.test.js

const { add, subtract, multiply, divide } = require("./calc");

describe("Calculator Functions", () => {
  // Addition Tests
  describe("add()", () => {
    test("adds 1 + 2 to equal 3", () => {
      expect(add(1, 2)).toBe(3);
    });
  });

  // Subtraction Tests
  describe("subtract()", () => {
    test("subtracts 5 - 2 to equal 3", () => {
      expect(subtract(5, 2)).toBe(3);
    });

    test("subtracts 0 - 0 to equal 0", () => {
      expect(subtract(0, 0)).toBe(0);
    });
  });

  // Multiplication Tests
  // Begründung: Hier wird auch sichergestellt, dass Multiplikation mit negativen Zahlen und 0 funktioniert
  describe("multiply()", () => {
    test("multiplies 3 * 4 to equal 12", () => {
      expect(multiply(3, 4)).toBe(12);
    });
  });

  // Division Tests
  describe("divide()", () => {
    //Prüfung gewöhnlicher Division
    test("divides 10 / 2 to equal 5", () => {
      expect(divide(10, 2)).toBe(5);
    });

    // Grund: Durch 0 kann man nicht teilen
    test("divides 10 / 0 to throw error", () => {
      expect(() => divide(10, 0)).toThrow("Teilen durch 0 nicht erlaubt!");
    });
  });
});
