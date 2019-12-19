**JS Quick Hit: Strict Mode Part 1**

Video URL: https://youtu.be/Y0owZB7UYpE

If you've been working in JavaScript for a while, you may have run across third party code that has the following at the top of the file or inside of a function:

```
'use strict';
```

That seems a bit weird, right? We don't normally just have strings floating around in our code, unassigned to any variables. You'd think it would throw a syntax error, and normally it would, but JavaScript engines know to interpret this particular line of code as us telling them to turn on Strict Mode.

So &hellip; what the heck is Strict Mode? Well, it's basically a version of JavaScript that disallows certain shortcuts and fuzzy implementations. Today we're going to talk about how it changes error handling. When using JavaScript, you may have noticed it doesn't always throw errors. In fact, one of my favorite (and by "favorite," I mean "I'm going to tear all of my hair out and scream profanities at my screen") issues with JavaScript is the famous "the code throws no errors, but nothing happens either" result that one often runs into. One of the things Strict Mode does is cause a bunch of these "silent" errors to throw _actual_ errors instead. This has its pros and cons - sometimes it's nice to have your app not die completely due to a minor error. On the other hand, good practice is to handle, or at least attempt to handle, every error &hellip; and if you don't know your app is generating errors it's kind of hard to handle them!

There are a bunch of these, so we're going to run through them relatively quickly. First, if you're in regular mode, and you assign a variable without using the keywords `var`, `let`, or `const`, it'll still work by just assigning the new variable to the global object. So, this works:

```
testVar = 'test';
console.log(testVar); // 'test'
```

In Strict Mode, that code fails and throws an error, because `testVar` has not previously been defined, and the JS engine is no longer allowed to make the assumption that you want it attached to the global object.

Second, there are default objects, variables, and the like in JavaScript that cannot be reassigned, for example `undefined` or `NaN`. In regular mode, attempting to reassign those variables, like this, just fails quietly:

```
undefined = 10;
NaN = 'this is a string, which is technically not a number';
```

You're not rewriting the values of `undefined` and `NaN` there because JS won't let you, but it won't throw an error either, unless you're in Strict Mode.

Third, you can't delete undeletable object properties, including both those the JavaScript engine sets as undeletable by default, and ones you set as undeletable manually. In regular JS, this is another silent fail, but it'll throw an error in Strict Mode:

```
Delete Object.prototype
```

Fourth, you can't have duplicate function parameter names. Observe this code:

```
function logNameAndAge(name, age, name) {
  console.log(name, age);
}
logNameAndAge('Chris', 42, 'Joe');
```

In non-strict mode, JavaScript just takes the value given to the second instance of name, so we get `Joe 42` as our output. However, that first parameter is still technically available via `arguments[0]`, which is kinda fuzzy and not great. I can't think of a situation in which you'd want to have two or more identical parameter names &ndash; seems to me like that'd be a mistake at least 90% of the time (and for the way I code, more like 99.9999%). Strict Mode would throw an error instead of allowing you to do it.

Fifth, Strict Mode forbids adding leading zeros to numbers, because it conflicts with octal syntax. I frankly have never used octals and am not going to talk about them here, at least not right now, but just know that this code will log `13` in regular JavaScript but fail in Strict Mode:

```
const myNum = 015;
console.log(myNum);
```

If you want to use octals in strict mode, you need to preface them with `0o` instead of just a leading zero.

Finally, in both regular and Strict Mode, you can't set properties on primitives. In regular JS it'll fail silently, and in strict mode it will&mdash;you guessed it&mdash;throw an error! So you can't do anything like this:

```
const slogan = 'Why go all the way to Alaska to punch someone when you can punch someone right here?';
slogan.isWeird = true;
console.log(slogan.isWeird);
```

You'll get an error in Strict Mode, and you'll just get `undefined` in regular mode.

So, there you have it &hellip; a bunch of silent failures in regular JavaScript that throw errors when you switch to Strict Mode. Next week, we'll talk about some of the other behavior that Strict Mode forbids.

See you then!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
