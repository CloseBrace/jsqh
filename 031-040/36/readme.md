**JS Quick Hit: Comparison Shortcuts**

Video URL: https://youtu.be/yoPJkh8myFg

Two weeks ago, we took a look at a reader's code in [JS Quick Hits 34 - Reader Question - Array.reduce](https://closebrace.com/tutorials/2018-09-12/js-quick-hits-34-reader-question-array-reduce). I refactored the code to a single line using a ternary operator, but my friend Thom pointed out that there's actually an even shorter way to do it by using a simple logical operator. Specifically, like this:

```
card.reduce((memo, Card) => memo + parseInt(Card.hrs || 0), 0);
```

So, what's happening there? Well, we know we want `memo` to either have `Card.hrs` or zero added to it. What we're taking advantage of, here, is a shortcut that you can use if one of the options of your ternary operator is just to return the data being compared. So if your ternary operator looks like this:

```
const hours = Card.hrs ? Card.hrs : 0;
```

you can shorten it to:

```
const hours = Card.hrs || 0;
```

Those double-bars are an `or` logical operator, meaning "Card.hrs or zero." You're probably most used to seeing logical operators in `if` blocks, but they can be used for comparison in many places. Your JavaScript engine will automatically understand that you're saying "set the hours variable to the number contained in the Card object if that number exists, otherwise set it to zero."

In the above reducer code, we also move the shortcut into the `parseInt` function (which we could also do with a ternary operator), since in either case we're going to want a numerical return value, and running `parseInt` on zero just gives, well, zero. This keeps us from having to write the following, more confusing code:

```
card.reduce((memo, Card) => memo + (parseInt(Card.hrs) || 0), 0);
```

That's not as good as the code above, although it's still arguably less confusing than a full ternary operator is!

There are a lot of places you can use this kind of shortcut. Let's take a look at another quick example, one which you might've used before without even really thinking of it as a shortcut:

```
const enableButton = input.val && input.val.length > 1;
```

What this is saying is, "if the `input` object has a `val` property, and if that property's length is greater than `1`, return `true`. Otherwise, return `false`."

&hellip; which can also be expressed as a ternary operator, like this:

```
const showButton = input.val && input.val.length > 1 ? true : false;
```

Again, this is just your JavaScript engine doing some of the legwork for you by making comparisons without you having to spell every single thing out. Here are some simple comparisons:

```
console.log(5 > 1 && 10 > 6); // true
console.log(5 > 1 && 10 < 6); // false
console.log(5 > 1 || 10 > 6); // true
console.log(5 > 1 || 10 < 6); // true
```

Note that the last one is true because we've used the "or" symbol, so only one of the two conditions needs to be true in order for the full expression to return true.

So, I hope this lesson brings you two reminders: the first is that comparisons are generally handy and worth considering while writing your code. The second is that there's often room for refactoring and simiplifcation even in refactored code!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*