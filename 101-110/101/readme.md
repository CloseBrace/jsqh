Today we're going to talk about a new Array method that's arrived with recent versions of ECMAScript, which is the technical name for JavaScript (basically). Let's say you've got an array. This array is full, for whatever reason, of other arrays. Something like this:

```
const skywalkerCast = [
  ['Rey', 'Finn', 'Poe', 'Rose', 'Zorri', 'Chewbacca', 'Lando', 'Leia'],
  ['Kylo Ren', 'Hux'],
  ['BB-8', 'D-0', 'C-3PO', 'R2-D2' ],
];
```

That's great, nice separation of good, evil, and droids (who are also good &hellip; not trying to be droidist, here), but perhaps you're looking to just convert that down into a single array of values. In the past, that involved some fairly tedious thrashing around to accomplish, using reduce and concat, and if you had deeply nested Arrays (that is, an array within an array within an array, or even further) it became even more complicated.

Now we've got `Array.prototype.flat` which allows you not only to flatten your arrays, but to specify the _depth_ to which you want to flatten them. Let's take a look at how that works. First we'll flatten the array above, which only has a single level of depth. It's easy. Here's the code:

```
const skywalkerFlat = skywalkerCast.flat();
console.log(skywalkerFlat); // See output below.
```

Output Array:

```
["Rey","Finn","Poe","Rose","Zorri","Chewbacca","Lando","Leia","Kylo Ren","Hux","BB-8","D-0","C-3PO","R2-D2"]
```

As you can see, this has flattened our array! Note also that if we console log the original array, it hasn't change. It's still nested. Like many (but not all!) Array methods, `flat` is non-destructive. It returns an entirely new array rather than mutating the existing one.

Working with a single-level array of arrays, everything's simple and easy, and if you're only dealing with one level of depth, this'll get the job done. However, let's toss something a little more complex at it:

```
const testArray = ['A', ['B', 'C'], ['D', ['E', 'F']]];
const testArrayFlat = testArray.flat();
console.log(testArrayFlat); // ["A", "B", "C", "D", Array(2)]
```

D'oh ... it only flattened a single level, so we still have a sub-array in there. We have to give `flat()` a parameter telling it how many levels to use. We'll go with `2` for now but you can use any number, including `infinity`. Observe:

```
const testArrayDeepFlat = testArray.flat(2);
console.log(testArrayDeepFlat); // ["A", "B", "C", "D", "E", "F"]
```

There we go. Thoroughly flattened. So far, everything's worked fine, but what happens if your sub-arrays don't all contain unique items? Well, the answer is, "nothing." Your flattened array will contain duplicates. Watch:

```
const testArrayDupes = ['Robot', 'Pirate', ['Ninja', 'Robot']];
const testArrayDupesFlat = testArrayDupes.flat();
console.log(testArrayDupesFlat); // ["Robot", "Pirate", "Ninja", "Robot"];
```

That might be a good thing! You're not always looking for unique data, after all. But in case you _are_, the easy way to nuke any duplicate items is by converting to a set and then using the spread operator to convert back to an array. Check it out:

```
const testArrayDupesFlatSet = new Set(testArrayDupesFlat);
console.log([...testArrayDupesFlatSet]); // ["Robot", "Pirate", "Ninja"]
```

Last thing to note about `flat()` &hellip; it'll remove empty array spaces. That's handy most of the time, but if your application has need for empty spaces in your arrays, be aware of it (you might want to change the code so that the empty space is taken up by a zero or other null, undefined, or falsey value, rather than just nothing). Here's an example:

```
const monsters = ['Werewolf', 'Werehorse', , 'Werearmadillo'];
const moreMonsters = ['Weretiger', 'Wereant', undefined, 'Weretuna'];
console.log(monsters.flat()); // ["Werewolf", "Werehorse", "Werearmadillo"]
console.log(moreMonsters.flat()); // ["Weretiger", "Wereant", undefined, "Weretuna"]
```

And that's it for this week. Catch you next time!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
