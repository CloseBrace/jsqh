### JS Quick Hits: ES2015 Number Improvements Part 2

Video URL: https://youtu.be/191DRL8R4gA

Last week we got started on the new number improvements ES2015 introduces. This week, we're going to follow up with the rest. These are special-case uses that may not come up incredibly often, but it's good to be aware of them just the same.

First, let's talk about floating point math very quickly. Essentially, when dealing with decimal points, computer math in general and JavaScript math in particular can get, well, weird. A super-common example on the web is this code:

```
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false
```

So, yeah, that's frustrating. Because of this inherent limitation, there are a lot of workarounds for dealing with impossibly small fractions. ES2015 introduces `Number.EPSILON` as one of them. Essentially, `Number.EPSILON` produces a ridiculously tiny fraction, `2.220446049250313e-16` &hellip; which equals out to `0.00000000000000022204`. Rather than trying to remember those values, you just use `Number.EPSILON`, and the main purpose is to check and see if a fraction is so small that it's effectively zero. Essentially it's a margin of error. You could use it like this:

```
const testValues = (a, b, c) => {
  const total = a + b - c;
  if (total < Number.EPSILON) {
    return true;
  }
  return false
}
console.log(testValues(0.1, 0.2, 0.3)); // true
```

Floating point math is not going to come up a lot if the data you're working with is mostly things like "how many usernames are in this array?" but if you're trying to do complex charting, or anything relating to graphics, it becomes a much bigger deal.

But let's say you're not into floating point math. Let's say you just want to stick to integers, but you've got all these decimals flying around. Well, `Math.trunc` has got your back, my friend. In ES5, we'd have to write our own function, like this. Once again, I've borrowed these functions from [http://es6-features.org/](http://es6-features.org/).

```
function mathTrunc(x) {
  return (x < 0 ? Math.ceil(x) : Math.floor(x));
}
```

and use it like this:

```
console.log(mathTrunc(4.2576)); // 4
console.log(mathTrunc(-184.6978483)); // -184
console.log(mathTrunc(-0.25238)); // -0  (yes ... negative zero)
```

But we no longer need that function with ES2015. Observe!

```
console.log(Math.trunc(84.27592)); // 84
console.log(Math.trunc(0.987)); // 0
console.log(Math.trunc(-12.8927)) // -12
```

Note that this does not round the decimal, as you can see with 0.987 there above. It just lops the decimal off and gives you the integer. If you want to round, then good ol' `Math.round` is still your best bet.

The last ES6 number addition is `Math.sign`, which returns the sign of a number, meaning if the number is positive, it'll return `1`, if it's negative, it'll return `-1`, and if it's zero it'll return `0` (or `-0` if you happen to feed it a negative zero). It can also return `NaN` if fed that value, but as with `isNaN` from the previous tutorial, you can't use this to check if something's a number or not. It only returns `NaN` if the value is actually `NaN`.

Here's the ES5 function you'd have to write, and a few use cases:

```
function mathSign(x) {
    return ((x === 0 || isNaN(x)) ? x : (x > 0 ? 1 : -1));
}
console.log(mathSign(4.567)); // 1
console.log(mathSign(-5.39378)); // -1
console.log(mathSign(0)); // 0
console.log(mathSign(NaN)); // NaN
```

And here's the ES2015 way to do it. Note that here we're generating `NaN` by trying to divide two strings, which produces `NaN` as a value.

```
console.log(Math.sign(649.478329)); // 1
console.log(Math.sign(-57)); // -1
console.log(Math.sign(0)); // 0
console.log(Math.sign(-0)); // -0
console.log(Math.sign('test' / 'me')); // NaN
```

That's what we've got for numbers in ES2015! Next week, we'll move on to a new topic. I'm writing this tutorial several weeks in advance, so I don't know yet what that topic will be &hellip; but we'll find out soon. Until then!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*