**JS Quick Hit: Immutable.js Quick Look**

Video URL: https://youtu.be/Nf-DVU39qHc

Now that we've got some understanding of [what immutability is](https://closebrace.com/tutorials/2018-10-03/js-quick-hits-37-immutability-basics) and [how we might want to work with it](https://closebrace.com/tutorials/2018-10-10/js-quick-hits-38-immutable-approaches), let's take a quick look at a third party library that helps ensure you're not mutating any data you don't absolutely want to be. Facebook's Immutable.js is a powerful library that hasn't seen as much adoption as it probably should have. My theory is that this is because the documentation is terrifying, but if you think it's something else, feel free to let me know!

Anyway, terrifying docs aside, it's a really great library with a lot of smart, well-considered features. I could spend the next year's worth of newsletters on Immutable.js alone and probably not cover everything there is to cover, but we're not going to do that. This is a quick look at a single data type that Immutable allows you to work with, the `List`. Let's quote their description, right from the docs:

> Lists are ordered indexed dense collections, much like a JavaScript Array.

Sweet. As we know, arrays in JavaScript are highly prone to mutation, unless you lock them down with `Object.freeze`. A quick-and-easy solution, as we discussed last week, is to clone your data before working on it and then return the clone. A stronger and more reliable approach is to use an immutable list.

Note: for this tutorial we're going to have to use Node.js because we're going to be importing modules. We covered Node.js setup and package management in [tutorial 31](https://closebrace.com/tutorials/2018-08-22/js-quick-hits-31-node-module-1-node-basics) and [tutorial 32](https://closebrace.com/tutorials/2018-08-29/js-quick-hits-32-node-module-2-building-the-module), so I'm going to burn through this one. Create a new folder, create a file named `package.json`, and fill it with this code:

```
{
  "name": "immutable-js-test",
  "version": "0.0.1",
  "description": "A simple test of immutable.js's list datatype",
  "main": "index.js",
  "license": "UNLICENSED",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "immutable": "^3.8.2"
  }
}
```

That's missing some stuff we'd need to publish the repo to NPM, but we're not going to do that, so don't worry about it. Just save the file, and in your terminal or command prompt, run `npm install` in order to snag that immutable module. Once you've done that, create a file called `index.js`, which is where we'll be storing the rest of our code.

All set? Good, let's get started. Here's the starter code for `index.js`:

```
const Immutable = require('immutable');

const tomHardyMovies = Immutable.List(['The Dark Knight Rises', 'Locke', 'Mad Max: Fury Road', 'The Revenant', 'Dunkirk']);
```

I loves me some Tom Hardy! But he's got a new movie out, so let's add it. Below those lines, add this code:

```
tomHardyMovies.push('Venom');
console.log(tomHardyMovies);
```

Think that will work? Well, you can run `npm start` in your terminal or command prompt to find out, but the answer is "Nope!" &ndash; **all** Immutable.js operations return a new version of whatever you're mutating (in this case, a `List`), even ones that you're used to using to mutate data directly. Here's some code that will work:

```
const tomHardyMoviesMutated = tomHardyMovies.push('Venom');
console.log(tomHardyMovies); // Still the same!
console.log(tomHardyMoviesMutated); // There are our changes
```

This is the key thing to understand when working with Immutable.js &hellip; there's always gonna be a return value, and if you're not using it, you're not going to see your changes reflected. Let's try another example, this time direct-mutating an array at a specific index:

```
tomHardyMovies[2] = 'Mad Max: The Wasteland';
console.log(tomHardyMovies) // Nope!
```

Yeah, that's not going to work either. Never mind that we're replacing one of history's greatest action movies with something that hasn't even begun filming yet &hellip; we're still ignoring the rule of "always handle the return value". To set data at a specific array index we use, well, `.set`, like this:

```
const tomHardyMoviesUpdated = tomHardyMoviesMutated.set(2, 'Mad Max: The Wasteland');
console.log(tomHardyMoviesMutated); // Still the same!
console.log(tomHardyMoviesUpdated); // updated list
```

Now, Immutable Lists have more methods than I could possibly cover here. Seriously, [check out the documentation page](https://facebook.github.io/immutable-js/docs/#/List) &hellip; that right-side column is full of them. This is actually a benefit, even if it's a bit intimidating; Lists actually offer even more flexibility and manipulation possibilities than regular JS arrays. They're like a better, stronger version of `Array`. If you're worried about data integrity in your application, Immutable.js is a really solid choice to help in that regard.

So, there you have it. We've dipped our toe into the very large pool that is Immutable.js. Next week, I could move on to a new topic, or I could cover a bit more on this subject. Which is more interesting to you? Reply to this email and let me know!

Catch you next time.

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*