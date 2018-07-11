### JS Quick Hits: Array.forEach()

Video URL: https://youtu.be/JE77_Jr1w5c

Let's keep it short this week and talk about `Array.forEach()`. This is a handy method that allows you to iterate over an array and do things with the value found at each array position. Now, we can also do this with a good old `for` loop, but `forEach` can be a bit cleaner and nicer to use, especially when working with large datasets. It also has some built-in benefits. Let's start by establishing an array:

```
const incredibles = ['Mr. Incredible', 'Elastigirl', 'Violet', 'Dash', 'Jack-Jack'];
```

First off, let's iterate over the array with a `for` loop:

```
for (let i = 0; i < incredibles.length; i++) {
  console.log(incredibles[i]);
} // Mr. Incredible Elastigirl Violet Dash Jack-Jack
```

No surprises there. Let's take a look at the `forEach` version of the same code:

```
incredibles.forEach((name) => {
  console.log(name);
}); // Mr. Incredible Elastigirl Violet Dash Jack-Jack
```

Same exact output. Maybe it's because I've spent a lot of time using arrow functions, but I find that code to be more concise and more readable. I like not having to think about what index I'm on, and I like not having to refer back to the initial array like `incredibles[i]`.

It's important to note that `Array.forEach` is not a one-to-one analog for a `for` loop, though. It differs in one important aspect, which is how it handles arrays that have an empty value somewhere in them. Specifically, it ignores them. The `for` loop does not. Here's an example of one such array:

```
const villains = ['Syndrome', 'Mirage', 'Bomb Voyage', ,'The Underminer', 'Screenslaver'];
```

And here's our `for` loop:

```
for (let i = 0; i < villains.length; i++) {
  console.log(villains[i]);
} // Syndrome Mirage Bomb Voyage undefined The Underminer Screenslaver
```

As you can see, we're getting an "undefined" at position 3. That's fine, and may actually even be valuable to you depending on what you're trying to do with your code. In many situations, though, we'd rather just skip right over that blank value and keep on going. `Array.forEach` lets us do that. Here's the example:

```
villains.forEach((name) => {
  console.log(name);
}) // Syndrome Mirage Bomb Voyage The Underminer Screenslaver
```

No undefined &hellip; just a complete blank. It still keeps track of the index, though, should you want or need to use it. Just pass a second parameter to your anonymous function, like this:

```
villains.forEach((name, index) => {
  console.log(index, name);
}); // 0 "Syndrome" 1 "Mirage" 2 "Bomb Voyage" 4 "The Underminer" 5 "Screenslaver"
```

Note that position three is skipped entirely, and the indices continue to line up as expected.

One other thing you may have heard about `Array.forEach` is "don't use it." The reason for this is because it is in some cases slower than using a `for` loop. Personally, I think this is wildly overblown unless you're writing code that's going to execute at an enterprise level. `Array.forEach` can easily execute more than sixty thousand times a second, and is even faster in most modern browsers. For the vast, *vast* majority of use cases, that's plenty fast enough. Your DOM paint times and other factors will be of much more concern when it comes to speeding up your site than what type of array loop you want to use.

So, if you're operating at Facebook / Twitter scale, then by all means, consider optimizing your `forEach`es down into `for` loops where plausible. For small projects, I say go with whichever style works best for you!

See you next week.

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*