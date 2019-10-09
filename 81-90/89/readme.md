**JS Quick Hit: A Gentle Introduction to TypeScript - Part 1**

Video URL: https://youtu.be/FuVvvRAjSBQ

If you've been paying attention to the JavaScript community lately, it might seem like it's impossible to find work if you're not a TypeScript expert, and that anyone using plain ol' JavaScript is hopelessly behind. This is false. There are a lot of good reasons NOT to use TypeScript, depending on your project, and there's plenty of work to be found that doesn't require it. That said, Microsoft's static typing language has definitely made significant inroads, especially in the Angular community (though the React community is also getting pretty into it). It wouldn't hurt to have at least a familiarity with it, so for the next few tutorials, we're going to dig into it. I promise to do my best to thoroughly explain what's happening, and to not dump too much on you all at once. Sound good?

I started working with TypeScript last year, because a client of mine wanted me to, though the bulk of their app was written without it. Earlier this year, I took on a new gig where we were starting from scratch, and _everything_ was TypeScript &ndash; front-end and back-end. That was a bit of trial by fire, and I can't claim to have come out of it unburnt. There were days when I absolutely wanted to murder whoever had come up with the language. But by and large, it wasn't that hard to get started with, and now that I'm working on a different, non-TS project, I periodically find myself actually missing aspects of it.

So, what _is_ TypeScript? It's basically an extension of JavaScript that allows for static typing. We haven't really gotten into types and type-checking in this series, but most of you probably know&mdash;even if you don't _know_ you know&mdash;a bunch of basic types. In JavaScript, you have seven "primitives" and then you have objects, which also include arrays, because JavaScript is kind of weird. Anyway, the primitives you're definitely familiar with are: `Undefined`, `Null`, `Boolean` (ie: true or false), `Number`, and `String`. There's also `BigInt`, which allows you to work with larger numbers than `Number` does, and `Symbol`, which guarantees a unique identifier even if you create multiple symbols with the same description. We're not really going to talk about `BigInt` and `Symbol` in this series of tutorials. Maybe some other time!

The issue with JavaScript, which is also one of its _strengths_, is that its variables are weakly-typed. This means you can change the type of a variable, and you can do so relatively easily. Watch:

```
let num = 5;
num = 'Five';
console.log(num);
```

That'll give you `five`, the word, because that's what we changed the variable to. We switch from a `number` type to a `string` type and JavaScript's like &hellip; "hokay!"

Heck, sometimes it even does it for us, like this:

```
const num = 5;
console.log('well, now ' + num + ' is a string');
```

See? You can't add five to a bunch of words, in the mathematical sense, so JavaScript smartly decides that what you're trying to do is stringify the `num` variable and print it out along with the rest of your text. That's actually awesome. Let me repeat that: THAT IS ACTUALLY AWESOME! It's one of JavaScript's many strengths, and attempts to frame it as a weakness are misguided. I've got good news: TypeScript has no issue with that code. You're not actually modifying the variable. The JS engine is just temporarily converting it to a string. Here's where problems can arise:

```
const num = '5';
const addTen = (n) => 10 + n;
console.log(addTen(num));
```

This function adds ten to any number you pass it. The problem is, we were listening to a particularly intriguing podcast and not paying quite enough attention, and we accidentally defined `5` not as a number, but as a string. The result? Our console's going to show `105` instead of `15` because it's encountering both a number and a string and, unsure what to do, is defaulting to the stringification process mentioned above. Now, we could do this:

```
const num = '5';
const addTen = (n) => 10 + parseInt(n, 10);
console.log(addTen(num));
```

Which forces any string coming in to be parsed back into an integer &hellip; but that assumes it _can_ be parsed into an integer. `5` can. `I like chocolate chip cookies` cannot. Your console would log `NaN` for "Not a Number" in that case. Wouldn't it be nice if our code itself could specify "hey, this function parameter needs to be a number!" and throw an error, preferably before we even run it, if we're passing it anything else? Well, that is, in essence, the problem that TypeScript is solving. Here's the TS version of that code:

```
const num = 'I like chocolate chip cookies';
const addTen = (n: number) => 10 + n;
console.log(addTen(num));
```

If we're using an editor with a TypeScript linter (which can be found for almost all of the popular modern editors and is built right in to VS Code), we're going to get an error before we ever run this code, because it will immediately notice that we've specified `n` as a number, but we're passing it a string. If we're _not_ using an editor with a TypeScript linter, well &hellip; we're still going to get an error, but not when we run this code in the browser. That's because we _can't_ run this code in the browser. Or in the Node console. At least, not yet &ndash; I suspect we'll soon see native TS support in a lot of places. For now, though, we need to run the typescript compiler, which will automatically convert our TS file to a JS file. It'll only do that, though, if there are no TypeScript errors. Otherwise, it'll give us a list of problems. Whether in the editor or in the command line, our error looks like this:

```
Argument of type '"I like chocolate chip cookies"' is not assignable to parameter of type 'number'.
```

This is often immensely useful. For a short example like this, maybe not so much &hellip; we can very rapidly see what the issue is and fix it, just by running the script and checking the console. But if we have a thousand lines of code spread throughout our application that all feed different values into that `addTen` function? Now TypeScript's type-checking becomes really valuable. If our code compiles, then we can feel comfortable sending it out into the world, knowing that we're not accidentally producing any `NaN` errors. Or `105` instead of `15` errors, for that matter.

So, that's the absolute basics of type-checking. Next week, we'll look into installing the typescript compiler and we'll get into some other examples of how TypeScript works. See you then!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
