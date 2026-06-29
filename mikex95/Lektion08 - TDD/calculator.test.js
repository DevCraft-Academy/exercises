const { add, subtract, multiply, divide } = require('./calculator');

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});

test('subtract 2 - 1 to equal 1', () => {
  expect(subtract(2, 1)).toBe(1);
});

test('multiply 2 * 2 to equal 4', () => {
  expect(multiply(2, 2)).toBe(4);
});

test('divide 4 / 2 to equal 2', () => {
  expect(divide(4, 2)).toBe(2);
});

// Tests für besondere Fälle (Edge Cases)

test('add negative number -2 + -3', () => {
  expect(add(-2, -3)).toBe(-5);
});

test('add string and number "2" + 3', () => {
  expect(add('2', -3)).toBe(-1);
});

test('add number and undefined "undefined" + 3', () => {
  expect(() => add(undefined, -3)).toThrow(TypeError);
});

// Neue Tests für add
test('add decimal numbers 1.5 + 2.3', () => {
  expect(add(1.5, 2.3)).toBe(3.8);
});
// Erklärung: Prüft Kommazahlen, damit die Funktion richtig mit Dezimalen rechnet, wie es oft in echten Aufgaben vorkommt.

test('add zero and number 0 + 5', () => {
  expect(add(0, 5)).toBe(5);
});
// Erklärung: Testet den Fall mit Null, um sicherzugehen, dass Addieren richtig funktioniert.

test('add large numbers 1000000 + 2000000', () => {
  expect(add(1000000, 2000000)).toBe(3000000);
});
// Erklärung: Prüft große Zahlen, um Fehler bei zu großen Werten zu vermeiden.

test('add null and number null + 3', () => {
  expect(add(null, 3)).toBe(3);
});
// Erklärung: Testet null (wird zu 0), um zu sehen, ob die Funktion richtig umgeht, ohne Fehler.

test('add array and number [1,2] + 3', () => {
  expect(() => add([1, 2], 3)).toThrow(TypeError);
});
// Erklärung: Prüft Listen als Eingabe, damit die Funktion nur Zahlen annimmt und bei falschen Typen Fehler wirft.

// Neue Tests für subtract
test('subtract decimal numbers 5.5 - 2.2', () => {
  expect(subtract(5.5, 2.2)).toBe(3.3);
});
// Erklärung: Prüft Kommazahlen bei Subtraktion, für genaue Ergebnisse.

test('subtract negative result 3 - 5', () => {
  expect(subtract(3, 5)).toBe(-2);
});
// Erklärung: Testet negative Ergebnisse, um sicherzugehen, dass Minus richtig geht.

test('subtract zero 5 - 0', () => {
  expect(subtract(5, 0)).toBe(5);
});
// Erklärung: Fall mit Null, um Subtraktion zu bestätigen.

test('subtract string "10" - 3', () => {
  expect(subtract('10', 3)).toBe(7);
});
// Erklärung: Prüft Text-zu-Zahl-Umwandlung.

test('subtract undefined 5 - undefined', () => {
  expect(() => subtract(5, undefined)).toThrow(TypeError);
});
// Erklärung: Testet falsche Eingaben, damit Fehler geworfen werden.

// Neue Tests für multiply
test('multiply decimal numbers 1.5 * 2.0', () => {
  expect(multiply(1.5, 2.0)).toBe(3.0);
});
// Erklärung: Prüft Kommazahlen bei Multiplikation.

test('multiply by zero 5 * 0', () => {
  expect(multiply(5, 0)).toBe(0);
});
// Erklärung: Fall mit Null, um zu bestätigen, dass es 0 ergibt.

test('multiply negative numbers -2 * -3', () => {
  expect(multiply(-2, -3)).toBe(6);
});
// Erklärung: Prüft negative Zahlen, für richtige Vorzeichen.

test('multiply large numbers 1000 * 1000', () => {
  expect(multiply(1000, 1000)).toBe(1000000);
});
// Erklärung: Testet große Zahlen.

test('multiply string "4" * 2', () => {
  expect(multiply('4', 2)).toBe(8);
});
// Erklärung: Prüft Text-Umwandlung.

// Neue Tests für divide
test('divide decimal numbers 7.5 / 2.5', () => {
  expect(divide(7.5, 2.5)).toBe(3);
});
// Erklärung: Prüft Kommazahlen bei Division.

test('divide by zero 5 / 0', () => {
  expect(() => divide(5, 0)).toThrow(TypeError);
});
// Erklärung: Fall durch Null teilen, damit Fehler geworfen wird.

test('divide negative numbers -6 / -2', () => {
  expect(divide(-6, -2)).toBe(3);
});
// Erklärung: Prüft negative Zahlen.

test('divide result with remainder 5 / 2', () => {
  expect(divide(5, 2)).toBe(2.5);
});
// Erklärung: Testet Division mit Rest.

test('divide string "10" / 2', () => {
  expect(divide('10', 2)).toBe(5);
});
// Erklärung: Prüft Text-Umwandlung.

test('divide undefined 5 / undefined', () => {
  expect(() => divide(5, undefined)).toThrow(TypeError);
});
// Erklärung: Testet falsche Eingaben.
