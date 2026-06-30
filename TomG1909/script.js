// ========================================
// ANALYSE DER INEFFIZIENZ: LINEARE SUCHE
// ========================================

/**
 * Lineare Suche - Ineffiziente Implementierung
 * Zeitkomplexität: O(n)
 * Platzomplexität: O(1)
 */
function linearSearch(data, target) {
  for (let i = 0; i < data.length; i++) {
    if (data[i] === target) {
      return i;
    }
  }
  return -1; // Nicht gefunden
}

// ========================================
// EFFIZIENTE ALTERNATIVE: BINÄRE SUCHE
// ========================================

/**
 * Binäre Suche - Effiziente Implementierung für sortierte Arrays
 * Zeitkomplexität: O(log n)
 * Platzomplexität: O(1)
 * Voraussetzung: Array muss sortiert sein
 */
function binarySearch(sortedData, target) {
  let left = 0;
  let right = sortedData.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (sortedData[mid] === target) {
      return mid;
    }
    
    if (sortedData[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1; // Nicht gefunden
}

//Testbeispiele mit klarem Unterschied in der Effizienz
const largeArray = Array.from({ length: 1000000 }, (_, i) => i); 
const targetValue = 999999;

console.time('Lineare Suche');
console.log('Lineare Suche Ergebnis:', linearSearch(largeArray, targetValue));
console.timeEnd('Lineare Suche');

console.time('Binäre Suche');
console.log('Binäre Suche Ergebnis:', binarySearch(largeArray, targetValue));
console.timeEnd('Binäre Suche');