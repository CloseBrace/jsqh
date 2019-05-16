**JS Quick Hit: The Error Constructor**

Video URL: https://youtu.be/d6CWTidOAv4

Today we're going to look at JavaScript's built-in `Error` constructor. In any website or application that uses JavaScript, you're likely to encounter times when you want to throw an Error. I like to use the `Error` constructor in all instances because it provides a reliable and consistent way to report errors, which means you can write code that always expects certain conditions. Unless, of course, you're using third-party modules in which case things are somewhat out of your control &hellip; but it's still generally a good idea to use it in your own code!

You create a new error object with the following syntax:

```
const error = new Error('An error message goes here');
```

You actually don't need the `new` because the Error constructor will also behave as a function and return the new object, but I prefer using the `new` keyword so that it's clear you're creating a new child object. Do what you like! The important thing is to note that the object that's generated contains three properties: `Error.prototype.constructor`, `Error.prototype.message`, and `Error.prototype.name`. You don't need to worry about the first one, `constructor`, right now, because it's mainly important for creating custom error types, which we're not going to talk about until next week. `message` is probably the most important property, since it's the one you're most likely to display. `name` can also be useful in many circumstances.

Oh, by the way, some browsers include other properties on `Error` objects, such as `error.fileName` (the file where the error occurred) or `error.stack` (the stack trace). These can be very useful, but are outside the scope of this tutorial.

Let's create, throw, and inspect a simple error. Here's the code:

```
try {
  throw new Error('You done screwed up, buddy!');
}
catch (error) {
  console.log('name: ' + error.name);
  console.log('message: ' + error.message);
  console.log('constructor: ', error.constructor);
}
```

As you can see if you run this code, our `name` is "Error", our `message` is "You done screwed up, buddy!", and our constructor is pointing to JavaScript's native `Error` function. As mentioned, the message is generally the most useful part of the error, since it's theoretically telling you went wrong. For example, a much more useful message might be something like "No data was returned from the remote resource" when an XHR call fails. It's really up to you how specific you want to make your error messages.

Now, having a name of "Error" isn't terribly useful, which is why we don't pay much attention to it, but JavaScript comes with several built-in, more-specific error constructors which make the name property more significant and useful. For example, if you're asking the user for a value within a range (let's say zero to five hundred) and they give you six hundred and forty, you could throw a range error. Observe!

```
try {
  throw new RangeError('Value was not within expected parameters.');
}
catch (error) {
  console.log('name: ' + error.name);
  console.log('message: ' + error.message);
}
```

Run this code and, as you can see, the `name` value is no longer "Error" but instead "RangeError", which could be useful either to display directly to the user, or to run some logic against in order to modify your error message in some way. Let's quickly go through the other built-in error types:

* **EvalError** - used if an exception is generated when evaluating a function using the global `eval` object (don't know what that means? Drop me a line, maybe I'll do a tutorial on it!)
* **ReferenceError** - Used to indicate that a nonexistent variable was referenced. JavaScript throws this type of error by default when you reference a variable you never declared.
* **SyntaxError** - Used to indicate broken code. JavaScript throws this type of error when what you coded doesn't match up with the expected syntax of the language.
* **TypeError** - Used when a variable or parameter is not a valid type. JavaScript throws this type of error when, for example, you try to use an object property as a function when it's not a function.
* **URIError** - Used when trying to parse a malformed URI, or using a global URI function incorrectly. JavaScript throws this type of error when you pass it a URI it can't decode.

Here's some simple code to show off a TypeError:

```
try {
  const myObj = {
    myString: 'test',
  }
  console.log(myObj.myString());
} catch (error) {
  console.log(error instanceof TypeError); // true
  console.log(error.name); // "SyntaxError"
  console.log(error.message); // "myObj.myString is not a function"
}
```

You'll note that `myString` is, perhaps unsurprisingly, a string. Trying to use it as a function causes a predictable error, which we catch and then log.

I'll be honest: it's pretty rare that I use any of these. If I encounter them, it's mainly because I screwed something up and the JS engine itself is throwing them. For back-end and front-end work, I typically just stick with `new Error` and a useful message. Sometimes, though, it'd be really useful for the object to contain additional information or functionality. In those instances, we can create a custom error &hellip; which we'll do next week.

See you then!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._