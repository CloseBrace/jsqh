const sortByKeys = require('./index');
const json = require('./test.json');

const tempData = '[{ "favoriteColor": "Turquoise" },{ "age": 22},{ "petName" : "Porkbelly"},{ "email": "ice@spamcapture.com"},{ "fullName": "Corey Johnson"},{ "username": "IceFlash"},{ "petType": "Dog"},{ "booleanFan": false}]';

// Test with in-line JSON
console.log(sortByKeys(tempData));

// Test with JSON from file
console.log(sortByKeys(json));

// Descending sort option
console.log(sortByKeys(tempData, { sort: 'desc' }));