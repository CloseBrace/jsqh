### JS Quick Hits: ES2015 Number Improvements Part 1

Video URL: https://youtu.be/YCdJA3BmdkA

Last week we talked about strings, this week we're talking about numbers. ES2015 introduces a bunch of improved ways to deal with numbers, and today we're going to cover three of them: `Number.isNaN`, `Number.isFinite`, and `Number.isSafeInteger`. If you do a lot of math-based JavaScript (working with graphics, for example), these can come in handy. I can't show you built-in ES5 versions, because they literally don't exist. You have to write your own functions. I'm borrowing the ones that the folks at http://es6-features.org already created. Here they are:

```
function isNaN(n) {
  return n !== n;
};
function isFinite(n) {
  return (typeof n === 'number' && !isNaN(n) && n !== Infinity && n !== -Infinity);
};
function isSafeInteger(n) {
    return (
           typeof n === 'number'
        && Math.round(n) === n
        && -(Math.pow(2, 53) - 1) <= n
        && n <= (Math.pow(2, 53) - 1)
    );
}
```

Let's talk about `isNaN` first. The first thing we need to note is that this does *not* check to see whether something's a number or not. For example, you can feed a string to `isNaN` and it'll still give you `false`. The only thing it's checking for is if the actual value is `NaN`. Here's how we use it with the ES5 functiona above:

```
console.log(isNaN(245)); // false
console.log(isNaN(NaN)); // true
```

But we can also use the ES2015 version, which *doesn't require us to write any functions*. It's the same basic approach:

```
console.log(Number.isNaN(494)); // false
console.log(Number.isNaN(NaN)); // true
```

Next up we've got `isFinite`. This checks to see if a value is, well, finite or not. JavaScript has a built in `Infinity` value (and a `-Infinity` value as well) which we can use to check against. Here it is using our ES5 function:

```
console.log(isFinite(12345)); // true
console.log(isFinite(Infinity)); // false
```

And our ES2015 version:

```
console.log(Number.isFinite(189563)); // true
console.log(Number.isFinite(-Infinity)); // false
```

The last thing we need to talk about is integer safety. Without going into a massive explanation, it's important to know a couple of things. The first is that JavaScript handles all numbers as floating point numbers, even integers. The second is that because of this there are upper and lower bounds on integers JavaScript can represent without the potential that two integers may be represented in the same way. Dr. Axel Rauschmayer [does a great job on his blog](http://2ality.com/2013/10/safe-integers.html) of explaining all the nuances for people who want to get into the math, but what it comes down to is that these two expressions:

```
Math.pow(2, 53)
Math.pow(2, 53)+1
```

Both produce this output:

```
9007199254740992
```

That's &hellip; alarming. So if you're doing math-intensive coding, you want to check and make sure your large numbers are safe to operate on (and that the results are also safe). That's where `isSafeInteger` comes in. Here's the ES5 version, which again, requires you to include the functions we defined above:

```
console.log(isSafeInteger(234)); // true
console.log(isSafeInteger(16837568937201847)); // false
```

and here's the ES2015 version, which does not require any custom functions on your part:

```
console.log(Number.isSafeInteger(125)); // true
console.log(Number.isSafeInteger(18594048328495704)); // false
```

You may be wondering how to work on larger numbers than that in JavaScript. The answer is, as is so often the case: "use a third party library."

Next week we'll talk about the other new ways to manipulate numbers that ES2015 introduced. See you then!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*