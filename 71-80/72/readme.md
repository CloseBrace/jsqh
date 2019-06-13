**JS Quick Hit: The While Loop**

Video URL: https://youtu.be/IW-JyxP_HsM

Let's talk about a basic loop in JavaScript that many coders almost never use, but which often comes in handy: the `while` loop. This particular feature is very similar to the `for` loop, except best practice is to use that feature for a specific number of iterations, and the `while` loop to run indefinitely until a specific condition is met. Of course, you could very easily make that condition `i === 10` or similar, and then the `while` loop would behave in the same manner as a `for` loop, but in general it's good practice to use `while` when you're not entirely sure when a condition will be met.

A lot of examples of the `while` loop use simple numerical counts as their conditions, but I don't find that very useful because it makes them look and behave too much like `for` loops, so we're going to do something else. Specifically, we're going to get random up in here. So let's start with this code:

```
let i = 1;
while (i !== 10) {
  console.log(i);
  i = Math.floor((Math.random() * 10) + 1);
}
```

This code will just log numbers between one and ten until `i` happens to end up being set to ten. Note that ten itself will not be logged. This is because of the order of operations. When `i` is randomly assigned to ten, it happens _after_ the last `console.log`, and then the next thing that happens is the `while` loop checks the value, sees that it's ten, and ceases to execute. You could put a line immediately below the `while` loop that logs the value of `i` if you want, because `while` is a synchronous loop and pauses all other execution until it finishes (there are ways around that, but they're outside of the scope of this particular tutorial).

If you want to change the order of operations, you can use a `do` block with your `while` loop. The `do` block will run once _before_ the `while` condition is ever checked. That means that this code _will_ log `10`, because the `do` block runs, then the `while` is checked:

```
let a = 10;
do {
    console.log(a);
} while (a !== 10);
```

This would be useful if you were randomly generating a number right from the start, but wanted to log it once even if the number was `10` on the very first generation, like this:

```
let n = Math.floor((Math.random() * 10) + 1);
do {
  console.log(n);
  n = Math.floor((Math.random() * 10) + 1);
} while (n !== 10);
```

Note: that code won't stop after the first ten, either (well, assuming ten is the very first number generated)! Why? Because, again, the order of operations keeps that from happening. `n` is changed to something else before the `while` loop ever checks its value. Of course, that something else might be another `10`, which would kill the loop, but you could end up with several numbers after the first `10` before another one is generated and ends the loop.

Of course, we won't always start with ten if we're using a random number! That first random number might be four, or eight, or one. In those instances, it'll just run until the first ten is generated and then end the loop, so you'll never get `10` printed to the console.

That's about it for `while`. It's a handy piece of code to understand, and becomes very useful in cases where you're not sure how many times you're going to need to iterate. You may not use it all that often, but it's better to know how and not need it, than to need it and not know how!

See you next time.

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
