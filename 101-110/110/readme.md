**JS Quick Hit: Matching Objects**

Video URL: https://youtu.be/RlKB7ZImaiA

Last week we walked through a simple but pretty obviously broken approach to object matching. We were only checking for a single key/value pair, which is really not very useful since you could have two wildly different objects that happened to share that one pair and would thus produce a false positive.

Today we're going to produce a more robust algorithm that will help us match objects, although this will *only match objects that have a single level*. If you're working with nested objects, things get really thorny, and I'm afraid the solution is outside the scope of a simple quick-hits tutorial!

It's important to note that what we're really checking for here is not whether these two objects are _the same object_ &hellip; the way JavaScript works, they never will be, unless the second is a variable referencing the first. What we are really checking is if two different objects have identical properties.

With that in mind, we're going to need to objects:

```
const userOne = {
  name: 'Jeff',
  age: 34,
  kids: ['Theresa', 'Robert'],
};

const userTwo = {
  name: 'Linda',
  age: 39,
  kids: null,
};

const userThree = {...userOne};
```

Note that user three is a duplicate of user one, but is NOT a reference. We're using the spread operator to create an entirely new object. This is good. Now we've got an object that is definitely different, and one that's identical, and we can check our function against those two.

Speaking of our function, we should be able to keep it relatively straightforward. We're just going to iterate through object one's properties and compare them against object 2's properties. We can do that with `Object.keys`, which we've used before in JS Quick Hits but never actually covered. I might have to fix that! Anyway, it gives us an array of the object's keys, ignoring prototypal keys &hellip; so if we run it on `userOne` we're going to get `['name', 'age', 'kids']`. We can then loop over that array to check the values of each key, on both objects, to make sure they match. Here's the code:

```
const compareTwoObjects = (obj1, obj2) => {
  let objectsMatch = true;

  // Make sure we're comparing two objects
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    console.log('Both params must be objects');
    return false;
  }

  // Loop over object 1's keys, get values, compare them to object 2's matching values
  Object.keys(obj1).forEach(key => {
    if (obj1[key] !== obj2[key]) { objectsMatch = false; }
  });

  return objectsMatch;
};
```

As you can see, the first thing we're doing is making sure the two objects are, well, objects. Remember that arrays in JavaScript are also objects, so if you want to reject those you'll need to detect them. The easiest way to do that is to just check for `obj1.length` and `obj2.length`, since arrays have a length property and standard objects don't. We're not doing that, though, because this function will actually work properly with arrays, so why not let it?

The next thing we do is use `Object.keys` to get object one's keys. We then immediately iterate over the array of keys with a simple `forEach`. From here it's easy! We just check each key's value for object one against each key's value for object two. If Object two doesn't _have_ a given key, that's going to be a false, and even if it does have the same key, if the values don't match, then that'll be a false as well. It's simple and straightforward, and should work with any single-level object you throw at it. So let's test it:

```
compareTwoObjects('str', { name: 'str' }); // first error
console.log(compareTwoObjects(userOne, userTwo)); // false
console.log(compareTwoObjects(userOne, userThree)); // true
console.log(compareTwoObjects([1,2,3], [1,2,3])); // true
console.log(compareTwoObjects([1,2,4], [1,2,3])); // false
```

And there you go. We're getting the expected responses based on what we feed the function! This isn't bulletproof, there are probably edge cases we need to worry about, but for what we're trying to accomplish here, it's pretty solid.

That's about it for this week. Catch you next time!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
