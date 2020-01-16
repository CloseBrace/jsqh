**JS Quick Hit: Variable Hoisting**

Video URL: https://youtu.be/1PM-w68IbYM

Let's ease back into things with a short, simple Quick Hit this week. We're going to talk about variable hoisting. In JavaScript, when you use the `var` keyword, whatever variable you create is "hoisted" to the top of the current scope. All that means is that the creation of the variable happens right at the start, even if you don't define it until further down in your code. The current scope might be the top level of your code, or it might be in a function, or a `for` loop, or similar.

Let's start with some data:

```
const cast = [
  'Daniel Craig',
  'Ana de Armas',
  'Chris Evans',
  'Jamie Lee Curtis',
  'Michael Shannon',
  'Don Johnson',
  'Toni Collette',
  'Lakeith Stanfield',
  'Christopher Plummer',
];
```

By the way, if you haven't seen Knives Out yet, you should. It's a terrific movie! Anyway, here's an example of hoisting:

```
function greetName(name) {
  console.log(greeting + ' ' + name);
  var greeting = 'Hello there,';
  console.log(greeting);
}
greetName(cast[0]); // 'undefined Daniel Craig Hello there,
```

So, you may notice the problem here. The _creation_ of the variable is hoisted, but the value assignment is not. Basically the JavaScript engine will automatically convert our code above to this:

```
function greetName(name) {
  var greeting;
  console.log(greeting + ' ' + name);
  greeting = 'Hello there,';
  console.log(greeting);
}
greetName(cast[0]); // 'undefined Daniel Craig Hello there,
```

That's generally not super useful. I mean, I'm sure there are edge cases where hoisting is valuable, but for the most part the reason it happens has more to do with memory management on the JS engine's part than on anything in particular the coder is trying to do.

Because hoisting happens, however, we can't completely trust our JS code to run as expected in the case where we're expecting a variable not to be declared yet. Here's a function that specifically tries to break if a variable doesn't exist yet, but _doesn't_ because of hoisting:

```
function listNames(names) {
  try {
    text
  } catch(e) {
    if (e.name === 'ReferenceError') {
      console.log('variable not declared yet!');
      return;
    }
  }
  var text = 'Starring: ';
  names.forEach(name => console.log(text + name));
}
listNames(cast); // all of our stars
```

This happens because hoisting causes `text` to _exist_, so it doesn't throw a reference error. We'd have to also check and see if `text` was `undefined` to be thorough.

This isn't a huge deal but it's best avoided entirely. There are two practices that help with that. The first is defining variables you know you're going to need later at the top of your scope. The second? Using `let` and `const` (though there is a growing school of thought that `const` is best avoided entirely &hellip; maybe we'll get into that at some point). `let` and `const` are still hoisted for memory management purposes, but they're not _initialized_, meaning they're not set to undefined. The JS engine knows they're there but will still throw a reference error if they're used before being declared in your code. Observe:

```
function greetNames(names) {
  names.forEach(name => console.log(greeting + ' ' + name));
  let greeting = 'Hiya, ';
}
greetNames(cast); // reference error
```

As you can see, we get a reference error here. Changing the `let` to a `var` would let the code run but `greeting` would be undefined at the time we're using it. Better, in my opinion, to stick with `let` _and_ move it up to the top of the function, like this:

```
function greetNames(names) {
  let greeting = 'Hiya, ';
  names.forEach(name => console.log(greeting + ' ' + name));
}
greetNames(cast); // it works!
```

So, there you go. Variable hoisting &hellip; it's a thing. Understanding how it works is valuable, even if only so you can appreciate why the best practice of declaring your variables at the top of their scope is, well, a best practice!

See you next week.

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
