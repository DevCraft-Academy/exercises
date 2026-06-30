# UE - Imrpvoing linear search

## 1. Understand the inefficiency

- The given search function is a linear search that goes through each element of the array and looks for the element
- This can be very fast if the element is at the beginning of the array, or it can get linearly slower with the scale of the array to search in

## 2. Implement more efficient search

- The given scenario only deals with sorted arrays, so we have the option of Binary Search at our disposal
- The Binary Search looks for the element at a 'middle' point in the array, either finding the element, or knowing if the element is in the first half or the second half of the array.
- This way, at every step the size of the array in which our element should be in is half the size of the previous step
- Binary search has a O(log n) efficiency, as it grows slower than linearly as n grows. This means this is more efficient than the simple linear search

## 3. Test Results

- Implemented simple test framework where the same element will be searched in the same array by the 2 search algorithms. The element to be found will be randomized, to offer a fairer advantage, and the serach will be repeated a few times to average out the results. Also various sizes of arrays will be used, in order to see the efficiency change with the scale of the array.

- From the test data, it is clear that already from a small scale there is a noticeable time difference between the two searches, with binary search being on average more than 0.1ms faster. But once we look at array of size 1000000, the time difference between the two has almost a factor of 10. Doing one test run at size 100000000, we get a factor of 60!
- This matches the difference in algorithm complexity, with the binary search only growing at a logarithmic scale.

- Size: 1000 elements

  - Run 1:
    - Element to be found: 187
    - Linear search time: 0.427ms
    - Binary search time: 0.286ms
  - Run 2:
    - Element to be found: 659
    - Linear search time: 0.774ms
    - Binary search time: 0.493ms
  - Run 3:
    - Element to be found: 772
    - Linear search time: 0.372ms
    - Binary search time: 0.223ms
  - Run 4:
    - Element to be found: 563
    - Linear search time: 0.413ms
    - Binary search time: 0.236ms
  - Run 5:
    - Element to be found: 629
    - Linear search time: 0.397ms
    - Binary search time: 0.257ms
  - Average:
    - Linear search time: 0.476ms
    - Binary search time: 0.299ms

- Size: 1000000 elements

  - Run 1:
    - Element to be found: 784639
    - Linear search time: 2.464ms
    - Binary search time: 0.266ms
  - Run 2:
    - Element to be found: 923607
    - Linear search time: 2.47ms
    - Binary search time: 0.33ms
  - Run 3:
    - Element to be found: 253057
    - Linear search time: 1.739ms
    - Binary search time: 0.427ms
  - Run 4:
    - Element to be found: 424735
    - Linear search time: 2.323ms
    - Binary search time: 0.391ms
  - Run 5:
    - Element to be found: 161768
    - Linear search time: 2.012ms
    - Binary search time: 0.487ms
  - Average:
    - Linear search time: 2.201ms
    - Binary search time: 0.38ms

- Size: 100000000 elements
  - Only 1 run as results are already pretty evident:
    - Element to be found: 14890989
    - Linear search time: 24.365ms
    - Binary search time: 0.483ms
