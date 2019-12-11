### JS Quick Hits: Arrow Functions Part 2

Video Url: https://youtu.be/ie3llJ2LpiQ

Let's talk about scope. Scope is a term we use to explain, among other things, whether or not values in functions fall through to sub-functions. For example, `var` has a different scope than `let` and `const` do. The former is function-scoped. The latter are block-scoped. Here's an example. Let's start with some data:

```
const avengers = ['Iron Man', 'Captain America', 'Black Widow', 'Hulk', 'Thor', 'Hawkeye'];
```

And here's some ES5 code that shows function-scoped variables

```
function logName(name) {
  if (name) {
    var logString = name + ' was logged.';
  }
  console.log(logString);
}
avengers.forEach(function(name) {
  logName(name);
}); // Iron Man was logged ... etc.
```

This works because the variable `logString` gets "hoisted" - meaning it becomes known at the top level of the function (even if it's undefined, for example if you called `logName()` with no value).

`const` and `let` aren't hoisted. They're scoped to whatever block they're in. So this code will break like the bones of an alien soldier getting hit by Thor's hammer:

```
const logLength = (name) => {
  if (name) {
    let nameString = `${name} is ${name.length} characters long`;
  }
  console.log(nameString);
}
avengers.forEach(name => logLength(name)); // Uncaught ReferenceError: nameString is not defined
```

This is because `let` is only known within that `if` block. The correct way to write that function is to move the variable declaration out of the `if` block, like this:

```
const logLength = (name) => {
  let nameString = '';
  if (name) {
    nameString = `${name} is ${name.length} characters long`;
  }
  console.log(nameString);
}
avengers.forEach(name => logLength(name)); // Iron Man is 8 characters long ... etc.
```

Of course, that's a ridiculous function that could be reduced down to one line in real life, like this:

```
avengers.forEach(name => { name ? console.log(`${name} is ${name.length} characters long`) : null });
```

... but this code is for example purposes! I tend to favor block scoping over function scoping, because I find it helps keep things a little cleaner, but there are times when the latter is valuable.

Where scoping becomes a bit more interesting is in how functions treat `this`. Because JavaScript functions can be both plain functions that just take an input and return a value, or constructors that allow you to create new instances of an object, how to handle `this` gets a little muddy. In ES5 constructors, `this` does *not* fall down to any functions called within the constructor. Here's an example. We're going to `console.log` our team members' names, one per second.

```
function ListNamesCounter(team) {
  this.count = 0;
  var timer = setInterval(function() {
    console.log(team[this.count]);
    this.count++;
  }, 1000);
}
var timedList = new ListNamesCounter(avengers); // undefined (forever);
```

Whoops ... no we're not, because that just logs "undefined" forever, or at least until Thanos shows up and our computer's nuked in the ensuing destruction. Why doesn't that code work? Because in ES5 constructors, functions are initialized with their own `this`. The `this` from the parent doesn't fall through into the function we're passing to setInterval, so this.count is undefined in there. You can't `console.log` the value of an array at position `undefined`, nor can you increment `undefined` by one.

The solution to this, traditionally, has been either to add a line at the top of the constructor like `var that = this;` and then use `that` in sub-functions, or to bind `this` to the sub-function, like the following code:

```
function ListNamesCounter(team) {
  this.count = 0;
  this.timer = setInterval(function() {
    console.log(team[this.count]);
    this.count++;
  }.bind(this), 1000);
}
```

In that code, we're telling the constructor "instead of initializing that anonymous function with its own `this`, use the parent `this` instead." That's fine ... but arrow functions once again make our life easier and cleaner. Here's how to write our name lister with ES2015:

```
function ListNamesCounter(team) {
  this.count = 0;
  this.timer = setInterval(() => {
    console.log(team[this.count]);
    this.count++;
    if (this.count === team.length) {
      clearInterval(this.timer);
    }
  }, 1000);
}
var timedList = new ListNamesCounter(avengers); // Iron Man ... etc.
```

That code works because arrow functions don't auto-define `this`. So we're able to access the `this` from the parent function. This is called "lexical scope" and all it means is that sub-functions have access to values from their parents functions. In ES5 constructors, `this` is not lexically scoped. If you use arrow functions as your nested functions, however, then `this` becomes lexically scoped.

Scope in JavaScript can be a tricky subject, and it's difficult to illustrate the value of lexical `this` without getting into big chunks of code that use deeply nested functions (this often happens with promises and callbacks). We'll be covering promises at some point in this series, so you might see lexical `this` make its triumphant return at that point.

See you next week!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*