**JS Quick Hit: Array Index Methods**

Video URL: https://youtu.be/UkDwKKBBajg

We're going to talk about a few simple but oft-overlooked methods on JavaScript's array object. Specifically: `findIndex`, `indexOf`, and `lastIndexOf`. Each of these methods relates to the order of the data stored in the array. Actually, let's make that explicit for anyone new to arrays. The position of an item in the array is its index. Here's an example array:

```
const teams = ['New Orleans Pelicans', 'Memphis Grizzlies', 'Los Angeles Lakers', 'New York Knicks'];
```

(Shout out to the six people who read this newsletter and, like me, also follow basketball).

Arrays are a zero-based count, so the index for `New Orleans Pelicans` is `0`, and the index for, `New York Knicks` is `3`. These numbers are useful! Much of the time, you're worried more about the data than its position, but that's not always the case. I'm working on a project right now where I need to match up a text string with an array full of them, and know exactly where it's positioned for rendering purposes.

So let's talk about matching indices. The first way to do it is the aptly named `findIndex`, which allows you to find the index of the first item in the array that matches the parameters you define. How do you define them? With a custom function. It's most useful if your array contains complex objects or if you're looking for something other than a simple value. It works like this:

```
const nameIsShort = (str) => {
  return str.length < 16;
}
const index = teams.findIndex(nameIsShort);
console.log(index); // 3
```

It's important to note that this method only gives you the index for the _first time the function returns true_. So if we had a larger array that included, say, the Phoenix Suns, we'd still get `3` as the result, because the Knicks would be the first value that returns true when run against the `nameIsShort` function. If you want a list of all items that match, you need to be using `Array.find`, which we covered all the way back in [JS Quick Hits 1](https://closebrace.com/tutorials/2018-02-07/js-quick-hits-1-array-find).

If you've just got a simple array of strings (or numbers, or other non-object/array primitives), which we do, and you're just looking to find the index of a known value, you _could_ do it with `findIndex`, but you could save code by just using `indexOf`, which takes a single value to search for instead of a function, but otherwise operates the same. Here's the code:

```
const indexLakers = teams.indexOf('Los Angeles Lakers');
console.log(indexLakers); // 2
```

That's pretty straightforward. You go through the array and you find the first match and you get its index. Simple! The only catch is the same as with `findIndex`: if your array contains multiple values that are the same, you're only getting the index of the first match. If you need to know the indices of every match, you'd have to use some kind of loop (`for`, `forEach`, `map` and `filter`, etc ... there are a bunch of different ways you could do it, but the `for` loop is probably the fastest and most broadly readable).

Last up we've got `lastIndexOf` which, wait for it, finds the last index of a value. Shocking, I know. This works exactly like `indexOf` except in an Array that contains multiple identical items, it'll find the index of the last one instead of the first. Here's some code, which also establishes a new array with a repeated value:

```
const employees = ['Bob', 'Sarah', 'Jason', 'Tina', 'Bob', 'Lindsay', 'Terrence', 'Caitlin'];
const indexLast = employees.lastIndexOf('Bob');
console.log(indexLast); // 4
```

As you can see, this is giving us the index for the second instance of Bob, not the first, as expected. And before you dismiss this scenario as unrealstic, know that I once worked in a startup with two other guys named Chris and one named Christian, and in a different startup with three other guys named Chris. WE ARE LEGION!

Anyway, these array methods are built into JavaScript, speedy, and often overlooked when it comes to simple operations. Don't forget about them!

See you next week.

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
