**JS Quick Hit: Try / Catch / Finally**

Video URL: https://youtu.be/krI4gjA09IE

Let's keep it short and simple this week. Code sometimes generates errors. This is especially true when you're working with XHR or databases, where sometimes it's not even the code generating the error so much as reporting it. Unfortunately, if not properly handled, these errors can be catastrophic and lead to your JavaScript halting, sometimes with my favorite&mdash;and by "favorite" I mean "this is one of the worst things about JavaScript"&mdash;error of all: your code gives you absolutely no error message or other indicator that anything broke; it just doesn't work.

Fortunately, JavaScript has a built-in way of dealing with errors that can make occurrences like that a lot less common. Well-written code anticipates when an operation might throw an error and knows how to deal with it. We do this using `try` and `catch`, and sometimes `finally`. Let's start by creating two simple functions. First, we want one that throws an error. It'll look like this:

```
function throwError() {
  throw new Error('Oh, no, what have you done?!');
}
```

Note that we're using `throw` to intentionally throw an error. This is good coding practice. Well, I mean, writing a function that does nothing but throw an error is not generally good coding practice, but intentionally throwing an error if something has failed rather than just hoping JavaScript will handle it is a good idea. If nothing else, it lets us be sure to use the JavaScript `Error` class, which we're probably going to discuss next week. Now let's also generate a success message with this code:

```
function successResponse() {
  return 'Hey, that worked!';
}
```

Straightforward! All right, the next step is to use this code. We do this in what's called a `try/catch` block, which looks very similar to an `if / else` block. Here's the code:

```
try {
  throwError();
  console.log(successResponse()); // doesn't run
}
catch (error) {
  console.log('The server responded with: ' + error.message);
}
```

Note that, as the comment says, we're not going to see the success response in our console. In a try/catch block, once an error has happened, you move straight to the "catch" part, with the generated error being passed along so you can do something with it.

Now, why use `try / catch`? Well, because if we just went bareback, so to speak, with this code:

```
// note: don't actually put this in your test because of the paragraph below
throwError();
console.log(successResponse);
```

All of our JS, even if there are fifty lines after this, would stop working as soon as that error is thrown. You'd get a console error, but nothing else would run. With `try / catch` you have the opportunity to handle the error yourself and then your code keeps on running. We can prove that because the next block of code we're about to write will actually run, even with the first `try / catch` block still in the file.

This is where `finally` comes in. Sometimes you have stuff you want to have happen even if an error occurs (one example that springs to mind: turning off a loading spinner). As we saw above, anything after `throwError` in the `try` block isn't running. But we can use `finally` to keep on moving. Check out this code:

```
try {
  throwError();
}
catch (error) {
  console.log('Again, the server says: ' + error.message);
}
finally {
  console.log(successResponse()); // this runs!
}
```

Run that, and you'll see that we get both our error logged to the console, and our success response. Sweet!

That's it for this week. Next time, we'll take a look at that `Error` class and talk about why it's useful. See you then!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
