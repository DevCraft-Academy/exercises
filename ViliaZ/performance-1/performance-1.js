// linear search

function linearSearch(data, target) {
  for (let i = 0; i < data.length; i++) {
    if (data[i] === target) {
      return i;
    }
  }
  return -1; // Nicht gefunden
}

// Linear search ist langsam für große Datensätze, weil es jeden einzelnden Datenstatz nacheinander prüft
// Binary search ist mein Mittel der Wahl, wenn es sich um ein sortierten Datensatz handelt
// Vorteil: einfache Implemenetierung, Zeitkomplexität von 0(log n) = logarithmisch, wenig Abhängigkeit von der Position des gesuchten Elements

function binarySearch(data, target) {
  let left = 0;
  let right = data.length - 1;
  let middle;

  while (left <= right) {
    middle = Math.floor((left + right) / 2)

    if (data[middle] === target) {
      return middle;
    } else if (data[middle] < target) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }
  return -1;
}

// Testing
const data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
const target = 12

test()
function test(){
    console.time('linear')
    linearSearch(data, target)
    console.timeEnd('linear')
    console.time('binary')
    binarySearch(data,target)
    console.timeEnd('binary')
}



// Result
// linear Search: 0.116ms
// binary Search: 0.048ms
