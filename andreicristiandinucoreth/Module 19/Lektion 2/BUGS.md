Bugs found

# trim()

- Does not trim the trailing whitespaces currectly.
- Fix: Added second loop to find last non-whitespace character.

# capitalize()

- Leaves the rest of the string, after the first character unchanged
- Fix: Added `.toLowerCase()` to the part of the string following the first character.

# slugify()

- For several consecutive whitespace characters, turns each of them into a dash
- Fix: added second regex replace to remove consecutive dashes
