function fizzBuzz(number) {
    let response = '';
    // if (number % 5 == 0 && number % 3 == 0) return 'FizzBuzz';
    if (number % 3 == 0 )  response  = 'Fizz';
    if (number % 5 == 0 )  response += 'Buzz';
    if (number % 7 == 0 )  response += 'Whizz';
    
    if (response === '') response = number.toString();
    return response
}

module.exports = fizzBuzz;