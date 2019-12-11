// This code is meant to be run in a Node.js console
// To install Node.js, visit http://nodejs.org

// Basic Array. Will return "undefined" ... but that's just the return value. Your array *is* defined.
const myArray = [5, 9, 1, 4, 6, 8, 7, 2, 0, 3];

// Show the array. Will show the array but also return "undefined"
console.log(myArray); // [ 5, 9, 1, 4, 6, 8, 7, 2, 0, 3 ]

// This function has a return value
const sortArray = (data) => {
  const clone = [...data];
  return(clone.sort());
}

// So when we run it, it'll return the new array (but not "undefined")
sortArray(myArray); // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

// The original array still exists, since we clone it in the function
// And since console.log has no return value, we still get "undefined"
console.log(myArray);