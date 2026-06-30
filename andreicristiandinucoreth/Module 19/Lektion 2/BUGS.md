Bugs found

# trim()

- Does not trim the trailing whitespaces currectly.
- Original tests only checked removing leading whitespaces.
- Fix: Use built-in `trim()` method.

# capitalize()

- Leaves the rest of the string, after the first character unchanged.
- Original tests were only checking the capitalization of the first character.
- Fix: Added `.toLowerCase()` to the part of the string following the first character.

# slugify()

- For several consecutive whitespace characters, turns each of them into a dash
- Original tests were only checking for the presence of a dash, not for the correct format.
- Fix: added second regex replace to remove consecutive dashes
