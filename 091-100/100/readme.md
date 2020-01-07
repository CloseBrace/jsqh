**JS Quick Hit: Strict Mode Part 2**

Video URL: https://youtu.be/Wr38CwAIqA0

Last week we talked about silent errors that Strict Mode turns into loud errors. This week, we're going to talk about some things it disables or otherwise alters in order to improve JavaScript performance.

It's the holiday season and everyone has last minute shopping to do, so let's dive right in and do this one quickly! First off, Strict Mode forbids the use of `with` entirely. This code won't work:

```
let output;
const x = 5;
with(Math) {
    output = floor(random() * (x) + 1);
}
console.log(output);
```

See how `with` is allowing you to use `Math` properties without specifying `Math` every time? That's neat, but it's problematic. This is because when you reference a variable within `with`, it's impossible for JavaScript to know if that variable is a property on the object you're passing to `with`, a variable inside the scope of what you're running, or possibly even a global variable. So it has to wait until the code executes to figure that out, slowing things down.

You probably don't use `with` a lot&mdash;I don't&mdash;so losing it's not a huge deal. If you have a super long object name you don't want to keep referencing, instead of using `with`, consider temporarily mapping the object to a very short variable name and using that for ease of use. So `thisObjectNameIsReallyWayTooLong.print()` becomes `z.print()` or similar.

The next thing to be aware of is that, in Strict Mode, `eval` will not introduce new variables into the surrounding scope. To understand what this means, you first need to understand `eval`, which just takes an arbitrary string and, well, _evaluates_ it as JavaScript code. Here's an example:

```
var y = 10;
console.log(eval("var y = 32; y;")); // 32
console.log(y); // 10 (strict) or 32 (non-strict);
```

As you can see, we define `y` as 10, and then immediately overwrite it with `eval`, causing it to log `32` twice &hellip; in regular mode. In strict mode, we get `32` the first time, but because `eval` is no longer allowed to define or overwrite variables outside of its own scope, our exterior `y` variable remains `10`.

Side note: this is one of many good reason to use `let` and `const` instead of `var` &hellip; they behave like strict mode whether it's on or not, so you're always going to get `32` and `10` even if you don't have strict mode on, if you change that code to use `let`.

Last thing, for now: Strict Mode forbids deleting plain names. This specifically means names you've assigned to things, ie: variables. You can't do it in regular mode either, but it doesn't throw an error (this probably should've gone in last week's tutorial). So in regular JS you can do this:

```
const tempVariable = 10;
console.log('I only need tempVariable for this one line. The value is: ' + tempVariable);
delete tempVariable; // throws error in strict mode
console.log(tempVariable); // 10 in regular mode
```

In strict mode, as our comments mention, no dice. Why does `delete` not work in either case? Because `delete` is not used for this type of memory management. It's strictly for removing properties from objects. Don't use it like this, because it won't work! If you want to free up a variable for garbage collection, set it to `null`.

That's it for this tutorial, and for 2019. Thanks, everyone. See you in 2020!

Chris Buecheler | [@closebracejs](https://twitter.com/closebracejs)
Founder, [CloseBrace.com](https://closebrace.com)

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
