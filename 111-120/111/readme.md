**JS Quick Hit: Object Iterators**

Video URL: https://youtu.be/yL3XP0--ZTM

Let's talk about Object iterators. Specifically, let's talk about `Object.keys`, `Object.values`, and `Object.entries`. All three are supported by the majority of modern browsers (beware Internet Explorer - you'll need a polyfill) and are incredibly useful. You should definitely add them to your toolbox.

Why are they so useful? Well, because of the way the prototype chain works. You remember that, right? From [JS Quick Hits 22](https://closebrace.com/tutorials/2018-06-20/js-quick-hits-22-prototypes-part-1) and [JS Quick Hits 23](https://closebrace.com/tutorials/2018-06-27/js-quick-hits-23-prototypes-part-2)? Well, if not, a quick reminder: when you create a new object, it automatically inherits certain properties from the prototype object. This is, in itself, super useful. It's why built-in methods like `Object.toString` automatically work on new objects without you having to define the method each time. However, it's a bit of a double-edge sword because it made iterating through a specific object's non-prototypal properties a bit of a pain.

Let's start with some code, and I'll show you what I mean. Here's a constructor, which we also talked about in those prototype tutorials I mentioned:

```
function Game(options) {
  this.name = options.name || 'None';
  this.releaseYear = options.releaseYear || 2020;
  this.genre = options.genre || 'Unknown';
  this.price = options.price || 5999;
  this.onSale = options.onSale || false;
  this.discount = options.discount ||  0;
  this.developer = options.developer || 'Unknown';
}
```

Now we're going to add a method to `Game`'s prototype, like this:

```
Game.prototype = {
  getSalePrice: () => Math.round(this.price - this.price * this.discount, 10),
};
```

Finally, we're going to create a new game using our constructor, like this:

```
const newGame = new Game({
  name: 'Chicken Attack',
  releaseYear: 2019,
  genre: 'RPG',
  price: 5999,
  onSale: true,
  discount: 0.3,
  developer: 'Bust-Em-Up Interactive',
});
```

Cool. So now we've got data. Let's start doing stuff with it. The first thing to try is a simple `for/in` loop to iterate over our new game:

```
for (let key in newGame) {
  console.log(key);
}
```

That works just fine ... except it lists `getSalePrice` as a key, because `for/in` lists prototypal methods. Sometimes that's valuable, but more often it's not. In this case, we don't want `getSalePrice` there because that's a function, and we're only interested in the data. Well, now we can use our Object iterator methods to access it. Let's start with `Object.keys`:

```
console.log(Object.keys(newGame)); // no 'getSalePrice'
```

As you can see, this produces an array of strings, each representing one of the object's keys (in the order those keys were initialized). Awesome! This is handy because no only are we skipping prototypal data, but because the output's an array, it gives us access to all of our favorite array methods, like `filter` or `map`. Check it out:

```
const justNameAndGenreKeys = Object.keys(newGame).filter(key => key === 'name' || key === 'genre');
console.log(justNameAndGenreKeys); // ['name', 'genre']
```

OK, so that's maybe not the most immensely useful code of all time, but it can often be really handy to have a list of an object's keys over which you can iterate. Here's a slightly more practical example:

```
const gameKeys = Object.keys(newGame);
gameKeys.forEach(key => {
  if (typeof newGame[key] === 'string') {
    console.log(newGame[key]); // just logs the values that are strings
  }
});
```

Now we're listing off the values that are strings, for example: "Chicken Attack." Still not the most necessary real-world code, but it works for a simple example! Of course, you're probably wondering: *why go through all that trouble to get the values when `Object.values` exists?* Good question! Let's do that instead, and while we're at it we'll just show the values that are numbers, all on one line!

```
console.log(Object.values(newGame).filter(value => typeof value === 'number')); // [2019, 4999, 0.3]
```

Being able to produce iterable arrays of keys and values is so awesome. But let's not forget `Object.entries`! That produces an array of arrays, specifically, tiny `[key, value]` arrays, like this:

```
const entries = Object.entries(newGame);
console.log(entries); // Array of arrays ([key, value])
```

This becomes super useful when you pair it with array destructuring, so instead of having to access, say, `entry[0]` and `entry[1]`, you can do this instead:

```
entries.forEach(([key, value]) => {
  console.log('key: ' + key + ', value: ' + value);
});
```

These simple examples are just a glimpse into the utility of these tools. Imagine you're working on a JSON dataset that's bringing in thousands of user objects. Being able to quickly and efficiently iterate over their keys, values, or both would prove useful in a wide variety of scenarios! With these new object iterator methods, you have the power to do it.

That's it for now. See you next week!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
