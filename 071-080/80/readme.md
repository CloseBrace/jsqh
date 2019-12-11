**JS Quick Hit: SetTimeout and SetInterval**

Video URL: https://youtu.be/uoBAJj9_ZHQ

This week we're going to take a look at two useful timing methods that are built into JavaScript. The first, `setTimeout`, waits a given amount of time from execution and then does stuff. The second, `setInterval`, does stuff on a regular and recurring timed interval, for example once every second. We've actually used both of these in past JSQH tutorials, but we've never actually covered how they work.

Let's start with the easier one: `setTimeout`. This only executes a single time, so we don't have to worry about things repeating. The function works by taking a callback function (that is: a function to execute once the timer reaches zero), and a timer value. Here's an example using an inline anonymous function:

```
console.log('Hold on a sec.');
setTimeout(() => {
  console.log('Thanks!');
}, 1000);
```

And here's an example using a named function:

```
const twoSecondAlert = () => {
  console.log('We\'re at two seconds!');
}
setTimeout(twoSecondAlert, 2000);
```

So, that's all pretty straightforward, although it's extremely important to understand that `setTimeout` is natively asynchronous. This means that code below it will happily execute long before the code inside the `setTimeout` runs. It is, therefor, not really a good way of pausing your application's operation for a certain amount of time before proceeding. It's also a certified **bad idea** to use it for things like "well it takes about two seconds to get this data from the DB, so just wait two seconds before running code that relies on that data" because that is _super_ fragile code that will break the first time your DB takes a couple of miliseconds too long to respond.

My most common usage of `setTimeout`, these days, is for count-down timers and similar UI displays. When you have a finite amount of time you want to count down, it's the way to go.

Oh, and you can assign a variable to `setTimeout`, which allows us to cancel it. For example, you might want to cancel an impending countdown if a user takes a certain action. Here's code that insta-cancels a `setTimeout`, so it'll never run:

```
const timerOne = setTimeout(() => console.log('Three seconds!'), 3000);
clearTimeout(timerOne);
```

Now let's talk about `setInterval`. This allows us to run code over and over again, in perpetuity, until cancelled, at whatever speed floats our boat. Because `setInterval` runs forever, you're basically always going to want to assign it to a variable so that you can cancel it. Here's an example that just logs "tick" to the console every half second for two seconds (so, four times):

```
let tick = 0;
const timerTwo = setInterval(() => {
    console.log('Tick!');
    tick += 1;
    // This will get rapidly annoying, so kill the timer after two seconds (four ticks);
    if (tick === 4) {
      clearInterval(timerTwo);
    }
}, 500);
```

That's nice enough but it's kind of boring, so let's get crazy. In your HTML, add this code:

```
<div id="wizard" style="font-size: 80px;">🧙‍♂️</div>
```

And in your JavaScript, go with this:

```
let animTick = 0;
let count = 0;
let forward = true;
let wizard = document.getElementById('wizard');

const timerThree = setInterval(() => {
  wizard.style.paddingLeft = count * 5 + 'px';

  // if we're going forward, increment. If not, decrement
  // PS: this is our old friend the ternary operator. See JS Quick Hits 9!
  forward ? count += 1 : count -= 1;

  // Go forward for 20 ticks, then go backward, and repeat
  if (count === 20) {
    forward = false;
  }
  if (count === 0) {
    forward = true;
  }

  // Let's only do this for ten seconds (250 * 40ms)
  animTick += 1;
  if (animTick === 250) {
    clearInterval(timerThree);
  }
}, 40);
```

That's what I'm talking about. Now Gandalf up there looks like he's very slowly dodging orc arrows. Or maybe dancing with Galadriel. This is a pretty half-assed animation, I'll admit, but if you combine `setInterval` with the HTML `canvas` element, you can do some pretty nifty stuff. Maybe someday I'll do a tutorial on that.

In the meantime, we're good to go here. I'll be back next week with more JS Quick Hits. See you then!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
