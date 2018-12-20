**JS Quick Hit: Semicolon Insertion**

Video URL: https://youtu.be/ZdroVZg-x44

Let's talk about a slightly controversial subject: semicolons. As most of you probably know, using semicolons in your JavaScript is optional. Heck, sometimes even braces are optional. For example, there's no functional difference between this code:

```
const a = true
const b = false
if (a || b) console.log('At least one is true') // at least one is true
```

and this code:

```
const c = true;
const d = false;
if (c || d) { console.log('At least one is true'); } // at least one is true
```

For me, I always use the latter style, regardless of how simple the code is or how short the lines are. I'm not going to tell you that you have to, or even should, do the same &hellip; but I am going to tell you my reasons for doing so.

The first is simple readability. I find JavaScript code with semicolons easier to read than JavaScript code without. That goes double if the coder in question is also omitting braces. Especially with current trends favoring short lines of code that get broken up, it's really helpful to have a semicolon telling you "hey, the last three or four lines end here." As an example, let's take a look at some code from my upcoming *[Dead Simple React Native](http://deadsimplereactnative.com)* course.

```
try {
  formattedImage = await ImageManipulator.manipulate(
    initialImage,
    [{ resize: { width: 400, height: 400 } }],
    { base64: false },
  );
}
```

That code spans five lines and includes nested objects within arrays that could easily be expanded to make it total as many as twelve lines. I find having the semicolon at the end of it helpful for assuring me that the block is closed. That's entirely a personal/aesthetic choice. It's just what I prefer.

There's another reason I always use semicolons, though, and this is one that you need to be aware of regardless of your personal preferences. When you write JavaScript without semicolons, the engine that's running your JavaScript (for example, in Chrome, it's Google's V8 engine) decides where to insert them before parsing your code. Leaving things up to the machine is not always the best solution. Let's take a look at why. Here's some example code with semicolons:

```
function createStringVariants(str) {
  return {
    original: str,
    uCase: str.toUpperCase(),
    lCase: str.toLowerCase(),
    reversed: str.split('').reverse().join(''),
  };
}
console.log(createStringVariants('Kill Bill Volume 1')); // object
```

No problems there &hellip; we get the object we're expecting. But let's take a look at some code that superficially seems like it should work in the same way:

```
function getStringInfo(str) {
  return
  {
      length: str.length
  }
}
console.log(getStringInfo('Kill Bill Volume 2')) // undefined
```

Do you see why that function is returning undefined? It's because the JS engine doesn't understand that you want to return the created object. It just sees `return` and a newline, and assumes you want a semicolon in there.

To be fair, this is not a *problem*. If you have `return` on its own line, the JS engine *should* insert a semicolon. That's the expected behavior of sticking `return` on its own line &hellip; it makes the function return. The way to fix the code above is just to move the opening brace of the return object up onto the same line as the `return` statement. Then you'll get what you're expecting, semicolons or not.

Still, as I said earlier, this is something you need to be aware of if you're writing JavaScript, especially if you're doing so without using semicolons. I prefer to handle my own semicolons, rather than relying on the engine to insert them, but whether you do so or not is up to you. Just make sure you're aware of when it's going to happen!

See you next week.

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*