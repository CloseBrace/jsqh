**JS Quick Hit: Memoization**

Video URL: https://youtu.be/a3oWbZWklQ8

There are some areas of JavaScript where, to this day, I still find them a bit confusing, even though I understand the basic idea. Recursion is one, and we talked about that in [JS Quick Hits 46](https://closebrace.com/tutorials/2018-12-05/js-quick-hits-46-recursion-demystified) and [JS Quick Hits 47](https://closebrace.com/tutorials/2018-12-12/js-quick-hits-47-recursion-continued). Currying is another, and we'll probably get to that soon. This week, though, we're going to talk about how to speed up potentially slow functions by using memoization to cache results.

At its core, memoization makes a ton of sense. You're basically saying "When I run this function with a specific value passed in as a parameter, check to see if we've already run the function on that exact value in the past, and if so, just return the same result from a cache instead of actually running all of the code necessary to generate the result." Caching is not a concept unique to JavaScript or to functions &ndash; you may have written code that, for example, grabs information from a database and then stores it in a JavaScript array to be referenced later without having to make another DB hit. That's caching. This is the same idea, but we're building it in as part of a function. Let's get started!

The easiest functions to memoize are simple mathematical ones. That's because they can be written as pure functions, which is to say that when given the same input, they will always return the same output. Here's a function to multiply two numbers:

```
const multiply = (x,y) => x * y;
console.log(multiply(8,4)); // 32
```

Every time you pass those two values into the function, it's going to return 32. Now, there's no real value in memoizing this, and I'll explain why in a minute, but we're going to anyway. Here's how we do it:

```
// Memoized function keeps a cache object and updates/references it
const memoMultiply = () => {
  const cache = {};
  return (x,y) => {
    const key = JSON.stringify(x + ',' + y);
    if (key in cache) {
      return 'From Cache! ' + cache[key];
    }
    const val = x * y;
    cache[key] = val;
    return val;
  }
}

// Since memoMultiply returns a function, arguments passed to getNumber get passed to that inner function
const getNumber = memoMultiply();

console.log(getNumber(8,4)); // 32
console.log(getNumber(8,4)); // From Cache! 32
```

This is &hellip; pretty stupid. We've replaced one line of code with twelve in order to get the same result on a mathematical operation that IE 6 on a Windows 95 machine you bought in 1996 could probably run ten million times in a single second. Don't do this. Memoization on simple math functions isn't worth the overhead.

BUT it does illustrate how things work. The function is keeping its own little cache object full of arguments (in this case a string that looks like `8 + 4` and then the value of those numbers multiplied), and checking incoming arguments against that cache to see if it already has a value for it.

Oh, and one last note: you can memoize a function without having to do the whole container function thing. You could just define a `cache` variable outside of a function, and then have that function reference it. Like this:

```
const outerCache = {};
const addOne = (x) => {
  if (x in outerCache) {
    return 'From Cache: ' + outerCache[x];
  }
  const val = x + 1;
  outerCache[x] = val;
  return val;
}
console.log(addOne(24)); // 25
console.log(addOne(24)); // From Cache 25
```

But that gets into keeping track of a bunch of global or at least module-wide variables. It's nicer in most cases to just enclose it.

So, when is memoization actually useful, as opposed to just being an academic exercise built seemingly just to bloat your code? The answer is: when you're going to be doing a lot of redundant mathematical work and want to just skip it and go straight to the values. One of the classic examples of this is factorials. A factorial is when you count down from a given number, multiplying the result by the next number. So the factorial of five is `5 * 4 * 3 * 2 * 1 = 120`. This can get big QUICKLY. For example, the factorial of `8` is `40,320` and the factorial of `100` is `9.332621544 E+157`. Here's some basic factorial code that uses a recursive function:

```
const basicFactorial = (n) => {
  console.log('working on ' + n);
  if (n === 1) { return 1; }
  return n * basicFactorial(n - 1);
}
console.log(basicFactorial(3)); // shows each step to get to 6
console.log('-----------------');
console.log(basicFactorial(3)); // repeats each step to get to 6
```

And here's our memoized version:

```
const memoFactorial = () => {
  const cache = {};
  return (n) => {
    if (n in cache) {
      return cache[n];
    }
    const num = n * basicFactorial(n - 1);
    cache[n] = num;
    return num;
  }
}
const getFactorial = memoFactorial();

console.log(getFactorial(4)); // shows all steps
console.log('-----------------');
console.log(getFactorial(4)); // cached value!
```

This can actually be optimized even more to cache and lookup each individual return, so that doing a factorial of five uses the cached values from four, if you've already done them, but that's beyond the scope of today's tutorial.

A few other things to note: memoization will only work with "pure" functions, meaning ones that, as previously mentioned, always return the same value given the same input, and never have any other side effects. It also doesn't play particularly well with promises or async / await, so sticking to synchronous code is best. On that note: you probably don't need to memoize XHR returns, because the browser already caches those (woohoo!).

Memoization's a bit tricky, especially when you throw function recursion in there. It's most useful when you're dealing with repeated data lookups or other systems in which you're likely to repeat the same functionality regularly. You'll want to be careful with it, since there's always a balance between CPU and memory to pay attention to, but when used properly it can speed up your code.

See you next week!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
