**JS Quick Hit: Node File System Part 1**

Video URL: https://youtu.be/_cwRg2bw6uw

A few people replied to the last *question of the week* saying that, yes, they'd be interested in doing a bit of a dive into Node's `fs` module, which allows you to interact with files on your local machine. So, let's do that! Today we're going to talk about the basics and then read a couple of files. Next time, we'll look at writing files and maybe some other utilities.

As you may have noticed, it's somewhere between difficult and impossible to work with the local machine's file system through the browser using JavaScript. This is a *good thing* because a world wide web on which any website could nuke your entire hard drive, if it felt like it, would prrrrobably not have been very popular.

Node's not a website, though. It's an application platform that runs locally, and that means it *can* access your file system, if you want it to. That's really useful, especially if you're interested in using Node to write little utility apps. Let's say you wanted to open a CSV file, read it, convert it to JSON, and save the resulting output to disk. Well, we can do that very easily. And we're going to over the next two tutorials!

To run this tutorial we'll need to set up a node instance. We've done that before in *[JS Quick Hits 32](https://closebrace.com/tutorials/2018-08-29/js-quick-hits-32-node-module-2-building-the-module)*, so here's the "quick hits" version! First, you'll need the following for `package.json`:

```
{
  "name": "fs-test-1",
  "version": "0.0.1",
  "description": "A simple test of node's built-in filesystem, part one",
  "main": "index.js",
  "license": "UNLICENSED",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "csvtojson": "^2.0.8"
  }
}
```

Once you have that, make sure to run `npm install` in your terminal or command prompt in order to get that `csvtojson` module, which we'll be using to, wait for it &hellip; convert CSV to JSON.

Once that's done, you'll need these two example data files. First we've got `authors.csv`, which highlights a few horror authors (and also Anne Rice, who is debatably not a horror author). Why? Because I like horror novels, and&mdash;shameless self-promotion alert&mdash;sometimes write and publish them! Anyway, here's `authors.csv`:

```
firstname,lastname,age,examplework
Stephen,King,71,The Stand
Clive,Barker,66,Hellraiser
Dean,Koontz,73,Watchers
Anne,Rice,77,Interview with the Vampire
Ania,Ahlborn,Unknown,Seed
Mylo,Carbia,47,Violets are Red
```

And we'll need a second file, `example.txt`, which just contains a short sentence for us to ingest. Here's the entire file:

```
This is an example of a simple text file, which can be read and parsed by Node.js
```

Try to contain your excitement. Now that we've got those files in place, create one called `index.js` and we can get started. First we'll need to import our modules. `fs` is a part of Node, but you still have to `require` it. Then we also need `csvtojson`. Here are the lines:

```
const fs = require('fs');
const csv = require('csvtojson');
```

OK, secret fact about `csvtojson`: it can actually read files directly without you having to manually use `fs`. It just uses `fs` internally. But this isn't a tutorial about `csvtojson`, so we're doing it manually. Here's the code to grab our author data synchronously, and then convert it to a string:

```
const rawData = fs.readFileSync('authors.csv');
const authorData = rawData.toString();
console.log(authorData);
```

If we switch to our terminal or command prompt and run `node index.js`, that gives us a big blob of CSV data as a string in our console. That's nice, but we're looking for JSON, so let's do the conversion. Note that the following is an asynchronous function, so if your code needed to wait on this result, you'd want to wrap the whole thing in an `async` function so you could use `await`. We're not worried about that here, so let's keep it simple, like this:

```
csv()
.fromString(authorData)
.then((authorJson) => {
    console.log(authorJson) // a big ol' array of author objects
});
```

There we go! We've read a file from the file system, and converted it to JSON. Next week we'll talk about saving that JSON. But before we go, you should know that `fs` can also read files asynchronously and then act on them with a callback. Let's read and then log our example text file, using this code:

```
fs.readFile('example.txt', (err, data) => {
  if (err) {
    return console.log(err);
  }
  const str = data.toString();
  console.log(str);
});
```

See how that works? It reads the file and, when it's done, runs the callback, which is the anonymous function we pass as the second argument. The one that takes `err` and `data` as arguments. This is a super-common pattern, although it's slowly being replaced by `async/await`, which is a nice way to avoid callback hell. We covered `async/await` in *[JS Quick Hits 15](https://closebrace.com/tutorials/2018-05-02/js-quick-hits-15-async-await)*

That's it for this week. See you next week, which happens to be "Black Friday" in the US &ndash; the day after Thanksgiving, when all of the stores start their sales and a crush of humanity descends upon them in a truly magnificent display of capitalist frenzy. But don't worry, JS Quick Hits will be here! In case you want to avoid being trampled by a desperate parent hoping to get whatever this year's version of a Furby is, you can hang out and learn more about the Node file system instead.

See you then.

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*