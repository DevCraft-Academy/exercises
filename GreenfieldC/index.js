// 1. Analyse:
// - Wir haben eine große Datenmenge (1.000.000 Einträge).
// - Wir wollen einen bestimmten Wert (23999) in dieser Datenmenge finden.
// - Wir verwenden eine lineare Suche, die jeden Eintrag der Reihe nach überprüft.
// - Die lineare Suche hat eine Zeitkomplexität von O(n), was bei großen Datenmengen ineffizient sein kann.
// - Wir messen die Zeit, die die Suche benötigt, um den Wert zu finden.

const data = Array.from({ length: 1000000 }, (_, i) => i + 1);


function linearSearch(data, target) {
  for (let i = 0; i < data.length; i++) {
    if (data[i] === target) {
      return i;
    }
  }
  return -1; // Nicht gefunden
}

console.time("Suchdauer (linear)");
const linearResults = linearSearch(data, 23999);
console.timeEnd("Suchdauer (linear)");

console.log(`Ergebnis (linear): ${linearResults}`);


// 2. Verbesserung:
// - Wir können die Suche optimieren, indem eine binäre Suche verwenden,weil das Array bereits sortiert ist.
// - Die binäre Suche hat eine Zeitkomplexität von O(log n), was deutlich schneller ist als die lineare Suche bei großen Datenmengen.
// - Wir messen erneut die Zeit, die die binäre Suche benötigt, um den Wert zu finden.
// - Wir verwenden console.time und console.timeEnd, um die Suchdauer zu messen.
// - In dem Fall ist die binäre fast 90% schneller als die lineare Suche, da sie nur log(n) Vergleiche benötigt, während die lineare Suche n Vergleiche benötigt.

function binarySearch(data, target) {
  let left = 0;
  let right = data.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (data[mid] === target) {
      return mid; // Gefunden
    } else if (data[mid] < target) {
      left = mid + 1; // Suche im rechten Teil
    } else {
      right = mid - 1; // Suche im linken Teil
    }
  }
  return -1; // Nicht gefunden
}

console.time("Suchdauer (binär)");
const binaryResult = binarySearch(data, 23999);
console.timeEnd("Suchdauer (binär)");
console.log(`Ergebnis (binär): ${binaryResult}`);



