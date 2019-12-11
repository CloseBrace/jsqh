**JS Quick Hit: Array Push and Pop**

Video URL: https://youtu.be/qoVTdM-EMeM

We're keeping it short and simple this week by covering two of the basic Array methods that an JS developer should know: `push` and `pop`. Each of these methods impacts the end of an array, in exactly opposite ways. `push` adds a new item to the end of an array, and `pop` removes the last item in an array (while returning that item's value). Let's run through them real quick. First we'll need an array, so let's go with this code:

```
const movies = ['Mission: Impossible', 'Mission: Impossible 2', 'Mission: Impossible 3', 'Mission: Impossible Ghost Protocol', 'Mission: Impossible Rogue Nation'];
```

You'll note that we're missing the latest installment in the venerable film franchise in which Tom Cruise seems determined to actually die on set while performing his own stunts. Let's go ahead and add that in there, but&mdash;whoops!&mdash;we're going to do it with a typo. Observe:

```
movies.push('Mission: Impossible Falout');
console.log(movies); // MI, MI2, MI3, Ghost Protocol, Rogue Nation, Falout
```

As you can see, this added our poorly-spelled string to the end of the array, as expected. We could correct that by just changing the value of that particular array index, but for the sake of showing off `pop`, let's just remove it, like this:

```
const removedValue = movies.pop();
console.log(removedValue); // Mission Impossible: Falout
console.log(movies); // MI, MI2, MI3, Ghost Protocol, Rogue Nation
```

Note that, as I said above, `pop` returns a value. This way you could, for example, check that what you just removed from the array was what you actually *meant* to remove from the array. Seems handy!

OK, now let's put our actual, correct title back in at the end of our array, using `push` again:

```
movies.push('Mission: Impossible Fallout');
console.log(movies); // MI, MI2, MI3, Ghost Protocol, Rogue Nation, Fallout
```

There we go. Our data is correct. One thing you've probably noted is that these methods mutate your data, in the sense that they change the original array rather than creating a new array, the way methods like `Array.map` and `Array.filter` do (we covered the latter in [JS Quick Hits 2](https://closebrace.com/tutorials/2018-02-07/js-quick-hits-2-array-filter). The former we actually haven't covered yet. Maybe soon!). This is not inherently a problem, as long as you're prepared for it, but if you prefer in general not to mutate data and instead generate new data as you make your manipulations, you can always use [variable destructuring](https://closebrace.com/tutorials/2018-02-21/js-quick-hits-5-variable-destructuring) to quickly clone your array and then work on the clone, like this:

```
const moviesToEdit = [...movies];
for (let i = 0; i < 3; i += 1) {
  moviesToEdit.pop();
}
console.log(movies); // MI, MI2, MI3, Ghost Protocol, Rogue Nation, Fallout
console.log(moviesToEdit); // MI, MI2, MI3
```

That's it for this week. Sometimes it's good to keep 'em short and simple! See you next time.

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*