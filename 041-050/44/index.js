// Working with the filesystem is pretty easy!

// Import node's built-in fs module
const fs = require('fs');
const csv = require('csvtojson');

// We can read file data synchronously (ie: our app doesn't proceed until all the data's read)
const rawData = fs.readFileSync('authors.csv');
const authorData = rawData.toString();

// Our CSV file as a string
console.log(authorData);

console.log('------------');

// Now let's turn it to JSON
// Note that this is an asynchronous function, thus the ".then"
csv()
.fromString(authorData)
.then((authorJson) => {
    console.log(authorJson) // a big ol' array of author objects
    console.log('------------');
});

// We can also read asynchronously with a callback
fs.readFile('example.txt', (err, data) => {
   if (err) {
      return console.log(err);
   }
   const str = data.toString();
   console.log(str);
});