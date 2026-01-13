/**
 * Email Validator - Basic Implementation
 *
 * This implementation works for normal emails,
 * but has gaps for edge cases. Your task is to
 * add tests that reveal these gaps.
 */

function validateEmail(email) {
  // Basic validation - works for happy path, but has many gaps!
  if (!email || typeof email !== "string") {
    throw new Error("Email is required");
  }

  const trimmed = email.trim();

  if (trimmed === "") {
    throw new Error("Email is required");
  }

  if (!trimmed.includes("@")) {
    throw new Error("Email must contain @");
  }

  const parts = trimmed.split("@");
  if (parts.length !== 2) {
    throw new Error("Email must contain exactly one @");
  }

  // special characters:
  const specialCharPattern = /[+!#$%^&*(),?":{}|<>]/;
  if (specialCharPattern.test(trimmed)) {
    throw new Error(
      "Email must contain exactly one @ and no special characters"
    );
  }

  //check domain part, not only dot
  const domainPart = parts[1];
  if (
    domainPart.indexOf(".") === -1 ||
    domainPart.startsWith(".") ||
    domainPart.endsWith(".")
  ) {
    throw new Error("Email must have a valid domain");
  }
  return true;
}

module.exports = { validateEmail };
