### JS Quick Hits: Object.assign Issues

Video URL: https://youtu.be/CCgffQHeZsk

Last week we talked about `Object.assign` and how you can use it to mash together objects, or generate new ones. I left off by mentioning that there were a couple of "gotchas" to worry about, and we're going to cover those this week. First let's establish a base object, same as before:

```
const soulsGame = {
  creator: 'Hidetaka Miyazaki',
  despair: true,
  difficulty: 'Hard',
}
```

There's two things to pay attention to. The first is that `Object.assign` only works with *enumerable* properties on an object, which are properties that will be evaluated when, for example, you loop over the object. This means stuff from the prototype chain gets ignored, as does any property you expressly mark as not enumerable (want to know more about the prototype chain and enumerable properties? Reply to this email and let me know!). So, for example, all Objects automatically inherit a `hasOwnProperty` method that returns true or false when you use it to see if an object has a non-prototype property name. Watch:

```
console.log(soulsGame.hasOwnProperty('despair')); // true
```

But `hasOwnPropery` is part of the prototype chain. Which means it's not enumerable. Which means when we evaluate an object with `Object.assign` it doesn't pay attention to that property ... which means we can overwrite it, like this:

```
const testSouls = Object.assign({
  hasOwnProperty: function() {
    return 'I broke the property chain!';
  }
}, soulsGame);
console.log(testSouls.hasOwnProperty('name')); // I broke the property chain!
```

See? Even though `soulsGame` is the last parameter, and thus should have the last word, its own `hasOwnProperty` function is *not* overwriting the one we defined in our object, because it's being ignored, because it's not enumerable.

Note: it's almost always an immensely bad idea to overwrite prototype properties and I don't recommend doing it. This is just an example!

The other thing you have to be careful about is deep merging. Quite simply: `Object.assign` doesn't support it (neither does an alternate method we're about to talk about). Here's an example:

```
const soulsSequel = Object.assign({
  name: 'Dark Souls 4ever',
  info: {
    speculative: true,
  }
}, soulsGame);

console.log(soulsSequel); // all's well here

const shadowsDieTwice = Object.assign({
  name: 'Shadows Die Twice',
  info: {
    actuallyHappening: true,
  }
}, soulsSequel, soulsGame);

console.log(shadowsDieTwice); // this will show speculative, but not actuallyHappening
```

A deep merge would add both properties, `speculative` and `actuallyHapening` to the `info` object &hellip; but since this is only a shallow merge, it'll just overwrite the `info` object. Also of course our `name` property got overwritten, but that's expected behavior.

In addition to not doing deep merges, `Object.assign` also only makes references to nested objects, rather than truly cloning them. This can be quite problematic. Watch:

```
const skelHitPoints = {
  skeletons: {
    regular: 400,
    giant: 800,
  },
};

const soulsHitPoints = Object.assign({
  rats: {
    regular: 200,
    giant: 650,
  }
}, skelHitPoints);

console.log(JSON.stringify(soulsHitPoints)); // as expected

soulsHitPoints.skeletons.regular = 450;

console.log(JSON.stringify(soulsHitPoints)); // as expected
console.log(JSON.stringify(skelHitPoints)); // ... super broken!
```

See the problem? We changed the value of `skeleton.regular` on **soulsHitPoints** &hellip; but it also changed in **skelHitPoints**. That's because deep objects are referenced, rather than cloned, using `Object.assign`. If you want to do full deep cloning, you'll need to write your own functionality to do that, or use a third-party library. Right now there's no built-in solution.

Finally, I wanted to mention something reader Adam M pointed out &hellip; you can also use the [spread operator](https://closebrace.com/tutorials/2018-03-14/js-quick-hits-8-the-spread-operator) to combine objects, much like we've done with Arrays. Here's an example:

```
const characterStats = {
  charisma: 8,
  dexterity: 12,
  intelligence: 9,
  luck: 6,
  strength: 18,
  wisdom: 9,
  constitution: 16,
}

const fullCharacter = {
  age: 26,
  name: 'Strongdar',
  race: 'Giant',
  ...characterStats,
}

console.log(fullCharacter);
```

This is &hellip; well, it's better than `Object.assign`, right? More concise and more readable, and it does the same thing. So why not use it? The only answer is "I want to support a wider range of browsers without transpiling." `Object.assign` is an ES2015 feature, but the spread operator for objects didn't show up until ES2018. So if you're supporting only modern browsers, or using a transpiler like babel, then by all means go with the spread operator!

See you next week.

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*