const { add, subtract, multiply, devide } = require('./calculator');

test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
});

test('subtract 4 from 10 equals 6', () => {
    expect(subtract(10, 4)).toBe(6);
});

test('multiply 2 * 8 equals 16', () => {
    expect(multiply(2, 8)).toBe(16);
});

test('devide 18 by 2 equals 9', () => {
    expect(devide(18, 2)).toBe(9);
});

test('divide any number by 0 to throw an error', () => {
    expect(() => devide(66, 0)).toThrow('Cannot devide by zero!');
});
