### JS Quick Hits: `Array.filter()`

Last week we talked about `Array.find()`, which returns the first value in an array that matches a user-defined function. That's pretty cool, but probably a more frequent use case is wanting *all* of the values that match the function, right? In comes `Array.filter()`, which does exactly what we want, and in a non-destructive way. It returns a whole new Array, instead of manipulating the existing one. Here's an example:

```
// Our array
const xMen = ['Storm', 'Cyclops', 'Beast', 'Phoenix', 'Wolverine', 'Mystique', 'Quicksilver'];

// Our custom function which returns true if an item in the array is longer than 7 chars
const findLongNames = name => name.length > 7;

// Using Array.filter
const longNames = xMen.filter(findLongNames);
console.log(longNames);
```

Our console log will shown an Array that looks like this: `['Wolverine', 'Mystique', 'Quicksilver']`. That's incredibly handy &hellip; not just for sorting comic book heroes, but for all kinds of data manipulation.

Next week we'll cover three useful `Array` methods introduced in ES6 that help with iterating over an Array's indices, values, or both!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*