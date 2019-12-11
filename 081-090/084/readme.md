**JS Quick Hit: Event Propagation - Target and Bubbling**

Video URL: https://youtu.be/CKUpdcJYXn8

Last week we talked about event propagation in general, and the capturing phase in specific. As a quick reminder, during the capturing phase, the browser moves downward from the HTML element to the lowest element on which the event occured (in our example, the button element on which we clicked). You can catch events during this phase, but only by setting an optional third parameter in your event handler to `true`. Most of the time, you won't need to do this when handling events. In fact, I've written tens of thousands of lines of JavaScript code over the last decade, and never once needed it. But it's still good to know how, in case you do!

Today we're going to talk about the other two phases of event propagation, target and capturing. These go in order, so we'll start with target. As you might expect, this is the point of event propagation where the browser goes "OK, we're on the element where the event actually occurred."

Let me clarify that a little. When you click on a button on a web page, you're technically clicking on multiple elements. As we showed last week, the `html` element contains the `body` element, which contained a `div` element, which contained a `button` element, on which we clicked. There are actually two levels above `html` as well: `window` and `document`. Window's not technically a DOM element but it's the top-level JavaScript object which contains everything, including `document`, which is kind of obviously the top of the Document Object Model, aka the DOM. Technically we clicked on _all_ of those elements at the same time &hellip; but it's pretty clear to our delicious human brains that what we meant to click on was the button. The browser's smart enough to know that, too, which is why the `event` object passed to your listeners, even in the capturing phase, has a `target` value.

The target _phase_ is just a point at which all of the event listeners you've registered for the target element fire. This happens before bubbling starts, which is important from a sequence standpoint. It means that, unless you're using the capturing phase boolean mentioned above, the event handlers for your target are always going to fire before any other handlers. This is generally useful, because it means predictable behavior. It also means you can stop propagation before other handlers fire, if you want. More on that later. Right now, let's take a look at how the target phase works. Here's a skeleton for your code:

```
<html>
  <head><title>Click Test 2</title></head>
  <body>
    <div>
      <button id="btnClick">Click Me</button>
    </div>
  </body>
<script>

document.addEventListener('DOMContentLoaded', () => {
});

</script>
</html>
```

Inside that `DOMContentLoaded` block, add the following three event listeners:

```
  document.getElementById('btnClick').addEventListener('click', () => {
    console.log('button click handler one');
  });

  document.getElementsByTagName('body')[0].addEventListener('click', () => {
    console.log('body click handler');
  });

  document.getElementById('btnClick').addEventListener('click', () => {
    console.log('button click handler two');
  });
```

Order of operations would suggest you're going to get button one, body, and button two, in that order, when you click the button &hellip; but we know that's not the case because of how the phases work. Go ahead and try, and you'll see this in your console:

```
button click handler one
button click handler two
body click handler
```

As you can see, both of the handlers on our target are being called first. Which is exactly what we expected. Hooray!

The bubbling phase is the third and final phase that happens when an event occurs. In this phase, the browser works its way back up from the target to the top level of the document, calling handlers in that order. We can show this easily enough by adding another handler at the bottom of our block, like this:

```
  document.getElementsByTagName('div')[0].addEventListener('click', () => {
    console.log('div click handler');
  });
```

Our console output now? It looks like this:

```
button click handler one
button click handler two
div click handler
body click handler
```

The `div` handler gets called first, even though it comes last in the code, because we're working backwards from the target to the top of the DOM.

Now that we understand the three phases of event propagation, there's one more thing to discuss: stopping that propagation. We're going to handle that next week, because there's more to it than a single simple command, including reasons why you might want to avoid doing it. See you then!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
