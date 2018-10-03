**JS Quick Hit: Immutability Basics**

Video URL: https://youtu.be/A8V8D46mqXo

A couple of weeks ago, when we talked about `Array.push` and `Array.pop`, I mentioned that these methods mutate data. That is: they act on the original array, rather than creating a clone of the original array that reflects its new state (more data, in the case of `push`, or less data in the case of `pop`). This is contrary to how a lot of other Array methods work, like `map` or `filter`, both of which create entirely new arrays while leaving the original intact. In fact, let's take a look at two quick examples. Here's the first, showing mutated data:

```
const nums = [0, 1, 2, 3, 4, 5];
nums.push(6);
console.log(nums); // 0, 1, 2, 3, 4, 5, 6
```

And here's the second, showing non-mutated data:

```
const pastries = ['croissant', 'pain au chocolat', 'cheddar biscuit', 'cherry danish'];
const cPastries = pastries.filter(pastry => pastry.charAt(0) === 'c');
console.log(pastries); // croissant, pain au chocolat, cheddar biscuit, cherry danish
console.log(cPastries); // croissant, cheddar biscuit, cherry danish
```

These different types of methods illustrate, in a nutshell, data mutability and immutability.

Well &hellip; not really. Because that original array data is still mutable. You *can* change it, even if some of your methods don't. Truly immutable data means that if you attempted to change the data contained in the array, you'd get an error. This can't really be accomplished for arrays and objects in JavaScript without writing extra code of your own, or using an existing library like Facebook's [immutable.js](https://facebook.github.io/immutable-js/docs/#/). If you clicked that link, then I hope you're not having a panic attack right now. The documentation's a bit overwhelming. Don't worry, this isn't an introduction to immutable.js. Instead, it's a short lesson on what data immutability is. Next week, we'll talk about why it can be valuable, and why you might want to consider implementing certain policies in your code, even if you don't go all the way to using a library to ensure true immutability.

Here's something interesting: arrays and objects aren't immutable by default in JavaScript, but strings are. You can replace a string entirely, if you define it with `var` or `let`, but you can't mutate its contents because all of JavaScript's string methods are either read methods (that is: they just get and display data) or create new strings. Observe:

```
let str = 'I enjoy pastries.';
str.slice(8, 16);
console.log(str); // I enjoy pastries.
const excerpt = str.slice(8, 16);
console.log(excerpt); // pastries
console.log(str); // I enjoy pastries.
str = 'I also enjoy eggs and bacon.';
console.log(str); // I also enjoy eggs and bacon.
```

See how that first `.slice` does nothing? That's because it's returning a snippet of the string, but we're not assigning that return value to anything. What it's *not* doing is slicing up the original string, which we prove by console logging the original right afterwards.

Immutability is most popular with programmers who prefer functional languages or approaches. JavaScript is object-oriented (sort of), but you can still use a lot of functional programming concepts to help keep your code clean, readable, and testable. There's value to both approaches in my opinion, though of course the debate rages on across the internet as to which is best and whether or not you should completely abandon one approach in favor of another. I tend to take the middle ground on arguments like this. There are object-oriented solutions powering massive, enterprise-level sites. There are functional solutions powering massive, enterprise-level sites. There are hybrid solutions powering massive, enterprise-level sites. Use what you like, and what your team likes, and you'll probably be fine!

In all cases, though, data immutability can be useful. More and more, I've found myself gravitating toward immutable methods while eschewing ones that mutate data. We'll talk about a few reasons why next week. See you there!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*