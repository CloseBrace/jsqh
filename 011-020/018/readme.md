### JS Quick Hits: Nodelist vs. Array

Video URL: https://youtu.be/gCfx8MVXvDk

A [couple of weeks ago](https://closebrace.com/tutorials/2018-05-09/js-quick-hits-16-dom-query-selectors) we talked about `document.querySelectorAll`, which you can use to select all of the elements in your HTML that match a particular, well, query (typically a classname like `.button` or combination of element and classname, like `a.external`). This produces what's called a nodelist, which as I mentioned in the earlier tutorial, is an array-like type. Here's an example. Let's start with some HTML. Avengers &hellip; assemble!

```
<html>
  <body>
    <div>
      <p id="reminder">Make sure to open your JavaScript console!</p>
      <h3>Avengers</h3>
      <ul>
        <li class="avenger original">Iron Man</li>
        <li class="avenger original">Captain America</li>
        <li class="avenger original">Black Widow</li>
        <li class="avenger original">Thor</li>
        <li class="avenger original">Hulk</li>
        <li class="avenger original">Hawkeye</li>
        <li class="avenger new">Falcon</li>
        <li class="avenger new">Scarlet Witch</li>
        <li class="avenger new">War Machine</li>
        <li class="avenger new">Vision</li>
        <li class="avenger new">Spider-Man</li>
        <li class="avenger deceased">Quicksilver</li>
        <li class="associate">Ant Man</li>
        <li class="associate">Winter Soldier</li>
        <li class="associate">Black Panther</li>
      </ul>
    </div>
  </body>
<script>
</script>
</html>
```

Man &hellp; there are a lot of these people! Anyway, in those script tags, add the following:

```
// Shortcut for QuerySelectorAll
const qsa = (els) => document.querySelectorAll(els);

// First, let's just grab all of the Avengers
const allAvengers = qsa('.avenger');
console.log(allAvengers); // nodelist of 12 li tags
```

The fact that a nodelist is not actually an array can be problematic, because nodelists only support a select few methods, specifically: `item()`, `entries()`, `keys()`, `values()`, and `forEach()`. That's useful, but it'd be nice if we could use, say, `.filter()` on them. Try this code and you'll get an unfortunate error message:

```
const originalAvengers = allAvengers.filter((node) => {
  if (node.classList[1] === 'original') {
    return true;
  }
  return false;
});
```

So, that's a problem. To use array methods, we'll need to convert to an actual array. There's an old ES5 way to do that, which looks like this:

```
var allAvengersArray = Array.prototype.slice.call(allAvengers);
```

But that's kind of tedious, so let's use the ES2015 way instead, like this:

```
const allAvengersArray = Array.from(allAvengers);
```

Once we have that, we can use the array methods we know and love. Let's filter our array down to just the original Avengers, like this:

```
const allAvengersArray = Array.from(allAvengers);
const originalAvengers = allAvengersArray.filter((node) => {
  if (node.classList[1] === 'original') {
    return true;
  }
  return false;
});
console.log(originalAvengers); // Array of 6 li tags
```

We can also use `Array.from()` and our `qsa` function in combination on a single line. Here's an example that generates an array of the names of the Avengers' associates using `Array.map()`:

```
const associatesArray = Array.from(qsa('.associate'));
const associates = associatesArray.map((item) => item.innerHTML);
console.log(associates); // ['Ant Man', 'Winter Soldier','Black Panther']
```

Nodelists are incredibly handy and in a lot of cases, particularly for DOM manipulation, they'll be all you need. On the occasions where you need to write more complex functionality, they easily convert to true JavaScript arrays. Just remember: `Array.from()` is your friend.

See you next week!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*