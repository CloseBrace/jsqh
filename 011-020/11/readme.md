### JS Quick Hits: Default Parameters

Watch the video: https://youtu.be/0nTgpb3g8GA

Today we're going to talk about a simple, code-saving feature introduced in ES2015. Object shorthand allows you to reference and even manipulate object properties with less tedious repetition. Simply put: Object Shorthand lets you do away with key/value pairs when duplicating them, and just use the key instead. As we often do, let's start with an ES5 example. If you've spent any time working with objects in JavaScript, you'll probably recognize this code:

```
function logExplorer(name, age, occupation) {
  var explorer = {
    name: name,
    age: age,
    occupation: occupation,
    briefed: true,
  };
  return explorer;
}
var explorer = logExplorer('Lena', 32, 'Professor');
console.log(explorer); // { name: 'Lena', age: 32, occupation: 'Professor', briefed: true }
```

That's kind of annoying, right? Having to repeat one's self for each property? Well, good news: you don't have to do that anymore. Observe this code:

```
const logSoldier = (name, age, rank) => {
  const soldier = {
    name,
    age,
    rank,
    enteredShimmer: true,
  }
  return soldier;
}
const soldier = logSoldier('Kane', 34, 'Sergeant');
console.log(soldier); // { name: 'Kane', age: 34, rank: 'Sergeant', enteredShimmer: true }
```

ES2015 parsers are smart enough to look for existing variables that match the properties in the object you're constructing, and fill them in appropriately. This isn't going to save you hundreds of lines of code (probably), but it makes things a little more neat and readable, which helps keep code maintainable.

You have to be careful, though. If there's no matching variable already declared, this can cause a problem. Let's say, for example, we wanted to change `name` to `firstName` in our final object. We can't do this:

```
{
  firstName,
  age,
}
```

... because `firstName` isn't an existing variable. So we still have to write both the key and value in that case, like this:

```
const logPatrol = (name, time) => {
  const patrolRecord = {
    firstName: name,
    time,
  }
  return patrolRecord;
}
const patrol = logPatrol('Josie', '01:00');
console.log(patrol); // { firstName: 'Josie', time: '01:00' }
```

Object shorthand also works well with [variable destructuring](https://closebrace.com/tutorials/2018-02-21/js-quick-hits-5-variable-destructuring), allowing us to just pass the key to, for example, a `forEach` function instead of explicitly having to say `key: value` for each key. Here's an example:

```
const shimmerParty = [
  { name: 'Ventress', speciality: 'psychology' },
  { name: 'Lena', specialty: 'biology' },
  { name: 'Josie', speciality: 'physics' },
  { name: 'Cass', speciality: 'anthropology' },
  { name: 'Anya', speciality: 'medicine' },
];
shimmerParty.forEach(({ name, speciality }) => {
  console.log(`${name} is skilled in ${speciality}.`);
});
// Ventress is skilled in psychology.
// Lena is skilled in biology.
// Josie is skilled in physics.
// Cass is skilled in anthropology.
// Anya is skilled in medicine.
```

Here's the old, redundant ES5 way just for comparison:

```
shimmerParty.forEach(function({ name: name, speciality: speciality }) {
  console.log(name + ' is skilled in ' + speciality + '.');
});
```

As is often the case with ES2015 features, the new syntax reduces code length while simultaneously improving readability. That's the good stuff! I strongly recommend adding object shorthand to your JavaScript toolbox.

Oh, and by the way, if you haven't seen Annihilation yet, I definitely recommend trying to catch it before it leaves theaters. It's not perfect, but it's smart, weird, and gets your heart pounding!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*