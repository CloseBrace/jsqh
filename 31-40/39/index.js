const Immutable = require('immutable');

const tomHardyMovies = Immutable.List(['The Dark Knight Rises', 'Locke', 'Mad Max: Fury Road', 'The Revenant', 'Dunkirk']);

// Let's add a movie
tomHardyMovies.push('Venom');
console.log(tomHardyMovies); // Nope!

console.log('------------');

// All immutable operations return a new list, rather than changing the existing one
const tomHardyMoviesMutated = tomHardyMovies.push('Venom');
console.log(tomHardyMovies); // Still the same!
console.log(tomHardyMoviesMutated); // There are our changes

console.log('------------');

// You can't change the values directly, either.
tomHardyMoviesMutated[2] = 'Mad Max: The Wasteland';
console.log(tomHardyMoviesMutated) // Nope!

console.log('------------');

// Instead, you need to use '.set'
const tomHardyMoviesUpdated = tomHardyMoviesMutated.set(2, 'Mad Max: The Wasteland');
console.log(tomHardyMoviesMutated); // Still the same!
console.log(tomHardyMoviesUpdated); // updated list