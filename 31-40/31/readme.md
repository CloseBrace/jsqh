**JS Quick Hit: Node.js Basics**

Video URL: https://youtu.be/abAoT0wpjl4

We're trying something different with the next couple of tutorials. We're going to build a Node module from scratch, package it up, and release it on NPM. Well, I'll do the releasing. You all can just follow along. Before we start building, though, we're going to quickly talk about the basics of Node.js. If you don't have Node.js installed, you can grab the latest version for your operating system at [Nodejs.org](http://nodejs.org). I recommend the "long term stable" version, because if you're just getting started, you're not going to need any of the bleeding-edge features that the "current" version offers. Trust me, Node 8.11.x is awesome, and does everything you'll need.

So, what is Node? It's a platform on which you can run applications written in JavaScript. It's not a "server" exactly. It's lower level than that. You can write servers for Node, such as the web server Express.js, but you don't have to do anything relating to HTTP when using Node. You can access the file system, you can write simple helper utilities, you can do all kinds of things.

Another thing you can do with Node is use it to parse JavaScript in your command prompt or terminal window. So, assuming you have Node installed, head for one of those, and just type `Node` (and hit enter). You'll be left with an unassuming, and possibly uninspiring, prompt:

```
>
```

You can think of this a lot like your browser's console. It will take in JS commands and execute them, while also logging the response given by the JavaScript parser. That means if you type the following:

```
const myArray = [5, 9, 1, 4, 6, 8, 7, 2, 0, 3];
```

You'll get a response of `undefined`. Don't worry, that's expected, and it doesn't mean your array isn't defined. It just means that the response the parser returned is `undefined`. That's fine. We're not expecting a return when we create an Array. Just to be safe, though, let's show that our array exists:

```
console.log(myArray);
```

This will get us the following:

```
[ 5, 9, 1, 4, 6, 8, 7, 2, 0, 3 ]
undefined
```

Which, again, makes sense. `console.log` is writing out the values of our array, and it's also returning `undefined` because the `log` method on JavaScript's native `console` object does not return anything.

Let's create a function that DOES return something. We'll use `Array.sort` from [last week](https://closebrace.com/tutorials/2018-08-16/js-quick-hits-30-array-sort). Node is smart enough to know that hitting enter after an open brace means "I'm still working on the function," so it'll allow you to write multiple lines and then automatically finish up when you add the close brace at the end (returning another `undefined` at that point). Here's the code:

```
const sortArray = (data) => {
  const clone = [...data];
  return(clone.sort());
}
```

And here's how to we use it:

```
sortArray(myArray); // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

Note that this actually returns something, specifically our sorted array! But if we re-log our original array, like this:

```
console.log(myArray);
```

We still get the original unsorted values, because we cloned the array in our function rather than manipulating it directly. We also, of course, get an `undefined` because, again, the Node console always shows the return value of any command you execute, even if the command does not return anything.

So, that's the basics of Node.js. It parses JavaScript. That's it! But that's a lot &hellip; we can use it to write back-end code in JavaScript, instead of having to learn C++, or C#, or Java, or similar. It's immensely handy, and there's a massive ecosystem that's grown up around it.

Oh, and you don't have to use the console. The code we'll be writing will live in `.js` files just like on the front-end, and it'll be accessible and usable whether you're calling it from a Node application or from the browser. Handy, right?

In the next tutorial, we'll begin our module. We're going to stay simple and write a utility that takes in an arbitrary JSON string of key/value pairs, converts it to an array of objects, and sorts the array by key name. This is so straightforward that it doesn't really *need* to be a node module if you're just writing a one-off project (you'd just inline the code), but if it was something you needed to do regularly across multiple applications, it could be handy to have. See you then!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*