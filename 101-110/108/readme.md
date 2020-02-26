**JS Quick Hit: How to Find an Element In an Array**

Video URL: https://youtu.be/pp9_Xmd96oc

A couple weeks ago we learned a bunch of ways [how to _remove_ elements from an array](https://closebrace.com/tutorials/2020-02-12/js-quick-hits-106-how-to-remove-elements-from-an-array). This week we're going to check out a relatively new and extremely easy way to figure out if an element _exists_ in an array.

This has, of course, been doable for a long time. But the easiest way to do it was a bit tedious and kludgy. I'll show you that, first, and then we'll look at the newer, better way. But before that, we'll need some data. Here you go:

```
const data = ['Geralt', 'Ciri', 'Yennefer', 'Fringilla', 'Cahir', 'Tissaia', 'Dara'];
```

The old way to check and see if something existed in an array was to use `findIndex`, which would return a negative one if the item you were searching for didn't exist (and thus had no index - it can't return zero, because Array indices start at zero, not one). If you then wanted to produce a true/false value, you'd have to do something like this:

```
let hasYen = false;
let hasTriss = false;
const yenIndex = data.indexOf('Yennefer');
const trissIndex = data.indexOf('Tess');
if (yenIndex > -1) {
  hasYen = true;
}
if (trissIndex > -1) {
  hasTriss = true;
}
console.log(hasYen); // true
console.log(hasTriss); // false
```

That's fine but it's kind of a lot of lines of code. You could of course create a function that gives you true/false, but &hellip; bleh, right? Not the best. Well, now we've got `Array.includes` which, you guessed it, checks to see if an array includes a given element. Here's how it works:

```
console.log(data.includes('Cahir')); // true
console.log(data.includes('Joey Jim Bob Junior Joe Johnson')); // false
```

That's a lot cleaner! Though I do think that the show should feature Joey Jim Bob Junior Joe Johnson in future episodes. You just tell it what to look for, and it goes and looks, and gives you a simple boolean response. Hooray, modern JavaScript (this works in every modern browser, but won't work in IE, so make sure you polyfill if you need your code to work in legacy browsers).

You can also give `Array.includes` an index from which to start looking, in case for some reason you want to skip the first `n` entries in the array. So, Geralt's only going to show up if you're not skipping the initial index. Check it out:

```
console.log(data.includes('Geralt')); // true
console.log(data.includes('Geralt', 3)); // false
```

That second line tells the JS engine to only start looking from index `3` onward, so &hellip; no Geralt!

Oh, one last thing: `Array.includes` only works with basic primitives. You can't find objects, for example. Observe:

```
const arrayOfObjs = [{ name: 'Chris' }, { name: 'Sarah'}];
console.log(arrayOfObjs.includes({ name: 'Chris' })); // false
```

We'll talk about how to do a deeper search that can help you identify objects within an array next week.

See you then!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
