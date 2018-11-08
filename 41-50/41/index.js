const Immutable = require('immutable');

// First let's establish a new map
const user = Immutable.Map({
  firstName: 'Corey',
  lastName: 'Smith',
  age: 32,
  username: 'ElCapitan',
  location: 'East Greenwich, RI, USA',
  ownsBoat: true,
  occupation: 'Charter Fishing',
});

// Logging the user shows that it's a map but otherwise looks like an object
console.log(user); // our user Map

// However, we can't access properties as expected
console.log(user.username); // undefined

// Instead we have to "get" the value
console.log(user.get('username')); // ElCapitan

console.log('------------');

// Immutable Maps are, obviously, immutable.
user.username = 'BoatMaster';
console.log(user.get('username')); // ElCapitan

console.log('------------');

// Like with List, when you make changes you get a new object
const newUserData = user.set('username', 'BoatMaster');
console.log(newUserData.get('username')); // BoatMaster
console.log(user.get('username')); // ElCapitan

console.log('------------');

// Immutable maps have a LOT of built-in functionality that JS Objects don't!
const key = user.findKey((value) => value === 'East Greenwich, RI, USA' );
console.log(key); // location

console.log('------------');

// Want to return to JS? No problem:
const mutableUser = user.toJS();
console.log(mutableUser.occupation); // Charter Fishing
mutableUser.age = 40;
console.log(mutableUser.age); // 40

console.log('------------');

// But note that user is still an immutable map
console.log(user.age); // undefined
console.log(user.get('age')); // 32
console.log(Immutable.Map.isMap(user)); // true