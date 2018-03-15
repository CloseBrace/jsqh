### JS Quick Hits: The Spread Operator

*video version: https://youtu.be/S1HDS2n4gWI*

This week we're covering one of the truly great new additions in ES 2015. The Spread Operator allows you to access the values in an array or array-like type (such as a nodelist) and more easily work with them in your code. Let's build ourselves two simple arrays:

```
const characters = ['Bojack', 'Todd', 'Princess Carolyn'];
const newCharacters = ['Diane', 'Mr. Peanutbutter'];
```

If we want to combine these two arrays, we can't just do the following:

```
const castList = [characters, newCharacters];
```

Because all that would do is give us an array with two values, each of which was a nested array. There are a variety of approaches to combining arrays in JavaScript, but ES 2015 has made it really easy:

```
const castList = [...characters, ...newCharacters];
console.log(castList); // ['Bojack', 'Todd', 'Princess Carolyn', 'Diane', 'Mr. Peanutbutter'];
```

You can also use this with `Array` methods like `push()`, so we could just add the new characters in with the existing ones, like this:

```
characters.push(...newCharacters);
console.log(characters); // ['Bojack', 'Todd', 'Princess Carolyn', 'Diane', 'Mr. Peanutbutter'];
```

You can also use the spread operator to pass arguments to a function in an array without having to use `Array.apply()`. Here's an example:

```
const twoSides = [20, 21];
const pythag = (a, b) => {
  // note: simple multiplying is faster for squaring than Math.pow();
  const c = Math.sqrt(a * a + b * b);
  console.log(`The third side is ${c} units long`);
}
pythag(...twoSides); // The third side is 29 units long;
```

As you can see, it takes the first entry in the array and matches it to the first argument, the second value to the second argument, and so forth. Any additional values in an array that don't have corresponding arguments will need to be accessed with the `arguments` object &hellip; unless of course you're [using the rest operator](https://closebrace.com/tutorials/2018-02-28/js-quick-hits-6-the-rest-operator)!

The spread operator works really well in a function designed to take an arbitrary number of arguments. For example, JavaScript's built-in `Math.max()`, which returns the largest number from its list of arguments.

```
const values = [23.6, 32.74, 18.3, 12.98];
console.log(Math.max(...values)); // 32.74
```

And, of course, let's not forget that the spread operator is amazingly useful with [variable destructuring](https://closebrace.com/tutorials/2018-02-21/js-quick-hits-5-variable-destructuring). If you work in React in any major capacity, you'll end up using this and loving it. Here's a simple example. Remember that we mutated the characters array above with `.push()`, so it contains everyone now.

```
const [lead, roommate, ...others] = characters;
console.log(lead); // Bojack
console.log(roommate); // Todd
console.log(others); // ['Princess Carolyn', 'Diane', 'Mr. Peanutbutter']
```

There are lots more ways to use the spread operator, but this is a pretty good sampling that should give you a feel for how it works. As always, if you want to deep-dive, I recommend MDN's topic page on the subject.

Next week we'll do a quick introduction (or refresher) on ternary operators, which are not an ES 2015 feature but are something you should definitely know how to use. They took me a bit to wrap my head around when I was first learning, but now I love them like a family member. See you then!
