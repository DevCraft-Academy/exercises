// slow search
function linearSearch(data, target) {
  for (let i = 0; i < data.length; i++) {
    if (data[i] === target) {
      return i;
    }
  }
  return -1; // Nicht gefunden
}

// fast search
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
  return -1; // Nicht gefunden
}

function getLongSortedArray(scale) {
  const array = [];
  for (let i = 0; i < scale; i++) {
    array.push(i);
  }
  return array;
}

const scale = 100000000;
const data = getLongSortedArray(scale);

const target = Math.floor(Math.random() * scale);
console.log(`Searching for: ${target}`);

console.time("Linear Search Time");
console.log(linearSearch(data, target));
console.timeEnd("Linear Search Time");

console.time("Binary Search Time");
console.log(binarySearch(data, target));
console.timeEnd("Binary Search Time");
