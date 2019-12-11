**JS Quick Hit: Event Listeners**

Video URL: https://youtu.be/9RsYVpyHasc

Let's take a break from the deep dives to do a single-episode tutorial. Sound good? We're going to keep it short and sweet this week, and talk about event listeners. This is something that, for a long time, was a "just let jQuery handle it" thing, but as the JS world moves more toward either more complex frameworks, or just using Vanilla JS, understanding how event listeners work can be really useful. We talked about them a bit in JS Quick Hits 17, but this will go into a little more detail.

At their core, event listeners are a way to make your websites react when _stuff happens_. I don't know for sure what the most commonly-used listener is, but I'd be surprised if it wasn't either `click` or `mouseenter`. Those two have been in use on the web basically since JS was invented, and describe two of the most common website interactions that are possible. There are many others built into JavaScript by default. You can also choose to emit your own events, which we'll probably cover in its own tutorial at some point.

For now, let's stick with existing events. Specifically, a click event. Here's some HTML:

```
<html>
  <body>
    <div>
      <p id="reminder">Make sure to open your browser's JavaScript console!</p>
      <button id="btnClickMe">Click Me!</button>
      <div id="divMouseCatch" style="margin: 2em 1em; padding: 1em; background: #DDD; width: 300px; text-align: center;">Mouse Over Me!</div>
    </div>
  </body>
<script>
</script>
</html>
```

All right, we've got a button to click and a div to mouse over. Let's add some listeners so that something happens when we do those things! Between those two script tags, add the following:

```
const gbid = (id) => document.getElementById(id);
const button = gbid('btnClickMe');
const div = gbid('divMouseCatch');
```

Theser are just some helpers so we don't have to keep writing `document.getElementById('btnClickMe')` and so forth every time. Now that we have those helpers, let's use them to create our first listener:

```
button.addEventListener('click', () => {
  console.log('Well clicked, sir or madam!');
});
```

That wasn't too terribly difficult! You can save and refresh, then click the button, to see that this is working. All we're doing is telling our listener "hey, when the button is clicked, run this anonymous function." You can do this as many times as you like &hellip; event listeners stack. Add this code:

```
button.addEventListener('click', () => {
  console.log('One click has generated two messages.');
});
```

Save and reload, and when you click, you'll see that both of your listeners have fired. In general, they'll fire sequentially, in the order that you've defined them in the code, but beware of any anonymous functions that run asynchronous code. As with all async stuff, that'll fire when it's good and ready, and not in any particular order.

Want to use a named function instead of an anonymous one? CAN DO! Check this out:

```
const myFunc = () => {
  console.log('You moused over the box!');
};
div.addEventListener('mouseenter', myFunc);
```

Now every time you mouse over the box, it'll console log that text. That's mildly annoying, though, so let's talk about removing event listeners. You can only do that with named functions. If you use anonymous functions, there's no way to tell the JS engine what to remove! Fortunately, our mouseover function is named (`myFunc`), so we can remove it. We're going to write a function to do that, and I'll explain why in a second:

```
const deactivateBox = () => {
  div.removeEventListener('mouseenter', myFunc);
};
```

So, obviously if we just put that in the code directly it'll remove the event listener before we ever get the chance to trigger it by mousing over the box. Let's call the function _after_ we mouse over once, by changing our `myFunc` function to look like this:

```
const myFunc = () => {
  console.log('You moused over the box!');
  deactivateBox();
};
```

There. Now we'll only get our mouseover text once before the listener is removed. Feel free to refresh and see for yourself!

Finally, it's important to note that event listeners return an `event` object with a TON of details about whatever element was clicked, moused over, etc. This variable is very typically represented as `event`, `evt`, or just `e` in JavaScript code, and you'll see it all over the place. It's immensely useful in a variety of situations. Let's take a quick look at it with the following code:

```
div.addEventListener('click', (event) => {
  console.log('Hey, no one told you to click this!');
  console.log(event);
});
```

Save, refresh, click the box, check your console, and you'll see the event object. You can expand it and look at the wealth of information that's available there. Would you like me to go over some of what's there? Drop me a line and let me know! (you can just reply to this newsletter).

I'm thinking about diving into MongoDB next week. That's not exactly a JS subject, but it's JS-related and will allow me to do some other interesting tutorials. Any interest? Let me know!

Until next week!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*