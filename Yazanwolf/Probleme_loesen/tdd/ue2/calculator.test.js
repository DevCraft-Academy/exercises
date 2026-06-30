const { add, subtract, multiply, devide } = require('./calculator');

test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
});

/**
 * Calling the add function with non numeric input should throw an error
 */
test('add non numeric input throws error', () => {
    expect(() => add('a', 2)).toThrow(Error);
});

test('subtract 4 from 10 equals 6', () => {
    expect(subtract(10, 4)).toBe(6);
});

/**
 * Calling the subtract function with non numeric input should throw an error
 */
test('subtract non numeric input throws error', () => {
    expect(() => subtract(10, 'b')).toThrow(Error);
});

test('multiply 2 * 8 equals 16', () => {
    expect(multiply(2, 8)).toBe(16);
});

/**
 * Calling the multiply function with non numeric input should throw an error
 */
test('multiply non numeric input throws error', () => {
    expect(() => multiply({ name: 'john' }, 'b')).toThrow(Error);
});

test('devide 18 by 2 equals 9', () => {
    expect(devide(18, 2)).toBe(9);
});

/**
 * Calling the devide function with non numeric input should throw an error
 */
test('devide non numeric input throws error', () => {
    expect(() => devide('x', 2).toThrow(Error));
});

/**
 * Deviding by 0 should throw an error
 */
test('divide any number by 0 to throw an error', () => {
    expect(() => devide(66, 0)).toThrow('Cannot devide by zero!');
});
