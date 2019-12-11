**JS Quick Hit: Array.reduce**

Video URL: https://youtu.be/KH9qW2yjcow

This week's tutorial is based on a question from CloseBrace Weekly reader David. Thanks, David! He's using a built-in JS method, `Array.reduce`, to combine the values in an array into a final sum. The thing is: his array doesn't contain numbers, it contains objects, each of which may contain a number that needs to be added. He's using his reducer function to iterate through those objects and, if they have a number, add it to the total, for which he's using the variable name `memo`. Here's his initial code (I made up the array, since I don't have access to his data):

```
var card = [
  { name: 'test 1', hrs: '0' },
  { name: 'test 2', hrs: '12' },
  { name: 'test 3' },
  { name: 'test 4', hrs: '8' },
  { name: 'test 5', hrs: '3' },
  { name: 'test 6', hrs: '22' },
];
var hrsCount = card.reduce(function (memo, Card) {
  if (Card.hrs) {
    return memo + parseInt(Card.hrs);
  } else {
    return memo + 0;
  }
}, 0);
console.log(hrsCount); // 45
```

First things first: this is fine. The code works, it's readable, and it's not overly complicated. For this tutorial, I'm going to reformat it a bit, and I'm going to do so in ES6, although there's no reason that's necessary. I'm just used to writing in it, now, and I like the additional variable checking it provides by default (eg: not being able to overwrite a `const`).

Here's how I'd write that same function:

```
const hrsCount2 = card.reduce((memo, Card) => Card.hrs ? memo + parseInt(Card.hrs) : memo, 0);
console.log(hrsCount2); // 45
```

So &hellip; mine does the same thing and it's substantially shorter, but is it more readable? That's debatable. If you're used to reading ternary operators (which we covered in [JS Quick Hits 9](https://closebrace.com/tutorials/2018-03-21/js-quick-hits-9-ternary-operators)) and implicit returns (which we covered in [JS Quick Hits 12](https://closebrace.com/tutorials/2018-04-11/js-quick-hits-12-arrow-functions-part-1)), then I think this code's a bit more elegant. If you're looking for instant readability, I'd actually stick with David's original, albeit with a couple small tweaks. If you wanted a cross between the two, you could maybe skip the implicit return, like this:

```
const hrsCount3 = card.reduce((memo, Card) => {
  return Card.hrs ? memo + parseInt(Card.hrs) : memo;
}, 0);
console.log(hrsCount3); // 45
```

But let's talk about what I changed, and what I didn't.

The first thing I did was leave all of the variable names alone. I did this because I don't know what the rest of David's application looks like. That said, I find that use of `card` for an array of multiple objects to be a little confusing. I'd probably call it `cards`. Also, I wouldn't capitalize `Card` in my reducer function, because generally capitalized variables are reserved specifically for constructors, rather than for objects. You might create a new `card` object, lowercase, from a `Card` constructor, uppercase, and then store an array of those cards.

The next thing I did was convert to an arrow function, because that allows for an implict return. Following that, I replaced the `if / else` block with a ternary operator, which drops it down to one line, which also allows for the implicit return. What this line says is basically the same thing as the original function: "if the card has hours, add them to the memo and return that value, otherwise just return the memo plus zero more hours" &hellip; except I removed the `+ 0` because `memo + 0` is just `memo`, so there's no need for it.

Important: you need that `0` as a second argument to `Array.reduce`, at the very end of the function. `Array.reduce` takes an initial value as its second argument, so if you replaced that `0` with, say, `15`, your final output would be `60`. If your array was strictly numerical values, you could get away with omitting the zero entirely, because if an initial value argument isn't supplied, `Array.reduce` just uses the first item in the array as the initial value. But our first item is an object, not a number, and adding a number to an object makes no sense, so we provide an initial value that sets `memo` to zero at the beginning of the loop.

If you want to avoid using ES6 and a ternary operator, here's how I'd rewrite David's code (oh, and I'm starting at 15 instead of zero just to show how that works):

```
var hrsCount4 = card.reduce(function (memo, Card) {
  if (Card.hrs) {
    return memo + parseInt(Card.hrs);
  }
  return memo;
}, 15);
console.log(hrsCount4); // 60
```

This eliminates the unnecessary `+ 0` and also skips the else lines. Why? Because your `if` is already triggering a return. So either the function returns at that point and skips the rest of the function, or it moves past the `if` and then just returns the value of the accumulator. This is an *implied else* and is a good pattern to get used to. You'll see it a lot, especially from teams that are using AirBnB's linting rules (which is a *lot* of teams).

So, there you go: a few different flavors of `Array.reduce`, each with their pros and cons. What do you all think? Which style do you prefer? It's important to remember in coding that readability and adhering to your team's style is almost always more important than getting things down to the minimal possible number of lines. After all, we have code minifiers to do that for us. That said, if you can one-line the code and still have it be readable, it's generally a good thing.

That's about it for this tutorial. Thanks again to David for the question, and I'll catch you all next week!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*