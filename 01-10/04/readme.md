### JS Quick Hits: For / Of with Iterators

ES 2015 introduced `for / of`, which is a nice new loop that lets you quickly move through arrays and objects without having to introduce and check for a counter. When you combine that with the iterators we talked about last week, you can significantly reduce code. So, for example, let's stick with our pirates array for another week, and build a function that console logs each entry as a mini-array that contains both index and value, like this: `[0, 'Bluebeard']`. Here's how we'd do that in ES5:

```
// Our Array
const pirates = ['Bluebeard', 'Blackbeard', 'Long John Silver', 'Captain Jack Sparrow'];

// ES5 requires us to build our own entries array first
const piratesEntries = [];
for (var i = 0; i < pirates.length; i++) {
  const pirateEntry = [i, pirates[i]];
  piratesEntries.push(pirateEntry);
}
for (var a = 0; a < piratesEntries.length; a++) {
  console.log('index: ' + piratesEntries[a][0] + ', name: ' + piratesEntries[a][1]);
}
```

Not counting the array or comments, that's eight lines of code and two loops. You could reduce it down a bit, but it's still kind of clunky. Compare it to the same thing in ES6:

```
// Our Array
const pirates = ['Bluebeard', 'Blackbeard', 'Long John Silver', 'Captain Jack Sparrow'];

// ES 2015 for / of loop
for (let [index, name] of pirates.entries()) {
  console.log(`index: ${index}, name: ${name}`);
}
```

And, of course, you don't *have* to use an iterator with `for / of`. You can also just loop over the original array and spit out the pirates' names, like this:

```
for (let pirate of pirates) {
  console.log(`Arrrrr! I be ${pirate}.`);
}
```

You can kill a `for / of` loop with a `break` statement, like this:

```
for (let pirate of pirates) {
  if (pirate === 'Long John Silver') { break; }
  console.log(pirate); // 'Bluebeard', 'Blackbeard'
}
```

`for / of` also works with any other array-like type in JavaScript, such as nodelists, other complex JS types like `map` and `set`, and even strings. If you'd like to see more examples of `for / of` in action, check out [example file 4]() in the [JS Quick Hits GitHub Repo](https://github.com/CloseBrace/jsqh).

You might've noticed that we introduced not one but two more ES 2015 features in this tutorial. This thing: `let [index, name]` is variable destructuring, and it is absolutely awesome. This thing: `${index}` is a template literal, and it is also awesome. We're going to talk about both in the next couple of weeks.

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*