### JS Quick Hits: ES2015 String Methods

Video URL: https://youtu.be/KazVcweIil0

ES2015 introduces two new String methods that reduce the amount of code you need to write compared to working in ES5. The first is `String.repeat`. It's a handy little method that lets you, well, repeat a string any number of times. We could do this in ES2015, too, but it was super hacky. The best approach was to create a blank array with `n` empty values, and then create a string out of it using `Array.join` like this:

```
console.log(Array(3).join('Let's repeat this')); // Let's repeat thisLet's repeat this
```

What we're doing here is creating an array with three empty values and then using `.join`, which creates an empty string, except `.join` also allows us to specify text to put in between those values. So we put the text we want to repeat into the space where we'd normally put, for example, a comma. This is why we have to create a three-value array to get two repeats, because we're basically creating this string: `BLANKLet's repeat thisBLANKLet's repeat thisBLANK` where `BLANK` doesn't exist.

&hellip; super hacky, right? To quote those old informercials: there's got to be a better way!

There is, now. Here's how `String.repeat` works:

```
console.log('This is better! '.repeat(2)); // This is better! This is better!
```

Straightforward, right? Tell it how many times to repeat your string, and that's what it does. No more messing around with arrays. You can also pass it variables and/or do math, like this:

```
const depth = 4;
console.log('Woohoo! '.repeat(depth / 2)); // Woohoo! Woohoo!
```

`String.repeat` is probably not something you're going to use a ton, barring specialized applications, but it's a good tool to know about nonetheless. Probably more useful, however, is a new suite of string-searching methods, so let's talk about those, too. We'll start by establishing a string to work with:

```
const str = 'I hope the new Predator movie is actually good.';
```

First, let's look at the old ES5 way of searching for stuff. We'll see if our string starts with certain text, ends with certain text, and contains certain text, in that order. Here's the code:

```
console.log(str.indexOf('I hope') === 0); // true (the string starts with "I hope")
console.log(str.indexOf('good.') === str.length - 5); // true (the string ends with "good.")
console.log(str.indexOf('new Pred') !== -1); // true (the string contains "new Pred" somewhere)
```

That's confusing to read, and on the second line it requires you to know the exact length of the text you're searching for (or create a second variable from that text and then use `.length`). Either way, it's annoying. Here's how we handle the same stuff in ES2015:

```
console.log(str.startsWith('I hope')); // true
console.log(str.endsWith('good.')); // true
console.log(str.includes('Predator movie')); // true
console.log(str.includes('Arnold Schwarzenegger')); // false
```

That's not only shorter, it's also easier to read. Wins all around! But wait, there's more (sorry &hellip; still in informercial mode I guess). You can also use modifiers, like this:

```
console.log(str.startsWith('hope', 2)); // true (because you're starting two characters in)
console.log(str.endsWith('hope', 6)); // true (because we're only evaluating the first 6 characters)
console.log(str.includes('hope', 10)); // false (because we're starting way past where "hope" is)
```

Note that the modifier for `endsWith` behaves differently than the other two. `startsWith` and `includes` both use the modifier to start evaluating the string further into it. `endsWith`, meanwhile, uses its modifier to prematurely stop evaluating the string.

That's it for the new string methods. Next week we'll be talking about numbers. Catch you then!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*