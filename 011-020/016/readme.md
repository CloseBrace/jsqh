### JS Quick Hits: Query Selectors

Video Url: https://youtu.be/ngCv-HHu0tU

After last week's marathon tutorial, I thought we'd do something a little shorter and simpler. We're going to talk about query selectors that allow you to target specific DOM elements. If you come from a jQuery background, you are no doubt very familiar with its venerable `$` selector. Does this code look familiar to you?

```
$('#myDiv').show();
```

Oh yeah! I lived in code like that for years. These days I mostly work with frameworks like React, but sometimes&mdash;for example when I'm writing JavaScript for CloseBrace.com&mdash;I still write non-framework code. I don't use jQuery anymore for a variety of reasons, and instead use "Vanilla JS" (which just means plain ol' JS). In recent years new methods have been introduced that make this a lot easier, and today we're going to talk about two of them. `document.querySelector` and `document.querySelectorAll`.

For this tutorial, we're going to need some HTML, so here it is:

```
<html>
  <body>
    <div>
      <p id="reminder">Make sure to open your JavaScript console!</p>
      <p class="item odd special">Special Item 1</p>
      <p class="item">Regular Item 1</p>
      <p class="item odd last">Regular Item 2</p>
    </div>
  </body>
<script>
</script>
</html>
```

Now between those script tags, let's start doin' stuff! `document.querySelector` grabs the first instance of whatever matches the query, so let's get that special paragraph, since there's only one of them.

```
const specialItem = document.querySelector('.special');
console.log(specialItem);
```

When you console log that it'll log what looks like a string of HTML ... but that's not really what you're capturing. What you get is the DOM element, which can be manipulated, like this:

```
specialItem.style.backgroundColor = '#BADA55';
```

You don't have to use classes. You can also use IDs, like this:

```
const reminderGraf = document.querySelector('#reminder');
reminderGraf.style.fontStyle = 'italic';
```

Let's say we wanted to grab all of the `item` paragraphs. We'd use `document.querySelectorAll` like this:

```
const allItems = document.querySelectorAll('.item');
console.log(allItems);
```

That'll log the whole `nodelist`, which is an array-like type in JavaScript, which means a lot of the stuff we can do with arrays, we can also do with nodelists. Using `forEach`, for example, like this:

```
allItems.forEach((item) => {
  item.innerHTML += ' - additional description'
  item.style.backgroundColor = '#F3F3F3';
  item.style.padding = '10px';
})
```

Oh, if you're doing this all on one page, you'll note that this overrides the color setting on the special item, because it happens later in the code.

Missing jQuery and don't feel like typing out those long commands every time? Just create helper variables at the beginning of your code, and use 'em as much as you want. There are two ways to assign them to shorter variables. You can either use bind, like this:

```
const qs = document.querySelector.bind(document);
const lastGraf = qs('.last');
lastGraf.style.fontWeight = '600';
```

Or create a function, like this:

```
const qsa = (els) => document.querySelectorAll(els);
const oddGrafs = qsa('.odd');
oddGrafs.forEach((item) => {
  item.style.textTransform = 'uppercase';
});
```

That's about it for this week! Next time, we'll talk about some more document methods that help make jQuery less necessary.

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*