### JS Quick Hits: Arrow Functions Part 1

Video Url: https://youtu.be/yOkmmSWucXw

Today we're going to talk about arrow functions in ES2015. We've been using them a ton in this series, but haven't actually explained them in depth yet. Well, the time has come! Arrow functions are more than just a way to omit the `function` keyword and save a few characters of code. They also behave differently than ordinary ES5 functions in some useful ways.

First, let's establish some data:

```
const guardians = ['Starlord', 'Gamora', 'Rocket', 'Groot', 'Drax'];
```

Now, here's an ordinary ES5 function:

```
function soundOff(team) {
  for (var i = 0; i < team.length; i++) {
    console.log(team[i]);
  }
}
soundOff(guardians); // Starlord, Gamora, Rocket, Groot, Drax
```

Our function takes an array, loops through it, and console.logs each value. Nothing special here. Let's move on to an arrow function, like this:

```
const shoutOut = (team) => {
  for (const member of team) {
    console.log(`What's up, ${member}?`)
  }
}
shoutOut(guardians); // "What's up, Starlord?", etc ...
```

We're also using [ES2015's for / of loop](https://closebrace.com/tutorials/2018-02-14/js-quick-hits-4-for-of-loop) there, but it's the same basic deal. Loop through the members and do something. That's not really much different from the first function we wrote, and I can't say I blame you if you wondering "what's the point?"

Well, let's talk about ways to shorten arrow functions down. For one thing, the one above is actually doing something unnecessary. If an arrow function only takes a single argument, you don't need to put parentheses around it. So you could just do something like this:

```
const interrogate = team => {
  for (const member of team) {
    console.log(`What are you doing here, ${member}?`);
  }
}
interrogate(guardians); // "What are you doing here, Starlord?", etc ...
```

So, great, that saves you two characters. That's not very exciting, so let's talk about explicit vs. implicit returns. Explicit returns are when a function, well, explicitly returns something. That is to say, there's a specific line in the function that starts with `return` and then describes what the function should return, like this:

```
const nameLength = name => {
  return name.length;
}
console.log(nameLength('Starlord')); // 8
```

That's the only way ES5 functions work. But ES2015 arrow functions introduce the concept of implicit returns, which is awesome, because it's both highly readable and much shorter. Check this out:

```
const shoutName = name => name.toUpperCase();
console.log(shoutName('Gamora')); // GAMORA
```

If you don't have any open/close braces, and you just put your return value on the same line, the arrow function automatically understands that you're saying `return name.toUpperCase();`. This is a really great code shortener that you'll find yourself using all the time, especially when using functionality like `Array.map`. Speaking of which, let's do that while also showing how to write an arrow function that doesn't take any arguments. Here's the code:

```
const nameLengths = () => guardians.map(member => member.length);
console.log(nameLengths()); // [8,6,6,5,4]
```

So clean! So concise! We're doing two implicit returns on a single line. You can also use an underscore instead of the empty parens, which is a convention that's popular in several other languages. I don't, because I find it aesthetically displeasing &hellip; but I won't stop you!

For comparison's sake, here's the ES5 version of that same function:

```
function nameLengths() {
  return guardians.map(function(member) {
     return member.length;
  });
}
```

The other important thing to talk about when it comes to arrow functions is how they handle scoping when it comes to that mischievous troublemaker, `this`. Unfortunately, that'd make this tutorial way too long, so we're going to have to talk about it next week. See you then!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*