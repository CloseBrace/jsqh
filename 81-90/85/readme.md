**JS Quick Hit: Event Propagation - Cancelling**

Video URL: https://youtu.be/ajMmFUfLkLY

Now that we understand the three phases of event propagation, it's good to know that we can stop them from happening, and how to do that. There are two methods we need to pay attention to. The first is `event.stopPropagation` and the second is `event.stopImmediatePropagation`. They differ slightly in how they work. `stopPropagation` will keep any _following_ handlers from firing, but allows sibling handlers to fire. `stopImmediatePropagation` shuts down siblings, too.

If that's confusing, don't worry, we're going to step through it. Here's a code skeleton:

```
<html>
  <head><title>Click Test 3</title></head>
  <body>
    <div>
      <button id="btnClick">Click Me</button>
      <button id="btnClick2">No, Click Me!</button>
    </div>
  </body>
<script>
document.addEventListener('DOMContentLoaded', () => {
});
</script>
</html>
```

Now let's add some event listeners, but we'll stop event propagataion in the middle. Here's the code:

```
  document.getElementById('btnClick').addEventListener('click', (e) => {
    console.log('button one event one');
    e.stopPropagation();
  });

  document.getElementById('btnClick').addEventListener('click', () => {
    console.log('button one event two');
  });

  document.getElementsByTagName('body')[0].addEventListener('click', () => {
    console.log('body event one');
  });
```

When you run that, you'll see that the second click handler DOES log, but the body handler does not. You'll get this:

```
button one event one
button one event two
```

This is because the second handler is considered a sibling. It's on the same level of the chain, happening during the target phase in this case, so it fires, meanwhile the bubbling phase is canceled entirely. If we want to stop even siblings from firing, we need to use `stopImmediatePropagation`, like this:

```
  document.getElementById('btnClick2').addEventListener('click', (e) => {
    console.log('button two event one');
    e.stopImmediatePropagation();
  });

  document.getElementById('btnClick2').addEventListener('click', () => {
    console.log('button two event two');
  });

  document.getElementsByTagName('body')[0].addEventListener('click', () => {
    console.log('body event two');
  });
```

The only thing that logs there is our first event catcher, because everything, even siblings, has been canceled. So you only get this:

```
button two event one
```

HOWEVER, this only works in one direction. You can't cancel stuff from a previous phase, only in the same phase or phases that follow it. So if, at the bottom, we add this code and set our handler to fire during the capturing phase, it's going to run. Observe:

```
  document.getElementsByTagName('body')[0].addEventListener('click', () => {
    console.log('body event three');
  }, true);
```

This yields the following:

```
body event three
button two event one
```

Because we set that optional boolean to `true`, we're hitting this event in the capturing phase, but our call to `stopImmediatePropagation` doesn't happen until the target phase, so by the time we get there, our handler in the capturing phase has already run. We could, of course, add a `stopImmediatePropagation` or even a regular `stopPropagation` to that final piece of code, and it would stop everything, because both the target and bubbling phases come after capturing.

I said last week that I'd talk a bit about why you might not want to stop event propagation. I feel like these examples have already helped explain it, a bit, but to be specific: because event propagation is a three-phase process, and because event listeners can be defined just about anywhere in your code, it can be very difficult to be 100% certain that, when you stop propagation in one place, you're not canceling out an event listener defined somewhere else. Similarly, it can be difficult to be certain that events set to use the capturing phase won't continue to run, even when you don't want them to. In general, I don't stop propagation unless there's troubling behavior happening due to a handler for a different element. Generally speaking, you can avoid that issue entirely by using IDs and `document.getElementById` instead of relying on methods that generate nodelists, like `document.getElementsByClassName`. By setting handlers to specific IDs, you reduce the odds that they're going to be called unexpectedly, or that other handlers are going to cancel them.

At any rate, there are many valid reasons why you might want to stop propagation either immediately, or at least in the next phase of the process. Now you know how! Go forth and use this information wisely. I'll be back next week with something new. See you then!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
