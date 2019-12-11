# Example for Tutorial 19

## Installation:

1. Clone the repo
2. In your terminal or command prompt, cd to the `19` folder
3. Type `npm install` and hit enter
4. Wait for it to do its thing
5. Type `npm start` and hit enter
6. Navigate to `localhost:3000` in your browser
7. Open your JS console to see results

## Experimenting for yourself

All JS files are found in `/public/javascripts`. The only file loaded by the HTML is `main.js`. The other files contain exports.

## Tutorial

Video URL: https://youtu.be/Cc2o55i8E7U

*Quick Note: this tutorial's a bit complex due to filesystem issues in JavaScript. I strongly recommend watching the video and checking out the repo, as mentioned below.*

For many years, modularizing one's JavaScript code was a huge pain in the ass. There were various approaches one could take, including using PERL scripts to concatenate multiple individual JS files into a single big file, or writing your code as a plug-in for jQuery, or just including a bunch of files with script tags and allowing them to talk to each other via global variables &hellip; which is a terrible idea for a lot of reasons, so please don't do that.

Solutions such as CommonJS (still heavily used in Node development) and Require.js&mdash;a library that works similarly to CommonJS but uses the "AMD", or Asynchronous Module Definition, spec for improved performance&mdash;helped a lot, but they either only worked in specialized environments, or required a third party library to work in the browser.

ES2015 introduced a solution that's built into the language itself: `import` and `export`. These two little commands end up being supremely useful, especially if you're working a lot in the NPM ecosystem, which you probably are if you use Node.js, React, Angular, or Vue.

At their core, `import` and `export` are pretty straightforward. You can export values, functions, or classes from one file for use in another. Here's a simple, two-file example:

**helpers.js**
```
export const greetPerson = (name) => {
  return `Hello, ${name}!`;
}
```

**main.js**
```
import { greetPerson } from './helpers.js';

const people = ['John', 'Paul', 'George', 'Ringo'];
people.forEach((name) => {
  console.log(greetPerson(name));
});
```

If you build these files and try to run them, you're going to have a bad time. Why? Because you'll run into a `CORS` error prohibiting you from loading modules directly from the filesystem. You need to be running them from an actual web server. My approach for testing is to spin up a simple [Express](https://expressjs.com) server, but that's outside of the scope of this tutorial.

HOWEVER, I've gone ahead and done that for this tutorial's entry in the repo ... so if you want to see this code running, just clone the repo, `cd` to this lesson's directory, and type `npm install` and `npm start` to run the web server. If you don't have Node.js installed, well ... check out my *[Dead-Simple Step-By-Step Guide for Front-End Developers to Getting Up and Running With Node.JS, Express, and MongoDB](https://closebrace.com/tutorials/2017-03-02/the-dead-simple-step-by-step-guide-for-front-end-developers-to-getting-up-and-running-with-nodejs-express-and-mongodb)*.

Let's talk about other ways `import` and `export` can work. For starters, you can import a whole file like this:

**main.js**
```
import * as babies from 'babies.js';
```

That's pulling in the entire file and assigning it to an object. Be aware, however, that this will also **execute any code that is executable** in this file. It works like a `<script>` tag in HTML. So if your file starts with `console.log('I like punching babies!');` and you import that file, your console's going to tell the world all about your baby-punching habit!

`Export` also allows us to set a default. This can be useful if your file is mainly one large class, as is often the case in React development, but also has a few miscellaneous exports that aren't always needed. Let's add more code to `helpers.js` like this:

**helpers.js**
```
export default (names) => {
  return names.map((name) => name.toUpperCase());
}
```

Note that we're not giving this function a name. That's because it's the default, and we're going to name it when we import it, like this:

**main.js**
```
import shoutNames from './helpers.js';
```

and then use it like this:

**main.js**
```
const shoutedPeople = shoutNames(people);
shoutedPeople.forEach((name) => {
  console.log(name);
});
```

Note that we do *not* have curly braces around `shoutNames` when importing it. That's because we're importing the default export. The curly braces are only used for non-defaults, because they're quietly using our old friend variable destructuring, which we covered in [JS Quick Hits 5](https://closebrace.com/tutorials/2018-02-21/js-quick-hits-5-variable-destructuring). Speaking of which, let's add another export to `helpers.js` ... this time let's do a variable instead of a function. At the bottom of the file, we'll add this:

**helpers.js**
```
export const stones = ['Mick', 'Keith', 'Charlie', 'Ronnie'];
```

Then we can adjust the first line of `main.js`, which currently looks like this:

**main.js**
```
import { greetPerson } from './helpers.js';
```

and change it to this:

**main.js**
```
import { greetPerson, stones } from './helpers.js';
```

Now we have access to both of those variables, thanks to destructuring. So down at the bottom of the file, let's `console.log` our latest list of dinosaur rockers, like this:

**main.js**
```
console.log(stones);
```

The last thing we need to cover is aliases. Let's say you want to import a function, but you don't want to use that function's name in your own code, perhaps because it conflicts with another function you imported from a different file or library. That's a bummer, but the folks behind ES2015 have got you covered. In fact, we already used an alias up above in conjuction with `*`, but there's no reason you can't use them in the other examples, either, like this:

**main.js**
```
// default
import shoutNames as nameShouter from './helpers.js';

// destructured function
import { stones as rollingStones } from './helpers.js';

// destructured with one aliased, one not
import { greetPerson as sayHello, stones } from './helpers.js';

// default with alias AND destructured with alias AND destructured without
import shoutNames as nameShouter, { greetPerson as sayHello, stones} from './helpers.js';
```

One final thing to note: while you can use imports at load time like we're doing here, I don't recommend it for large projects, as it's not the most optimized way to do things. Get a bundler like Gulp or Webpack instead, and let it crunch you up a single minified JS file from all the different files you've produced (curious how you'd do something like that? You might want to check out my [*Five Minute React* course](https://closebrace.com/categories/five-minute-react).

ES2015's `import` and `export` commands are really handy, especially when building complex webapps with lots of moving parts. Even if you're writing a relatively simple site and want to stick with Vanilla JS, they can still facilitate clean code separation, which makes things a lot easier to read.

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*