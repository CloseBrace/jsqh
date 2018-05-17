### JS Quick Hits: Document Methods

Video URL: https://youtu.be/r9tW6cR1R1Y

We've got more document methods to cover this week. One of them is old. Real old. Old as &hellip; well, it's been around a long time. The other is newer and is another helpful tool available to those looking to move away from jQuery and work more in Vanilla (ie: plain old no-framework) JavaScript.

First up, we've got `document.getElementById`, which has existed since at least the equivalent of JavaScript's Cretaceous era. You probably know how to use this one, and if you don't, you can probably guess just by the method name, but let's cover it anyway. `document.getElementById` grabs the first element in the DOM that has an ID matching the selector your provide (note: HTML elements should never share IDs, so there shouldn't be any concern about conflicts &ndash; if you have a later element with the same ID, you should rewrite it to use a unique ID and instead share a class with your first element, then use `querySelectorAll`, which [we covered last week](https://closebrace.com/tutorials/2018-05-09/js-quick-hits-16-dom-query-selectors) to snag them both).

Note that unlike `querySelector` and `querySelectorAll`, we don't use identifiers like `#` or `.`, becuse we're not differentiating between IDs and classes. We're only going to be looking at IDs. Here's `document.getElementById` in action, along with some HTML to work with.

```
<html>
  <body>
    <div>
      <p id="reminder">Make sure to open your JavaScript console!</p>
      <button id="btnClickMe">Click Me!</button>
      <button id="btnCancel">Cancel</button>
    </div>
  </body>
<script>

const button = document.getElementById('btnClickMe');
console.log(button); // button element

</script>
</html>
```

This will log the element, showing that yes, we've gained access to it. That's not very interesting, so below the `console.log`, let's add another JavaScript feature: an event listener. Remember `.click()` in jQuery (or the more dynamic-code-friendly `.on('click')`)? We can do that right in Vanilla JS pretty easily. Here's the code

```
button.addEventListener('click', () => {
  console.log('Clicked!');
});
```

This code's pretty straightforward. We're listening for a specific event (`click`), and then passing in an anonymous function as a callback to be executed when that event happens. This function can take an `event` argument, which gives you all kinds of information about the target element and the click event, but that's outside of the scope of this particular tutorial.

As with the query selectors, we can create a shortcut for `document.getElementById` like this:

```
const getById = (el) => document.getElementById(el);
```

And then use the shortcut like this:

```
const cancel = getById('btnCancel');
cancel.addEventListener('click', () => {
  console.log('Canceled!');
});
```

One thing that's important to point out: all of this is only working because our `<script>` tag is below our `<body>` tag. If we move our script into the header, the JavaScript will execute before the DOM has finished loading (go ahead and try it if you like seeing console errors). That's no good when you're trying to work on DOM elements, obviously. jQuery's solution was the venerable `$(document).ready()` &hellip; but we've got Vanilla JS alternatives that'll work all the way back to IE8. If you need to go back further than that, there are workarounds, but they get more complex, and it's plausible at that point that "just use jQuery" might be the most viable solution for your project. The benefits of backwards compatibility might outweigh jQuery's relatively heavy footprint.

Anyway, here's the ES5 way to wait for the DOM to load before executing anything:

```
document.addEventListener("DOMContentLoaded", function() {
  getById('reminder').style.backgroundColor = 'BADA55';
});
```

And here's the even cleaner, easier to read ES2015 version. This should work with any browser that supports ES2015 natively (which is all of the modern ones), and will of course also transpile using something like Babel:

```
onDOMContentLoaded = (() => {
  getById('reminder').style.padding = '10px';
})();
```

That's it for this week!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*