function fizzBuzz(n) {
  // Fix first test
  //   return "1";

  // Fix second test
  //   if (n === 1) return "1";
  //   if (n === 2) return "2";

  // Refactor
  //   return String(n);

  // Fix third test
  //   if (n === 3) {
  //     return "Fizz";
  //   }
  //   return String(n);

  // Fix fourth test
  //   if (n === 5) {
  //     return "Buzz";
  //   }
  //   if (n === 3) {
  //     return "Fizz";
  //   }
  //   return String(n);

  // Fix fifth test
  //   if (n === 5) {
  //     return "Buzz";
  //   }
  //   if (n === 3) {
  //     return "Fizz";
  //   }
  //   if (n === 15) {
  //     return "FizzBuzz";
  //   }
  //   return String(n);

  // Fix sixth test
  //   if (n === 5) {
  //     return "Buzz";
  //   }
  //   if (n === 3 || n === 6) {
  //     return "Fizz";
  //   }
  //   if (n === 15) {
  //     return "FizzBuzz";
  //   }
  //   return String(n);

  // Refactor
  //   if (n === 15) {
  //     return "FizzBuzz";
  //   }
  //   if (n % 3 === 0) {
  //     return "Fizz";
  //   }
  //   if (n === 5) {
  //     return "Buzz";
  //   }
  //   return String(n);

  // Fix seventh test
  //   if (n === 15) {
  //     return "FizzBuzz";
  //   }
  //   if (n % 3 === 0) {
  //     return "Fizz";
  //   }
  //   if (n === 5 || n === 10) {
  //     return "Buzz";
  //   }
  //   return String(n);

  // Refactor
  //   if (n === 15) {
  //     return "FizzBuzz";
  //   }
  //   if (n % 3 === 0) {
  //     return "Fizz";
  //   }
  //   if (n % 5 === 0) {
  //     return "Buzz";
  //   }
  //   return String(n);

  // Fix eighth test
  //   if (n === 15 || n === 30) {
  //     return "FizzBuzz";
  //   }
  //   if (n % 3 === 0) {
  //     return "Fizz";
  //   }
  //   if (n % 5 === 0) {
  //     return "Buzz";
  //   }
  //   return String(n);

  // Refactor
  if (n % 3 === 0 && n % 5 === 0) {
    return "FizzBuzz";
  }
  if (n % 3 === 0) {
    return "Fizz";
  }
  if (n % 5 === 0) {
    return "Buzz";
  }
  return String(n);

  // Now all tests pass
}

module.exports = fizzBuzz;
