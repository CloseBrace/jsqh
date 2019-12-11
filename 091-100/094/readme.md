**JS Quick Hit: function.call and .apply**

Video URL: https://youtu.be/BYubpRkWhtk

This is another episode in the series-within-a-series that I like to call "Chris made this a JS Quick Hit so he could learn it himself." I've never really needed to use `function.call` or `function.apply`&mdash;or perhaps more accurately, since I didn't know how, I've always found other ways to do what I wanted to do&mdash;so I never learned. Those days are now over, and I hope you'll join me in this new knowledge!

The first thing to mention about these two methods are basically identical except in how they handle parameters. They both exist on the `function` prototype (we discussed prototypes in [JS Quick Hits 22](https://closebrace.com/tutorials/2018-06-20/js-quick-hits-22-prototypes-part-1) and [JS Quick Hits 23](https://closebrace.com/tutorials/2018-06-27/js-quick-hits-23-prototypes-part-2)) which means they're available to all non-arrow functions. I'll explain why in a bit, but first let's worry about what works, not what breaks.

The second thing to know is that both methods allow you to change what `this` represents within the function. The first question you're probably asking is "why would I want to be able to dynamically change what `this` represents in a function?" Good question. The answer is "because it makes doing some stuff easier." One really excellent example is chaining constructors. We talked about those in the same two tutorials I already mentioned. Let's say we've got a frog. All frogs are amphibians, but not all amphibians are frogs (for example, salamanders and caecilians). We can make a generic `Amphibian` constructor like this:

```
function Amphibian(amphKingdom, amphPhylum, amphClass) {
  this.kingdom = amphKingdom;
  this.phylum = amphPhylum;
  this.class = amphClass;
}
```

And then create a `Frog` constructor that `call`s the Amphibian constructor, passing its own `this` value and allowing you to access additional data:

```
function Frog(frogKingdom, frogPhylum, frogClass, frogOrder) {
  Amphibian.call(this, frogKingdom, frogPhylum, frogClass);
  this.order = frogOrder;
  this.hasLegs = true;
}
```

Here's how we use those constructors:

```
const myFrog = new Frog('Animalia', 'Chordata', 'Amphibia', 'Anura');
console.log(myFrog);
```

The output in our console will look like this:

```
Frog {
  kingdom: 'Animalia',
  phylum: 'Chordata',
  class: 'Amphibia',
  order: 'Anura',
  hasLegs: true
}
```

We get everything from the `Amphibian` constructor using one line of code, and then add our specific frog data to it from there. Obviously if we're just handling frogs (uh &hellip; so to speak), we wouldn't really need to do this. But if we needed constructors for each type of amphibian, and especially if we needed them for each type of frog, you could see how this chaining would save a lot of lines of code. Especially if we hard-wired the `kingdom`, `phylum`, and `class` values in the `Amphibian` constructor like we did with `hasLegs` in the `Frog` constructor instead of taking them as parameters. I just did that to show you that, well, you could do that.

Let's talk quickly about the difference between `call` and `apply`. I mentioned before that it's all about how they handle arguments, and indeed, `call` takes arguments one after the other, as we show above, and `apply` takes them as a single array, like this:

```
function Salamander(salKingdom, salPhylum, salClass, salOrder) {
  Amphibian.apply(this, [salKingdom, salPhylum, salClass]);
  this.order = salOrder;
  this.hasLegs = true;
}
const mySal = new Salamander('Animalia', 'Chordata', 'Amphibia', 'Urodela');
console.log(mySal);
```

That's the whole deal. To my knowledge, there's no particular advantage to one or the other, either in terms of speed or in terms of readability. I suppose if you wanted to define your arguments as an array elsewhere and then use them wherever, `apply` might be slightly better for that, although you could just use the spread operator with `call` like this:

```
const args = [arg1, arg2, etc];
function.call(thisArg, ...args);
```

Anyway, use what you like. It's entirely up to you! But there are two "gotchas" you should be aware of. First, if you're not in strict mode and you don't pass a `this` argument, it's going to substitute the global object, which means you can access variables set with `var`, like this:

```
var text = 'This string is on the global object';
function shoutText() {
  console.log(this.text)
}
shoutText.call(); // undefined in node, but displays the string in the browser
```

Second, as mentioned earlier, this stuff doesn't work with arrow functions. They don't have a prototype and you can't inherit methods from a prototype you don't have, so &hellip; no dice. If you want to use `call` or `apply` you'll have to use regular function declarations. Observe!

```
function sayName() {
  console.log(this.name);
}
const sayAge = () => {
  console.log(this.age);
}

const me = { name: 'Chris Buecheler', age: 42 }

sayName.apply(me); // Chris Buecheler
sayAge.apply(me); // undefined
```

Yes, yes, I'm old. Let's finish up laughing at our elders and wrap this thing up. Next week I'm going to give you a few more examples of how you can use `call` and `apply`. Then that'll be it for this topic. I might tackle strict mode after that, and explain what it's all about. Any interest? Just reply and let me know!

See you next week.

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
