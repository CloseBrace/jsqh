**JS Quick Hit: How to Remove an Element From an Array**

Video URL: https://youtu.be/0YgtBcsgkEc

We're back with a regular tutorial again this week. We're going to take a look at different ways to remove something from an array of data. So, for starters, we need an array of data! Here it is:

```
const names = ['Harley Quinn', 'Huntress', 'Black Mask', 'Black Canary', 'Renee', 'Erika', 'Scantily Clad Crystal'];
```

Let's start by what I suspect is probably the most common case: "I have a specific value or set of values I want to remove". In this case, let's get rid of Black Canary and Scantily Clad Crystal. We can do this using `array.filter`, which is a non-destructive array method, meaning it returns a new array rather than modifying the original one. Observe:

```
const filteredNames = names.filter((val) => {
  let keepVal = true
  if (val === 'Black Canary') { keepVal = false; }
  if (val === 'Scantily Clad Crystal') { keepVal = false; }
  return keepVal;
});
console.log(filteredNames); // ['Harley Quinn', 'Huntress', 'Black Mask', 'Renee', 'Erika'];
console.log(names); // our original array
```

ALL of the other methods we're going to be talking about today _are_ destructive. So they modify the original array. Personally &hellip; I hate that. I generally prefer immutable approaches where you create new variables with new values whenever possible, the way `array.filter` works. However, I am not the king of JavaScript Land (or any other land), so I don't make the rules. Let's take a look at removing an array by index number. We do this with `array.splice`, which takes two values, the index at which to start removing, and how many items to remove. It works like this:

```
const splicedNames = names.splice(3,3);
console.log(splicedNames); // ['Black Canary', 'Renee', 'Erika']
console.log(names); // ['Harley Quinn', 'Huntress', 'Black Mask', 'Scantily Clad Crystal']
```

As you can see, it returns whatever was removed, but it also definitely modifies the original array. We're down to four characters. Let's keep whittling by removing the first item in the array, with `array.shift`. This one's simple, and works like this:

```
const shiftedName = names.shift();
console.log(shiftedName); // 'Harley Quinn'
console.log(names); // ['Huntress', 'Black Mask', 'Scantily Clad Crystal']
```

Alas, so departs our lead character. Now let's remove the _last_ item from the array, the interestingly (alarmingly?) named Crystal, using `array.pop`. It works like `array.shift` did. Here we go:

```
const poppedName = names.pop();
console.log(poppedName); // 'Scantily Clad Crystal'
console.log(names); // ['Huntress', 'Black Mask']
```

We're down to two! Let's say we want to remove a value BUT keep the array size intact. We can do that using the `delete` operator, which will replace the item with `undefined` (which the console logs as `empty`). So our Array will still contain two items, but only one of them will have a value. Watch:

```
const deletedName = delete names[1];
console.log(deletedName); // true
console.log(names); // ['Huntress', empty];
```

Last but not least, let's say we want to blank the entire array. In older versions of JavaScript this was pretty easy: you could just replace it with an empty array, though that could lead to bugs since other variables could reference the original array and retain those values. Either way, we can't do that now, because we used `const` up above which tells the JavaScript engine that we can't replace the array with an entirely new one. So how do we do it? Well, the fastest and easiest method is to just set the array's length to zero, like this:

```
names.length = 0;
console.log(names); // []
```

And there we go. Just for fun, let's bring our original ladies (and also Ewan McGregor) back to the party, using `array.push` like this:

```
names.push('Harley Quinn', 'Huntress', 'Black Mask', 'Black Canary', 'Renee', 'Erika', 'Scantily Clad Crystal');
console.log(names); // our original array
```

So there you have it ... we chopped the array all the way down to no values using various techniques, then brought it back again with a simple `push`. And that's all we've got for this week. See you next time!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
