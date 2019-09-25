**JS Quick Hit: Chaining Array Methods**

Video URL: https://youtu.be/EMT-IC1mtJg

Before we get started, I want to mention that this tutorial uses a bunch of arrow functions with implicit returns. If you're new to them, or just need a refresher, refer back to [JS Quick Hits 12 - Arrow Functions Part 1](https://closebrace.com/tutorials/2018-04-11/js-quick-hits-12-arrow-functions-part-1) for a run-down. Cool? Cool. Let's do this.

JavaScript programming often involves a lot of data, and one of the best ways to store large datasets is an array (specifically, an array of objects). We've talked about the various built-in Array methods JavaScript provides in the past, and we've recently talked about how to chain your own methods. Lets put the two ideas together and talk about how you can chain Array methods. This is going to be a quick-and-easy tutorial, so take a breath and let's dive right in with a set of vitally important real-world data that you would totally be using in your application. Ready? Here it is:

```
const data = [
  { name: 'James McAvoy', age: 40, character: 'Bill Denbrough' },
  { name: 'Jessica Chastain', age: 42, character: 'Beverly Marsh' },
  { name: 'Bill Hader', age: 40, character: 'Richie Tozier' },
  { name: 'Isaiah Mustafa', age: 45, character: 'Mike Hanlon' },
  { name: 'Jay Ryan', age: 38, character: 'Ben Hanscom' },
  { name: 'James Ransone', age: 40, character: 'Eddie Kaspbrak' },
  { name: 'Andy Bean', age: 34, character: 'Stanley Uris' },
  { name: 'Bill Skarsgård', age: 29, character: 'Pennywise' },
];
```

What's that? Your application doesn't have anything to do with the cast of IT: Chapter Two? Well, I don't even know how to process that! But trust me, what we're about to do can apply to all kinds of datasets. First off, let's start with a single array method. We'll use `Array.map` to produce a new array that just contains the actors' names, like this:

```
const nameArray = data.map(actor => actor.name);
console.log(nameArray);
```

That's easy enough. We get an array full of strings. Fun times. Next up, let's return the character names of only people 40 and over. We could do this by expanding our map function and using an `if` in there, but that's no fun. Let's just chain a filter and a map instead! Here's the code:

```
const charactersFortyPlus = data
  .filter(actor => actor.age >= 40)
  .map(actor => actor.character);
console.log(charactersFortyPlus)
```

This will log an array full of all of the character names except Ben, Stanley, and Pennwise, because those actors are youngins! By the way, you can also express that on a single line if you want, it just gets kind of long. Here it is, though:

```
const charactersFortyPlus = data.filter(actor => actor.age >= 40).map(actor => actor.name);
```

We can do this chaining because `.map` and `.filter` each return a brand new array, and the array being returned always has those built-in methods on it. You can chain as many methods as you need to get the job done. Let's go crazy and create a chain that includes just the good guys, takes their ages, and adds them all up into a single number. Again, we could do this in a variety of ways, such as create a global variable in which to store the age total and then adding to it, but chaining is fast, efficient, and&mdash;once you're used to it&mdash;really easy to follow when reading the code. Check it out:

```
const goodguysCombinedAges = data
  .filter(actor => actor.character !== 'Pennywise')
  .map(actor => actor.age)
  .reduce((total, age) => total + age);

console.log(goodguysCombinedAges); // 279
```

279 years of experience, all combined to try and beat up a clown who is himself eons old, if indeed the passage of years can even have any meaning for a being that exists beyond the borders of space and time as we perceive it. Uh &hellip; sorry, getting away from the point, here. That being that chaining array methods is a good way to write fast, efficient data manipulation code. Don't forget that you can do it!

That's all I've got this week. See you next time!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
