/***
 * inefficient for large datasets 
 * => goes through each element one by one
 * time complexity O(n) !!!!
 * time:
 */
function linearSearch(data, target) {
  for (let i = 0; i < data.length; i++) {
    if (data[i] === target) {
      return i;
    }
  }
  return -1;
}

/***
 * more suited for large datasets 
 * => cuts the dataset in half each time
 * time complexity best / worst case O(log n) !!!!
 * time:
 */
function binarySearch(data, target) {
  let left = 0;
  let right = data.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (data[mid] === target) {
      return mid;
    }

    if (data[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1; // NOT FOUND
}

const data = Array.from({ length: 100 }, (_, i) => i);
const target = 99;

console.time("Linear Search");
for (let i = 0; i < 100; i++) {
  linearSearch(data, target);
}
console.timeEnd("Linear Search");

console.time("Binary Search");
for (let i = 0; i < 100; i++) {
  binarySearch(data, target);
}
console.timeEnd("Binary Search");

/*** 5 executions results
 * try it yourself with command "node optimise.js" :
 * Linear Search: ~ 50% slower
 * Binary Search: ~ 50% faster
*/
