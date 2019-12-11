**JS Quick Hit: Maps vs. Objects**

Video URL: https://youtu.be/XOIKgqK0JDg

Let's talk about maps today. Sadly, these maps do not lead to buried treasure or exotic new locations, but they do help you organize your data. A JavaScript map is simply a set of key/value pairs, like this:

```
name: 'bort'
age: 8
hasLicensePlate: true
```

"HOLD UP!" you might be crying. "That looks like the same kind of data you'd store in an object!" Well &hellip; yes. Yes it is. And it's extremely possible to build large, complex JavaScript applications without ever using a map, or a set (which we're going to get to next week). Trust me; I've done it.

But I probably shouldn't have, especially now that maps are fully supported by basically any JavaScript engine you might want to run. Before we talk about differences, let's talk about&mdash;okay, well, this is a difference too, but it's an implementation thing&mdash;how we create maps. Unlike objects, we can't just feed a map a bunch of keys and values in curly braces. We instead have to use an array of iterables whose values are key/value pairs. In other words, an array of two-value arrays, most of the time. Like this:

```
const characters = new Map([
  [0, 'Itchy'],
  [1, 'Scratchy'],
]);
```

You can also set them manually, like this:

```
characters.set(2, 'Disgruntled Goat');
```

To retrieve a value, you don't use the dot syntax you'd use with an object. Instead, you use `get`, like this:

```
console.log(characters.get(2)); // 'Disgruntled Goat'
```

There are several fundamental differences between maps and objects. They don't all fall in favor of maps, but often they do. For one thing, Maps don't have prototypes the way Objects do, which means that you can use any value as a key in a map, whereas in an object if you were to use, say, `hasOwnProperty` as a key, you'd be overwriting the default `Object.hasOwnProperty` method that gets inherited from the prototype, which could (and probably _would_) cause problems for you later down the line.

This lack of prototypal inheritance also makes them safe to use with the `for / of` loop (we talked about that in [JS Quick Hits 4](https://closebrace.com/tutorials/2018-02-14/js-quick-hits-4-for-of-loop)). This is a big deal, because the `for / of` loop is really handy (and only becomes a significant speed bottleneck if you're doing a lot of intense loops at once). Maps also work with `forEach`, unlike objects. Using that method always provides the values. Here's an example of both uses:

```
characters.forEach(char => console.log(char)); // logs character names

for (let [key, value] of characters) {
  console.log(key);
} // 0, 1, 2
```

Additionally, object keys are always strings or symbols (which people rarely use, so mostly strings). This means even if you define an object like this:

```
const kids = {
  1: 'Bort',
  2: 'Bart',
  3: 'Lisa',
  4: 'Maggie',
};
```

You're going to get numbers when you access its keys, like this:

```
console.log(Object.keys(kids)); // ['1', '2', '3', '4'];
```

Not so with map, which can take basically anything, including functions and objects, as keys. This actually gives us an iterator named `mapIterator` which retains all of the appropriate keys. Observe:

```
const adults = new Map([
  [0, 'Homer'],
  ['1', 'Marge'],
  [() => null, 'Professor Frink'],
]);
console.log(adults.entries()); // nothing's converted to a string
```

Another difference between maps and objects is that maps retain the order of their entries. So when you work with the `adults` variable we just defined, entry zero is _always_ going to have a key of `0` and a value of `Homer`. Entry two is always going to have a key of &hellip; a function returning null, and a value of "Professor Frink". That's hugely useful because JavaScript's random reading of objects is often a real pain to deal with.

Another small but useful difference: getting an object's size requires you to manually iterate through the object, ignoring prototype entries, and calculate how many key/value pairs there are. With map? You do this:

```
console.log(adults.size); // 3
```

Note that in some cases, maps are not the right choice. For example, since you lose the shortcut of dot notation, if you're just using simple objects you may find that easier than using `map.get()` all the time. Additionally, maps don't really have methods. You can set a function as a value and then execute that function with a `call` or `apply`, like this:

```
adults.set('shoutName', (name) => console.log(name.toUpperCase()));
adults.get('shoutName').call(null, 'test');
```

But that's pretty annoying compared to just running, for example `adults.shoutName('test')`, so if you're going to have a bunch of methods, an object's almost always a better solution.

So, that's the basics of maps! There's a ton more we could go into, but we're trying to keep this quick hit, well, quick, and this should give you plenty with which to get started. Next week we'll talk about sets. See you then!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
