**JS Quick Hit: A Gentle Introduction to TypeScript - Part 2**

Video URL: https://youtu.be/_MFbwFFkSqU

Last week we talked about what TypeScript is and how it works. During that tutorial, we mentioned that it's a compiled language, meaning you can't just load up a `.ts` file in the browser and expect it to work. No, instead you'll need to install a global module that allows you to both check your TypeScript files for errors, and compile them down to plain ol' JavaScript. We're going to do that today, and then experiment some more with how TypeScript works. You're going to need [Node.js](https://nodejs.org/) installed for this tutorial. The latest long-term stable version will do fine, which as of right now is `10.16.3`. If you're unfamiliar with Node.js and want a primer, I humbly suggest checking out [JS Quick Hits 31](https://closebrace.com/tutorials/2018-08-22/js-quick-hits-31-node-module-1-node-basics).

All good? Let's get TypeScript installed. Head to a terminal window or command prompt and type the following:

```
npm install -g typescript
```

Let that do its thing and &hellip; you're done. You have everything you need to compile TypeScript files. Of course, there are all kinds of ways to integrate TypeScript with Webpack or other bundlers, but that's outside of the scope of this tutorial. For now we're just going to manually run the compiler each time, and then run our JS files in the node console to see their output. On that note, let's create a new TypeScript file called, I don't know &hellip; `example.ts`. Creative, I know.

Last week we showed how it might be beneficial to use TypeScript to specify that a function parameter was supposed to be a number to avoid any `NaN` issues. We're going to build on that a bit today by showing some other types you can use, and talk about what TypeScript is doing for us. With that in mind, let's start with some sample data. How about Manchester Orchestra albums?

```
const albums = [
  { title: 'I’m Like a Virgin Losing a Child', year: 2006, isLongTitle: true },
  { title: 'Mean Everything to Nothing', year: 2009, isLongTitle: true },
  { title: 'Simple Math', year: 2011, isLongTitle: false },
  { title: 'Cope', year: 2014, isLongTitle: false, },
  { title: 'A Black Mile to the Surface', year: 2017, isLongTitle: 'true' },
];
```

Yes, I know that last boolean is a string. We'll get to that! For now, let's just do something with the data, like this:

```
const logEvenYears = (title: string, year: number) => {
  if (year % 2 === 0) {
    console.log(`${title} (${year})`);
  }
};
albums.forEach(album => logEvenYears(album.title, album.year));
```

The nice thing about TypeScript is that the vast majority of it just looks like (and is) regular JavaScript. That's why Microsoft calls it a "typed superset of JavaScript" rather than a brand new language. Everything you're used to doing in JavaScript will work as expected &hellip; you just might need to write some type definitions to help it along.

OK, so that's great, but we want to actually run this code. To do that, we switch back to our terminal or command prompt and run the compiler with this command:

```
tsc example.ts
```

This'll take a second, and it will generate a second file, `example.js`, in the same folder. I'm not going to show you what the compiled output looks like every time, but let's look at it now:

```
var albums = [
    { title: 'I’m Like a Virgin Losing a Child', year: 2006 },
    { title: 'Mean Everything to Nothing', year: 2009 },
    { title: 'Simple Math', year: 2011 },
    { title: 'Cope', year: 2014 },
    { title: 'A Black Mile to the Surface', year: 2017 },
];
var logEvenYears = function (title, year) {
    if (year % 2 === 0) {
        console.log(title + " (" + year + ")");
    }
};
albums.forEach(function (album) { return logEvenYears(album.title, album.year); });
```

One thing you'll note here, beyond that it converted all our newer ES syntax back down to ES5 (aka: Vanilla JS), is that it is _not doing any type checking_. There's no `if (typeof title === 'string')` happening. TypeScript does not add type checking to your finished JS. Instead, it does type-checking at compile time, so it doesn't _need_ to add type checking to the result. It already knows that everything we're passing to `logEvenYears` has the correct types.

This means if we're working with outside data, we'll still need to do additional work to make sure that we're not trying to manipulate a string as if it were a number (or similar). TypeScript does provide some tools to help with that, but there are limits to what it can do with data it can't actually see. So, sorry, you're still going to have to follow good practices when you code! This isn't a get out of jail free card.

Let's run that code. Type the following:

```
node example.js
```

You should see the following output:

```
I’m Like a Virgin Losing a Child (2006)
Cope (2014)
```

Let's create a TypeScript error so we can see the output when the compile fails. Back in `example.ts`, and **make sure you're working in the `.ts` file, not `example.js`**, below everything you've written so far, add this:

```
const logLongTitles = (title: string, isLongTitle: boolean) => {
  if (isLongTitle) {
    console.log(title);
  }
}
albums.forEach(album => logLongTitles(album.title, album.isLongTitle));
```

Go ahead and try recompiling with `tsc example.ts` and you'll get the following error

```
example.ts:21:52 - error TS2345: Argument of type 'string | boolean' is not assignable to parameter of type 'boolean'.
  Type 'string' is not assignable to type 'boolean'.

21 albums.forEach(album => logLongTitles(album.title, album.isLongTitle));
```

Note: TypeScript will _still compile your code_. This is a bit of a double-edged sword. Your `example.js` file now has the new, potentially broken code. You can configure TypeScript not to output code if there are errors, and for any app that was actually headed to a production environment I'd probably recommend that, but for now it doesn't really matter. Let's just fix that one boolean that's a string, changing it from `'true'` to `true`, and then re-run `tsc example.ts`. No errors this time, and we can run `node example.js` to see our new output, which, with both functions running correctly, looks like this:

```
I’m Like a Virgin Losing a Child (2006)
Cope (2014)
I’m Like a Virgin Losing a Child
Mean Everything to Nothing
A Black Mile to the Surface
```

So, cool. Still a lot to cover, although this series isn't going to get too complex. I promised you a gentle introduction, after all. Next week we'll look at specifying multiple possible types for a variable, and depending on how long that runs, we might jump into increased complexity by taking a look at interfaces.

See you then!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
