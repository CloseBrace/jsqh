**JS Quick Hit: Call and Apply Part 2**

Video URL: https://youtu.be/FR-U2XniyAM

Last week we talked about how `function.call` and `function.apply` work, and used them to do some interesting stuff, including chaining constructors. Today we're going to take a quick look at a few more use cases. Reminder that `call` and `apply` are basically the same except `call` takes a `this` argument followed by as many other arguments as you want to give it, where `apply` takes a `this` argument and then a single _array_ of other arguments. We're just going to work with `call` for examples, because I find the syntax a little less obtuse.

First, let's define some data that we'll be using:

```
const youtubeMusicians = [
  { name: 'Rob Scallon', instrument: 'guitar', vocalist: false },
  { name: 'Davie504', instrument: 'bass', vocalist: false },
  { name: 'Andrew Huang', instrument: 'everything', vocalist: true },
  { name: 'Mary Spender', instrument: 'guitar', vocalist: true },
  { name: 'Adam Nealy', instrument: 'bass', vocalist: false },
];
```

I could go on &hellip; YouTube is a _fantastic_ place for following musicians. But that seems like plenty.

One of the simplest ways in which to use `call` and `apply` is to specify a specific `this` value for an existing function. This is very similar to what we were doing with constructor stringing in the last tutorial, but not quite as complex. We're basically just replacing an argument like, say, `data` with the function's `this` property instead. Observe!

```
function introduceMusician() {
  console.log(`Introducing ${this.name}, who plays ${this.instrument} and is ${this.vocalist ? '' : 'not '}a vocalist.`);
}

introduceMusician(youtubeMusicians[1]); // broken!
introduceMusician.call(youtubeMusicians[3]); // works!
```

Note that this only works with traditional function declarations and not arrow functions, because the latter don't have a `this` value to which you can assign things.

Generally speaking, I &hellip; don't see a ton of use for this approach if you're just using plain objects like we are, but in certain cases it can be handy, for example if you're passing a large class that already has a lot of things attached to its own `this` property.

Another thing we can do with `call` and `apply` is use them to invoke an inline anonymous function, even one that has its own values attached to the `this` property. This one's weird, but we'll talk through it. Here's the code:

```
for (let i = 0; i < youtubeMusicians.length; i += 1) {
  (function() {
    this.nameTheSingers = function() {
      if(this.vocalist) { console.log(`${this.name} sure can sing!`)}
    }
    this.nameTheSingers();
  }).call(youtubeMusicians[i]);
}
```

This is a bit of a convoluted example, but we're running a loop and, within that loop, defining an anonymous constructor function, giving it a `nameTheSingers` method, and then immediately using that method. _However_, none of this would run without the `.call` because in each loop we'd just define the function, but never actually execute it, so `this.nameTheSingers` will never get run without `.call` (also we'd have no value for `this.vocalist` and `this.name`). This is, again, kind of a weird use case but in a scenario in which you need a temporary, anonymous function with a lot of methods, it can be very handy.

That's all I've got for this week! Keeping the "quick" in Quick Hits this time around. Next week, we're going to take a look at maps, which are like objects &hellip; but different.

See you then!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
