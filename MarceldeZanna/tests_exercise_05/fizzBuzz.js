
function fizzBuzz(number) {
    const divideByThree = number % 3 === 0;
    const divideByFive = number % 5 === 0;

    if (divideByThree && divideByFive) return 'FizzBuzz';
    if (divideByThree) return 'Fizz';
    if (divideByFive) return 'Buzz';
    return String(number);

}

module.exports = fizzBuzz;