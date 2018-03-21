### JS Quick Hits: Ternary Operators

Video version: https://youtu.be/7mdWtrcAbQI

The ternary operator is not a new JavaScript feature (nor is it unique to JavaScript &ndash; it's an old programming concept). It is, however, immensely helpful in a wide variety of situations. Whether you're working exclusively in Vanilla JS, or live in frameworks like React and Angular, it'll come in handy on a frequent basis.

So let's talk about how to use it. The basic gist is: the ternary operator evaluates a statement and, if it's true, does one thing, but if it's false, does another. It's written in this format:

```
somethingToEvaluate() ? doIfTrue() : doIfFalse();
```

It's kind of interesting, because it's really almost a sentence, especially with that question mark. "Is this thing true? If so, do one thing. If not, do another."

So let's take a look at a practical example, which does everything in-line with no function calls:

```
const person = 'Perseus';
person === 'Medusa' ? console.log('Yep, Medusa!') : console.log(`Nope, not Medusa. That's ${person}.`); // Nope, not Medusa. That's Perseus.

const person2 = 'Medusa';
person2 === 'Medusa' ? console.log('Yep, Medusa!') : console.log(`Nope, not Medusa. That's ${person2}.`); // Yep, Medusa!
```

So, obviously in the real world you'd refactor that code so the ternary operator's within a function that can take a name, rather than re-writing the the ternary operator each time, but for now we're being hyper-explicit to show how this stuff works.

You don't have to in-line the functionality like we're doing above. You can call functions in a ternary operator, which allows you to perform much more complex actions without having to stuff 'em all in there. Here's an example:

```
const logArray = (arr) => {
  for (val of arr) {
    console.log(val);
  }
}
const demiGods = ['Achilles', 'Dionysus', 'Heracles', 'Perseus'];

Array.isArray(demiGods) ? logArray(demiGods) : console.log('Not an array'); // Achilles, Dionysus, Heracles, Perseus
```

You also don't *have* to do stuff in both cases. Let's say you want to do something if the statement is true, but just not do anything if it's false (this happens a lot in React). Just return null, like this:

```
const demiGod = 'Achilles';
Array.isArray(demiGod) ? logArray(demiGod) : null // does nothing!
```

Want to use complex evaluations in ternaries? No problem! They behave in the same way that `if` statements do, like this:

```
// use it with "and"
demiGods[1] === 'Dionysus' && demiGods[3] === 'Perseus' ? console.log(true) : console.log(false); // true
// use it with "or"
demiGods[0] === 'Achilles' || demiGods[3] === 'Medusa' ? console.log(true) : console.log(false); // true
```

Curious about why this shows up so often in React? It's because JSX has some limitations about doing things on multiple lines, so ternaries, which allow for single-line logic, become super valuable. This code won't work if you just stick it in a browser console, because we're out of the React environment, but for those of you familiar with React components, here's a simple example:

```
const createList = (arr) => {
  return arr.map(item => (<li>{item}</li>));
}
// and then, in your render block
<ul>
  { demiGods.length > 0 ? createList(demiGods) : <li>No Items Found</li> }
</ul>
```

Man, I love React! But we're getting off topic, so let's wrap things up. Ternary operators are fanstic single-line solutions to quick true/false evaluations. If all you're doing is simple evaluation, they often replace the need for an `if / else` block entirely, which saves lines of code and keeps things readable. I definitely recommend adding them to your toolkit.

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*