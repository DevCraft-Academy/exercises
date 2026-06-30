Analysing this simple app for the purpose of debugging.

After trying various inputs, no errors were thrown in the console. However, the one issue discovered is when 'parseFloat' was unable to parse the input value into a number, resulting into a NaN result.

Added check for NaN that displays the error to the user.

Also extracted some common funcitonality into two functions, for better readability.