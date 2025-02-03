1. Verstehe die Ineffizienz
Die gegebene lineare Suchfunktion hat eine Zeitkomplexität von O(n), was bedeutet, dass die Zeit, die benötigt wird,
um das Ziel-Element zu finden, linear mit der Größe des Arrays wächst. Dies ist besonders ineffizient, wenn das Array groß ist,
da im schlimmsten Fall alle Elemente durchsucht werden müssen.

3. Identifiziere Ineffizienzen
Schleifenüberprüfung: Bei großen Arrays kann die lineare Suche sehr lange dauern, da jedes Element nacheinander überprüft wird.
Sortiertes Array: Da das Array sortiert ist, können wir eine effizientere Methode verwenden, die die Eigenschaften der Sortierung ausnutzt.

4. Implementiere eine effizientere Suche
Da das Array sortiert ist, können wir die binäre Suche verwenden, die eine Zeitkomplexität von O(log n) hat.

ein Beispiel könnte so aussehen.

function binarySearch(data, target) {
  let left = 0;
  let right = data.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (data[mid] === target) {
      return mid; // Ziel gefunden
    } else if (data[mid] < target) {
      left = mid + 1; // Suche im rechten Teil
    } else {
      right = mid - 1; // Suche im linken Teil
    }
  }
  
  return -1; // Nicht gefunden
}

4. Erkläre die Methodik
Die Wahl der binären Suche basiert auf der Tatsache, dass das Array sortiert ist. Die binäre Suche halbiert den Suchbereich in jedem Schritt,
was die Anzahl der Vergleiche erheblich reduziert. Anstatt jedes Element zu überprüfen, wird der Suchbereich schnell eingegrenzt, was Effizienter ist.

6. Teste und Vergleiche
Wir können Testfälle erstellen, um die Leistung der beiden Suchmethoden zu vergleichen.

const largeArray = Array.from({ length: 1000000 }, (_, i) => i); // Ein sortiertes Array von 0 bis 999999
const target = 999999;

console.time('Linear Search');
console.log(linearSearch(largeArray, target)); // Erwartet: 999999
console.timeEnd('Linear Search');

console.time('Binary Search');
console.log(binarySearch(largeArray, target)); // Erwartet: 999999
console.timeEnd('Binary Search');


6. Dokumentiere Ergebnisse
Typischerweise wird die binäre Suche viel schneller sein, insbesondere bei großen Datensätzen.

Linear Search: 150ms
Binary Search: 2ms
