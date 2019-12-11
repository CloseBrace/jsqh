### JS Quick Hits: The Rest Operator

Today we're going to talk about template literals, which are also sometimes called template strings (an old name that is now deprecated). We've used these a few times already in some previous tutorials, and you probably have an idea for how they work, but let's go through the specifics.

Template literals behave a lot like typical JavaScript strings, in that they contain chunks of text. However, they offer a few distinct advantages over traditional strings. The most obvious is that they make concatenation both slightly shorter and significantly easier on the eyes. Let's say we have these variables:

```
const name = 'T’Challa';
const country = 'Wakanda';
const numSiblings = 1;
const occupation = 'king';
```

With ES5, we'd need to do something like this to create a short sentence:

```
console.log('Black Panther’s name is ' + name + ', he lives in ' + country + ' where he is a ' + occupation + ', and he has ' + numSiblings + ' siblings.');
```

That's fine &hellip; it's not impossible to figure out what's going on there or anything, but if you're like me, with longer string concatenation there's roughly a 100% chance you'll miss a space or something on your first attempt, end up with a sentence that starts like *Black Panther's name isT'Challa* and have to go back and fix it.

Here's the ES2015 version:

```
console.log(`Black Panther’s name is ${name}, he lives in ${country} where he is a ${occupation}, and he has ${numSiblings} siblings.`);
```

That's shorter by twenty-one characters, which is nice enough, but it's also infinitely more readable. Those dollar-signed variables are called *placeholders* and get filled in by the JS engine at run-time with the appropriate variables.

Now, perhaps you're annoyed by that code outputting "1 siblings" instead of the correct "1 sibling." Of course, we don't want to just knock off the 's' because what if he finds out he has a long-lost brother, which is the exact kind of thing that probably has actually happened in the comics at some point. Well, GOOD NEWS EVERYONE! Template literals are awesome because placeholders aren't limited to containing simple data. You can perform actual code in them. Observe!

```
console.log(`Black Panther has ${numSiblings} ${ numSiblings === 1 ? 'sibling' : 'siblings' }.`);
```

The first placeholder just outputs the value of numSiblings, but the second placeholder uses a ternary operator to evaluate numSiblings and respond with a particular string based on whether the number equals 1 or not. You can also *nest* these things, which can get a little complex. Here's an alternate version of the code above:

```
console.log(`Black Panther has ${ numSiblings === 1 ? `${numSiblings} sibling` : `${numSiblings} siblings` }.`);
```

In this case nesting is longer than not nesting, but there are times when it can either shorten code or make it easier for human eyes to parse.

One final thing to mention: template literals can contain line breaks, but they will parse those line breaks, so this code:

```
console.log(`Black Panther’s name is ${name}.
  He lives in ${country}.`);
```

will log this:

```
Black Panther’s name is T'Challa.
  He lives in Wakanda.
```

See how it also keeps all your spacing? That can be good or bad. Personally I don't find multi-line template literals to be super useful, but I'm sure there are situations where it makes sense.

There's more to template literals &ndash; specifically, something called tagged functions, but those are complex and would take longer to explain than we have available, so we'll have to get to them in a future tutorial!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*