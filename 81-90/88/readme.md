**JS Quick Hit: Bracket Notation**

Video URL: https://youtu.be/O7rhgmyaLQE

We're going quick-n-easy today, but I wanted to cover bracket notation because it's showed up quite a few times in these quick hits and I've never really explained it. I suspect a lot of you are familiar with it already but, hey, it never hurts to refresh your memory! Let's get started.

Bracket notation is a way of referring to part of a variable you've defined. You've probably most often seen it used with arrays, but it can also be used with strings and objects. We're going to cover all three. So, with that in mind, here's a bunch of data we'll be playing with:

```
const game = {
  name: 'Monopoly',
  releaseDate: 1935,
  difficulty: 'medium',
  randomChance: 'high',
  tedious: true,
};
const players = ['Zach', 'Sue', 'Bill', 'Diana', 'Cory'];
const slogan = 'Own It All';
const keys = ['name', 'releaseDate', 'difficulty', 'randomChance', 'tedious'];
```

Let's start with arrays. They're easy and familiar. When you use bracket notation with arrays, you're feeding it the array index. Everything in an array is in order, starting from zero and counting up, so in our players array up above, Zach is `0` and Cory is `4`. We can use those indices like this:

```
console.log(players[0]); // Zach
console.log(players[3]); // Diana
```

Simple enough. Let's move on to strings. When you use bracket notation with strings, you're also basically sending an index, but in this case it's the index of where the letter falls in the string. Again, it's zero-based, so "O" will be `0` and&mdash;because spaces and other non-alpha-numeric characters count&mdash;that final "l" in "All" will be `9`. Observe:

```
console.log(slogan[1]); // w
console.log(slogan[4] + slogan[9]); // Il
```

We can also use bracket notation with objects. In this case, we need to put a string inside the bracket (or a variable representing a string), and that string need to match one of the object's keys. It looks like this:

```
console.log(game['name']); // Monopoly
console.log(game['tedious']); // true
```

Which is great &hellip; but seems kind of pointless in light of the fact that dot notation exists, is easier to read, and doesn't require the values be passed as strings, right? Why use bracket notation when we can just do this?

```
console.log(game.name); // Monopoly
console.log(game.tedious); // true
```

And, indeed, if you're just directly referencing an object's property, that's the way to go. But there are situations in which we might have, say, an array of keys represented as strings, and want to work with those. That's where bracket notation comes in rather handy, like this:

```
const difficulty = keys[3];
console.log(game[difficulty]); // high
```

That still seems a bit contrived, sure, but when we get into situations involving larger data manipulation or loops, it starts to be really useful. Here's an example that will log out all of the values in the object that match the keys in our `keys` array:

```
keys.forEach(key => {
  console.log(`${key}: ${game[key]}`);
})
```

Fast and easy, and it takes care of converting strings to properties for you. Nice!

So, there we go, the basics of bracket notation. What do you guys think? Was this too basic for this series, or did you find it valuable? You can always hit reply to this newsletter and let me know what you think.

See you next week!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
