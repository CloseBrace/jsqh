### JS Quick Hits: `Array.find()`

`Array.find` is a great new feature introduced in ES2015 (aka ES6). It allows you to find the first item in an array that matches a particular requirement. It iterates over the array, running a custom function on each entry until the function reaturns true. For example, let's take a look at this code:

```
// Our array
const xMen = ['Storm', 'Cyclops', 'Beast', 'Phoenix', 'Wolverine', 'Mystique', 'Quicksilver'];

// Our custom function which returns true if an item in the array is longer than 7 chars
const findFirstLongName = name => name.length > 7;

// Using Array.find
const longName = xMen.find(findFirstLongName); // 'Wolverine'
```

If you're not yet used to arrow functions, here's the ES5 version of that "findFirstLongName" function:

```
const findFirstLongName = function(name) {
  return name.length > 7;
}
```

As you can see, the function will return false on Storm, Cyclops, Beast, and Phoenix, because none of their names are longer than seven characters. It'll return true on Wolverine, because that's the first item in the Array that's long enough. Unlike with many other Array functions, `Array.find` gives the actual value, rather than the index of the matched item. If you want the index, use `Array.findIndex` instead.

You'll notice Mystique and Quicksilver are left out, because `Array.find` doesn't produce an entire array of positives, it only returns the first value. This, obviously, has its pros and cons. We'll talk about how to produce an entire array of answers next week, with `Array.filter`.

