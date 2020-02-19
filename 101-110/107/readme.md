**JS Quick Hit: The Math Object**

Video URL: https://youtu.be/9X1CVUgmpLU

We've never really talked about `Math` in JavaScript. I don't mean, like, the concept of math in general, I mean the actual `Math` object, which has a wide variety of helpful methods attached to it. We're going to fix that today by covering some of those methods. We're going to generate an array of random numbers, we're going to round some of them up, some of them down, and some of them by the "if it's .5 or above, round up, otherwise round down" approach. Then we're going to find the largest and smallest numbers in the array.

Sound easy? It is! Let's get started generating that data:

```
const numbers = [];
for (let i = 0; i < 20; i += 1) {
  numbers.push(Math.random() * 100); // move the decimal over two places
}
console.log(numbers); // our array. It's ... unwieldy.
```

We're using `Math.random`, which generates a random number between `0` and `1` that looks like this: `0.22146250137046364`. Not so useful if we're going to be rounding, right? Every number would either round to zero or one. Well, that's OK, because as you can see, we make an adjustment, multiplying the numbers by 100 in order to give you something like `22.146250137046364` instead. Now rounding makes a lot more sense!

First let's manually round the first number _up_ regardless of whether the decimal is below `.5` or not. Then we'll manually round the second number _down_, again regardless of what the decimal is. Here's how:

```
numbers[0] = Math.ceil(numbers[0]);
numbers[1] = Math.floor(numbers[1]);
console.log(numbers); // the first two numbers are now integers
```

That's kind of tedious so let's just iterate over the whole array and let `Math` handle it, by using the `round` method, which will round up if the decimal is `.5` or higher, and round down if it's below that. Here we go:

```
const numbersCleaned = numbers.map(num => Math.round(num));
console.log(numbersCleaned); // that's better
```

As you can see, running integers (which is what we've turned our first two items into) through Math.round does nothing to them, so we didn't even need to write a check for that in our code. This would be true even if, by extreme luck, you managed to randomly generate an integer, for example, if `Math.random` initially gave you 0.63000000000000000, which is technically possible although not particularly probable.

Cool, so now we have an array full of integers. That's nice and clean. Let's find the largest and smallest ones. Again, we'll lean on `Math` here, and again it'll be easy to do. Here's the code:

```
console.log('Smallest: ' + Math.min(...numbersCleaned));
console.log('Biggest: ' + Math.max(...numbersCleaned));
```

One thing to note, here: `Math.min` and `Math.max` do not take arrays as arguments. They instead take as many numbers as you want to give them, _each_ passed as an argument. Fortunately, we can just use the spread operator (see [JS Quick Hits 8](https://closebrace.com/tutorials/2018-03-14/js-quick-hits-8-the-spread-operator)) to easily convert our array into a list of values passed as arguments. Hooray, ES2015!

And there we go. Short, simple tutorial this week, but sometimes that's a nice thing! There are several more `Math` methods, but they tend to be more specialized. Sines and Cosines, powers, absolute numbers &hellip; useful for sure, but I suspect they're not as relevant to most CloseBrace supporters. If I'm wrong, and you'd like to see a tutorial on those, don't hesitate to ask!

Catch you next week.

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
