**JS Quick Hit: Recursion Demystified**

Video URL: https://youtu.be/_8ROa4aGHQc

I'm going to let you in on a secret: recursion confuses the heck out of me!

Perhaps this has destroyed your opinion of me. If you thought I was some wise, graybeard guru whose ability to spew forth algorithms on command was surpassed only by his talent for grabbing the perfect pattern on the first try every time, well, uh &hellip; that ain't me! I'm always looking stuff up: syntax, best practices, patterns, consensus approaches to sticky problems and, of course, how to *actually do* certain things.

Recursion is one of those things, in part because I don't need it very often, so it doesn't really stick in my head. In addition to that, it's also just &hellip; tricky. We're going to start very simply, in this tutorial, and then if we need more depth, we'll dive deeper next week.

Recursion is perhaps most useful when performing mathematical tasks (though it's also handy in a variety of other situations), which I think is one of the reasons I and many others have some issues with it. I was always pretty good at math in school, but I never had a genius brain for it, and I still have a bit of that instinctive "oh, God, it's Maaaaaath!" reaction when I lay eyes on it. So, before we get to doing any math, let's just make a simple function that recurses. We're sticking with plain ol' JS syntax for this:

```
function shoutHello(howManyTimes) {
  if (howManyTimes === 0) { return; }
  console.log('Hello!');
  shoutHello(--howManyTimes);
}
shoutHello(5);
```

You'll note that we could easily do this with a `for` loop, but that'd defeat the purpose of explaining recursion. Also, OK, technically there's a tiny bit of math in there, as we're decrementing the value of `howManyTimes` each time we recurse. But that's not, like, *math* math, so we'll ignore it. Do you see how this function works? Let's step through it as it's called:

  1. Is `howManyTimes` equal to zero? If yes, we're done.
  2. If `howManyTimes` is not equal to zero, then shout "Hello!" once
  3. Run `shoutHello` again, but lower the number of times by one.
  4. Go to Step 1

That first check for the value of `howManyTimes` and breaking out of the function if that value is zero is key. Without that, we'd just scream "Hello!" into the void forever, even as the value went into the negatives. That'd be no good, but the check lets us `return` out of the function. This is important for a variety of reasons, not the least of which is "unchecked recursive functions can create infinite loops that suck up RAM and processor cycles like greedy vampires until your Chrome tab first locks up and then crashes." That's bad, for the record.

So &hellip; great. This function is recursive, but it's essentially useless. What if we were to make one that was significantly less useless? That's going to require a bit more math, but stick with me and we'll get through this together.

We're going to create a Fibonnaci Sequence. This is a classic mathematical sequence in which all of the numbers after `0, 1` are the sum of the previous two numbers. So `0 + 1 = 1`, giving us `0, 1, 1`, and then `1 + 1 = 2`, giving us `0, 1, 1, 2`, and then `1 + 2 = 3`, giving us `0, 1, 1, 2, 3` and then&mdash;this is where it starts to really grow&mdash;we have `2 + 3 = 5`, giving us `0, 1, 2, 3, 5`. The next number in the sequence would be `8`, the product of `3 + 5`.

We can use recursion to do this. We're going to use ES6 syntax here just so we can skip the tedium of setting the `count` and `array` parameters and use parameter defaults, which we covered in *[JS Quick Hits 10](https://closebrace.com/tutorials/2018-03-28/js-quick-hits-10-default-parameters)* instead. Watch!

```
const fibonacciArray = (steps, count = 0, array = []) => {
  if (count === steps) { return console.log(array); }
  if (count < 2) {
    array.push(count);
  }
  else {
    array.push(array[count - 1] + array[count - 2]);
  }
  count = count + 1;
  fibonacciArray(steps, count, array);
}
fibonacciArray(12); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
```

All right, a lot to cover here. First, this is not even remotely close to the most elegant solution to a recursive Fibonnaci array, especially because you can't return an actual value without some additional enclosure trickery that we're not going to get into right now. It is, however, both optimized (it only calls itself 12 times) and relatively easy to read.

The only variable we're ever going to pass to this function is `steps`. Specifically, how many steps of the sequence do we want to put into our array? I've chosen twelve because it gives a long enough array to really show that the function is working properly while still staying manageable. Even with super-high values, the function's lightning fast, so that's good. Incidentally, the last value in the sequence that JavaScript can handle is number 1,476. After that the numbers get so large that it just fills the array positions with "infinity" until position 7,037 &hellip; at that point it errors out.

Anyway, step by step, let's do this:

```
  if (count === steps) { return console.log(array); }
```

If `count` has reached the desired number of `steps`, log the array and kill the function.

```
  if (count < 2) {
    array.push(count);
  }
```

If `count` is less than two, just push `count` to the array. This means we will always start with `[0,1]` as array values because, you guessed it, they're less than two.

```
  else {
    array.push(array[count - 1] + array[count - 2]);
  }
```

If `count` is two or more, things get interesting. We take a look at the previous two Array poisitons. Position zero is `0`. Position one is `1`. As is probably obvious, `0 + 1 = 1`, so we're pushing that value to our array. That means when `count` is two, our final array will be `[0,1,1]`. So far, so good.

```
  count = count + 1;
  fibonacciArray(steps, count, array);
```

Increment `count` by one, and run the function again, but this time we're passing it all three values (if you don't understand how `count` and `array` didn't have values the very first time, but do every subsequent time, *reply to this email* and I'll try to help you through it).

`steps` is still twelve (or whatever we set it at when we manually call the function). `count` starts at zero and increments by one each time. The array continually gets new values added to it.

So, the next time we loop through, `count` is at three. The still doesn't match `steps`, which we set to twelve, but it's greater than two, so we go to this block again:

```
  else {
    array.push(array[count - 1] + array[count - 2]);
  }
```

Now, `count` is three, so we're getting array positions two and one. Our array, at the end of the previous cycle, looked like: `[0,1,1]`. So `1 + 1 = 2` and our new array looks like: `[0,1,1,2]`. We then increment `count` to four, and run the function again, which will eventually add the last two array positions and push `3` to the end of the array. This just keeps looping until `count` is twelve, and then our `return` triggers.

So, there you go: a basic introduction to recursive functions. I strongly suggest playing around with that Fibonnaci sequence! For example, try passing an array that already has some numbers in it, and watch as it breaks horribly. How would you fix that problem so that the Fibonnaci sequence just gets added to the end of the array? Send me your solutions! Hint: you only have to change a single line of code to be a little bit smarter.

Bit of a long tutorial this week! This stuff gets complex fast, but there's real value to it beyond just performing amusing math tricks. We're going to get into that next week, when we take a look at recursively iterating over an object. See you then!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*