**JS Quick Hit: Event Propagation - Capturing**

Video URL: https://youtu.be/BEtgP9uhFtc

I have a confession to make: the main reason I decided to write this tutorial is because I've been working lightly with JavaScript since its earliest days, extensively with it for about twelve years, and principally as a JS programmer for at least the last eight years &hellip; and I really had no idea how event propagation works. So, I figured it was time to learn, and time to teach any of you who're in the same boat!

Let's talk about event listeners (or handlers). We covered how to write one in [JS Quick Hits 57](https://closebrace.com/tutorials/2019-02-27/js-quick-hits-57-event-listeners), and it's very possible to go for years, as I have, without really knowing more than that. You write a handler, it handles the event, and all's well. Still, I really, _really_ don't like existing in a "I know it works but I don't know _how_ it works" state, so let's fix that.

When you generate an event on an element&mdash;for our examples we're going to use clicking on it, which generates the unsurprisingly-named "click" event&mdash;you actually generate that event on every single container element. So let's say you've got this simple HTML:

```
<html>
  <head><title>Click Test</title></head>
  <body>
    <div>
      <button id="btnClick">Click Me</button>
    </div>
  </body>
</html>
```

If you click on that button, the click event will also propagate to the parent `div`, the `body`, and the entire `html` document, because all of those tags contain the button (note: the event will not be propagated to the `head` or `title` tags, because although they're contained in `html`, they do _not_ contain the button. You work from the button up, and don't go back down in other branches of the DOM tree).

The reason JavaScript does this is because it allows you to assign event handlers to every level of the tree. You can catch the click on the button _and_ the click on the body, and do different things with them. Let's add some JS to the code above:

```
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btnClick').addEventListener('click', (e) => {
    console.log('button clicked!');
  })

  document.getElementsByTagName('body')[0].addEventListener('click', (e) => {
    console.log('body clicked!');
  });
});
```

So, the first thing we're doing is waiting for the DOM to be fully loaded, since it's hard to assign event listeners to elements that haven't been created yet! Then we assign event listeners to the button, and to the body. If you click the button, both events fire, because of event propagation. If you click outside of the button, you just get the body event. We could assign a handler for the `div` tag, too, but I think you get the idea.

So, how does all this work? Well, it's a multi-phase process. Today we're going to cover the first phase, and then we're going to cover the other two next week. There are three total phases of event propagation: capturing, target, and bubbling. Each phase is different, and each phase can be leveraged depending on what you're trying to do with your event listeners.

Capturing comes first, although when you write event listeners like the ones we wrote before, you're basically ignoring this phase. During the capturing phase, the JavaScript engine starts at the top element, so in this case our `html` tag, and works its way down, producing a tree like this:

```
html, body, div, button
```

Observant readers may've noticed that when did our click test, the button click was logged _before_ the body click. That seems weird, right, since the body element is actually captured before the button? That's because there's a secret third parameter in event listeners. Normally we just write them like this:

```
addEventListener('click', callbackFunction);
```

The optional third parameter is a boolean and if it's not provided, it defaults to false. If we intentionally set it to true, however, that tells the event listener to fire during the capturing phase. In fact, let's go ahead and do that with the `body` listener we already defined, like this:

```
  document.getElementsByTagName('body')[0].addEventListener('click', (e) => {
    console.log('body clicked!');
  }, true);
```

If we run this code again, and click our button again, we'll see that the `body` event is logged first, this time. That's because the listener is running during the capturing phase which, again, starts at the top layer and moves deeper until it reaches the lowest element on which the click occurred.

Hey, see that `e` variable we're passing to our callback function? We do that because the event handler always kicks back an `event` object. Let's log the one in the body handler for right now. Add this line below the existing `console.log`:

```
console.log(e);
```

If you expand that object, you'll notice that it has an absolute ass-ton of information about the click event. Covering all of it is way outside of the scope of this tutorial, but there are several pieces of information that change as the event moves through its phases (though it should be noted, due to the way the timing works, we're always logging the completed event here, which means, for example, the `eventPhase` property is alwas going to be zero - we'll discuss that more when we handle the other phases).

All right, so that's event capturing. We'll build off what we started here next time. See you then!


_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
