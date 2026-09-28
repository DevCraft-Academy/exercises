const array = [1,2,3,4,5,6,7,8,9,0];
const target = 50;

const arr1 = Array.from({ length: 100 }, (_, i) => i);
const arr2= Array.from({ length: 1000 }, (_, i) => i);
const arr3 = Array.from({ length: 10000 }, (_, i) => i);


function linearSearch(data, target) {
  for (let i = 0; i < data.length; i++) {
    if (data[i] === target) {
      return i;
    }
  }
  return -1;
}

function binarySearch(data, target) {
  let left = 0;
  let right = data.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (data[mid] === target) {
      return mid;
    } else if (data[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

console.log("Test lineare Suche: ");
console.time("Lineare Suche");
const lineareSuche = linearSearch(arr3, target);
console.timeEnd("Lineare Suche");
console.log("Ergebnis der linearen Suche:", lineareSuche);


console.log("Test binäre Suche: ");
console.time("Binäre Suche");
const binaereSuche = binarySearch(arr3, target);
console.timeEnd("Binäre Suche");
console.log("Ergebnis der binären Suche:", binaereSuche);