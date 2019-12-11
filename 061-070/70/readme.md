**JS Quick Hit: Local Storage**

Video URL: https://youtu.be/NFqeGLDnj-I

Back in [JS Quick Hits 66](https://closebrace.com/tutorials/2019-05-02/js-quick-hits-66-mmmm-cookies), we talked about using cookies to store bits of data in a user's browser (we didn't talk about how you can use cookies to communicate with the server, but we'll probably get to that someday!). Today we're going to look at a different, and arguably better, approach. All modern browsers support something called Local Storage, which basically allows you to store key/value pairs for future reference. Note that these keys and values are _always strings_ so if you want to store Arrays, objects, or numbers, you'll need to do some conversion. We'll get to that.

Local Storage differs from cookies in a few key ways. For one thing, local storage doesn't expire. It's there until you remove it or the user clears their storage data. For another thing, cookies are limited to 4 KB of data, while Local Storage can be as large as 5 MB per domain. That's orders of magnitude more data, and while in most cases I don't advocate storing anywhere near that much, the ability to go over 4 KB certainly has its uses. For example, the Markdown editor I use to write these newsletters, [Dillinger](https://dillinger.io), is an online app that keeps all of your documents in local storage, meaning that as long as you're accessing them with the same browser, they don't disappear between sessions.

We're not going to build a markdown editor in this tutorial, but we are going to show how to do basic CRUD (create, read, update, delete) actions using simple JavaScript.

JavaScript handles local storage using the `localStorage` method attached to JavaScript's native `window` object. This means technically when you call it, you're calling `window.localStorage` but JavaScript lets you use `window` properties without explicitly typing out the object each time. Hooray!

OK, let's establish some data:

```
const eightiesMoviesThatHoldUp = [
    'Aliens',
    'Big Trouble in Little China',
    'Ghostbusters',
    'Labyrinth',
    'Mad Max Beyond Thunderdome',
    'The Goonies',
    'The Lost Boys',
];
const yearSelected = 1986;
const movieSelected = 'Aliens';
```

With those established, let's set some localStorage values with this code:
```
localStorage.setItem('moviesArray', eightiesMoviesThatHoldUp);
localStorage.setItem('movie', movieSelected);
localStorage.setItem('year', yearSelected);
```

You'll note we're not converting those variables to strings here. That's because the `localStorage` method is smart enough to do it for us. We will, however, have to convert once we get the data back. Let's do that. Here's the code:

```
const moviesArray = localStorage.getItem('moviesArray');
const movie = localStorage.getItem('movie');
const year = localStorage.getItem('year');
```

and let's go ahead and log those without conversion:

```
console.log(moviesArray);
console.log(movie);
console.log(year);
```

As you can see, they're all strings, including the array. That's not particularly handy if we want to work with the array or the number, but fortunately we can use some built-in methods to parse them. Like this:

```
console.log(moviesArray.split(','));
console.log(movie);
console.log(parseInt(year, 10));
```

Want to update an item? Just overwrite it, like this:

```
localStorage.setItem('movie', 'Labyrinth');
const newMovie = localStorage.getItem('movie');
console.log(newMovie); // Labyrinth
```

Need to remove an item from local storage? Just use the `removeItem` method. Observe:

```
localStorage.removeItem('moviesArray');
const newMoviesArray = localStorage.getItem('moviesArray');
console.log(newMoviesArray); // null
```

And finally, want to clear our the entire set of items stored for the particular domain the script is running on? There's a command for that, too:

```
localStorage.clear();

const finalMoviesArray = localStorage.getItem('moviesArray');
const finalMovie = localStorage.getItem('movie');
const finalYear = localStorage.getItem('year');

console.log(finalMoviesArray);
console.log(finalMovie);
console.log(finalYear);
```

As you can see, local storage is really straightforward and easy to work with in modern browsers. In general, I prefer it to cookies for storing client-side data. Your mileage may vary, but it's definitely a tool worth adding to your tool kit, or belt, or closet piled half full of miscellaneous junk, or wherever you keep your tools!

See you next time.

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._