// Ursprüngliche ineffiziente lineare Suchfunktion
function linearSearch(data, target) {
  for (let i = 0; i < data.length; i++) {
    if (data[i] === target) {
      return i;
    }
  }
  return -1; // Nicht gefunden
}

// Effizientere binäre Suchfunktion für ein sortiertes Array
function binarySearch(sortedData, target) {
  let left = 0;
  let right = sortedData.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (sortedData[mid] === target) {
      return mid;
    } else if (sortedData[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1; // Nicht gefunden
}

// Teste und Vergleiche
const testCases = [
  {
    name: '10 Elemente',
    data: Array.from({length: 10}, (_, i) => i + 1),
    target: 8
  },
  {
    name: '1000000 Elemente',
    data: Array.from({length: 1000000}, (_, i) => i + 1),
    target: 999999
  },
  {
    name: '1000000 Elemente',
    data: Array.from({length: 100000000}, (_, i) => i + 1),
    target: 99999999
  }
];

for (const test of testCases) {
  console.log(`\nTeste mit Array (${test.name}), Zielwert: ${test.target}`);

  console.time(`Lineare Suche (${test.name})`);
  const linearResult = linearSearch(test.data, test.target);
  console.timeEnd(`Lineare Suche (${test.name})`);
  console.log(`Ergebnis der Linearen Suche:`, linearResult);

  console.time(`Binäre Suche (${test.name})`);
  const binaryResult = binarySearch(test.data, test.target);
  console.timeEnd(`Binäre Suche (${test.name})`);
  console.log(`Ergebnis der Binären Suche:`, binaryResult);
}