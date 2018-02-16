### JS Quick Hits: Array Iterators

Let's talk about three new `Array` methods that each work by returning an iterator function, rather than a set of values. What this means is you can use the iterator to step through things sequentially &hellip; but we'll get to that. First, let's explain what each of the three actually iterates over. Here's our sample array:

```
const pirates = ['Bluebeard', 'Blackbeard', 'Long John Silver', 'Captain Jack Sparrow'];
```

`Array.keys()` iterates strictly over your array's indices, that is, `0`, `1`, and so forth.

`Array.values()` is the opposite. It will iterate over the actual values, returning `Bluebeard`, `Blackbeard`, and so forth. **Note:** this method is currently only supported by Microsoft Edge, and nightly versions of Firefox. Support is coming in other browsers.

`Array.entries()` Gives you little mini-arrays with both pieces of information, so you would get: `[0, 'Blackbeard']`, and `[1, 'Bluebeard']`, and on and on.

You can, of course, write your own little functions that provide these same values, but why rewrite existing code? Especially when the iterators themselves are so handy. For example, this code:

```
const entriesIterator = pirates.entries();
console.log(entriesIterator.next().value);
console.log(entriesIterator.next().value);
```

Will yield the following:

```
[0, 'Bluebeard']
[1, 'Blackbeard']
```

If you get to the end of the loop and call `next()` again, you'll get `undefined` as a response, which is obviously useful for determining when you've reached the end of your array.

These methods also play particularly well with ES6's new `for / of` loop, which we'll talk about next week.
