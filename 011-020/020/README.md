### JS Quick Hits: Object.assign

Video URL: https://youtu.be/zjDwTpwpmSY

`Object.assign` is a new feature introduced in ES2015 that allows us to do two things. The first is add properties to an existing object, and the second is to quickly make a clone of an existing object while simultaneously adding new properties. It's a super-handy little utility, especially if you're dealing with state values in React, and *especially* especially if you're working with Redux without a library like [Immutable.js](https://facebook.github.io/immutable-js/) (which is great but also complex and confusing).

Let's create a base object, like this:

```
const soulsGame = {
  creator: 'Hidetaka Miyazaki',
  despair: true,
  difficulty: 'Hard',
}
```

First let's add a new property to the base object, like this:

```
Object.assign(soulsGame, { hasRemaster: false });
console.log(soulsGame);
```

Obviously it'd be just as easy to just assign a new property directly, like `soulsGame.hasRemaster = false;`, but if you had a whole bunch of new properties to add, that's where it becomes less tedious and more readable to use `Object.assign`. Another way in which `Object.assign` shines is that it can take an indefinite number of objects, so if you have two existing objects and want to merge them into the base object, you can do it easily in one line. Note that in the instance of duplicate property names, the later parameters take precedence. So, for example, this code will overwrite some of its own parameters:

```
Object.assign(soulsGame, { hasRemaster: true, isSequel: true }, { isSequel: false }); 
console.log(soulsGame);
```

Here we're assigning two new objects to the base object. Because they're evaluated in order, you're going to end up with a `hasRemaster` value of true, and an `isSequel` value of false.

You can also create a bunch of individual objects from that base object, using `Object.assign` to add values. For example:

```
const first = Object.assign({
  directors: ['Hidetaka Miyazaki'],
  name: 'Dark Souls',
  releaseYear: '2011',
}, soulsGame);

const second = Object.assign({
  directors: ['Tomohiro Shibuya', 'Yui Tanimura'],
  name: 'Dark Souls 2',
  releaseYear: '2014',
  hasRemaster: false, // this won't work
}, soulsGame);

const third = Object.assign({
  directors: ['Hidetaka Miyazaki', 'Isamu Okano', 'Yui Tanimura'],
  name: 'Dark Souls 3',
  releaseYear: '2016',
  hasRemaster: false, // this won't work
}, soulsGame);
console.log(first);
console.log(second);
console.log(third);
```

Note that here we're starting with a new object and then assigning the base object to it. This is why the two lines marked "this won't work" uh &hellip; don't work. Because the base object already has a 'hasRemaster' value (which we gave it in the examples above), and since it's now the *last* parameter, it gets the last word and is overwriting the values from the new objects. So we still have to go in manually and fix those settings like this, assuming we want our objects to reflect reality:

```
second.hasRemaster = false;
third.hasRemaster = false;
console.log(second);
console.log(third);
```

There we go. Now only the first game has a remaster, which you should definitely go buy if you never played the original, because the game's a masterpiece. Oh, Dark Souls!

Err, right &hellip; back on track. There are a couple of "gotchas" to be aware of when using `Object.assign`, but this "quick hit" is already fairly long and will get much longer if I go into them. They relate to enumerable properties and deep object assignment, and we'll cover them next week.

See you then!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*