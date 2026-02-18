/**
 * String Utilities for Text Formatting
 *
 * These functions are commonly used in web applications,
 * e.g., for formatting user input, URLs, etc.
 */

/**
 * Removes whitespace from the beginning and end of a string
 * @param {string} str - The string to trim
 * @returns {string} String without leading/trailing whitespace
 */
function trim(str) {
  if (typeof str !== 'string') {
    return '';
  }

  // BUG: Only removes leading whitespace, not trailing!
  let result = '';
  let startIndex = 0;

  // Find first non-whitespace character
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== ' ') {
      startIndex = i;
      break;
    }
  }

  return str.slice(startIndex);
}

/**
 * Capitalizes the first letter, lowercases the rest
 * @param {string} str - The string to format
 * @returns {string} String with capitalized first letter
 */
function capitalize(str) {
  if (typeof str !== 'string' || str.length === 0) {
    return str;
  }

  // BUG: Only capitalizes first letter, leaves rest unchanged
  // Should: 'HELLO' -> 'Hello'
  // Is:     'HELLO' -> 'HELLO'
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts a string to a URL-friendly slug
 * Spaces become dashes, everything lowercase
 * @param {string} str - The string to convert
 * @returns {string} URL-friendly slug
 */
function slugify(str) {
  if (typeof str !== 'string') {
    return '';
  }

  // BUG: Doesn't handle multiple consecutive spaces correctly
  // 'Hello  World' should become 'hello-world'
  // But becomes 'hello--world' (two dashes)
  return str
    .toLowerCase()
    .replace(/ /g, '-');
}

module.exports = {
  trim,
  capitalize,
  slugify
};
