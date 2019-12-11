**JS Quick Hit: Array.sort**

Video URL: https://youtu.be/1ppGIKYva7w

Last week we talked about Bubble sorting, and I mentioned that there was a native JavaScript method for arrays that was more efficient and easier to use. Can you guess what this week's tutorial covers? You probably can, since it's in the title above this paragraph, but &hellip; yeah. `Array.sort` is a great little method. Let's take a look at how it works!

By default, `Array.sort` can handle sorting alphabetically and numerically. Let's sort a list of Silversun Pickups albums. If you don't like Silversun Pickups, you can feel free to substitute with albums from your favorite band or singer. Cardi B, Grimes, [Party Cannon](http://www.metalsucks.net/wp-content/uploads/2015/10/Bay-Area-Deathfest-Admat-Color.jpg) &hellip; it's up to you!

```
const albums = ['Pikul', 'Carnavas', 'Swoon', 'Neck of the Woods', 'Seasick', 'Better Nature'];
```

Now let's sort 'em. The code is simple:

```
console.log(albums.sort()); // ["Better Nature", "Carnavas", "Neck of the Woods", "Pikul", "Seasick", "Swoon"]
```

Note that this is a destructive method, in that it actually rearranges the data in your array. If you want to maintain data integrity, you should clone the array. There are at least six ways to do that. Without worrying about speed, the easiest one is: `const albumsClone = [...albums]`. If you need a refresher on how the spread operator works, check out *[JS Quick Hits 8 - The Spread Operator](https://closebrace.com/tutorials/2018-03-14/js-quick-hits-8-the-spread-operator)*.

Anyway, `Array.sort` also works with numbers without needing any custom sorting code. Here's an example:

```
const nums = [12, 54, 1, 88, 32, 6, 47, 72, 28];
console.log(nums.sort()); // [1, 12, 28, 32, 47, 54, 6, 72, 88]
```

Note that this method converts your data to strings and compares against the unicode values, which is why `6` is getting slotted between `54` and `72`. Fortunately, you can also write your own sorting algorithms. The Array will run the algorithm each time it compares two values, sort of like how a [bubble sort](https://closebrace.com/tutorials/2018-08-08/js-quick-hits-29-bubble-sort) works. You return `-1` to indicate that the first value should be closer to the beginning of the array, or `1` to indicate the opposite. If the values are identical, you return `0`. Here's a function that we can use to sort an array by **reverse** alphabetical values:

```
const reverseAlpha = (a, b) => {
  // ignore case
  const name1 = a.toUpperCase();
  const name2 = b.toUpperCase();
  // if name1 is closer to the beginning of the alphabet
  if (name1 < name2) {
    return 1; // move name1 after name2
  }
  // if name1 is closer to the end of the alphabet
  if (name1 > name2) {
    return -1; // keep name1 where it is
  }
  // identical names
  return 0;
}
```

Check out JavaScript's "less than" and "greater than" features doing a whole bunch of heavy lifting there. Did you know you could compare strings like that? Well, now you do! Let's pass our function in to `Array.sort` like this:

```
console.log(albums.sort(reverseAlpha)); // ["Swoon", "Seasick", "Pikul", "Neck of the Woods", "Carnavas", "Better Nature"]
```

So, that's cool, but it's also really useful. It means we can do things like sorting an array full of objects based on a specific property in the objects. Here's some data:

```
const silversunPickups = [
  { name: 'Brian', job: 'vocals' },
  { name: 'Christopher', job: 'drummer' },
  { name: 'Joe', job: 'keyboards' },
  { name: 'Nikki', job: 'bass' },
];
```

And here's a quick regular alphabetical sort function. I've pared it down from the one above to keep it short, but it does the same thing, just &hellip; non-reversed.

```
const jobSort = (a, b) => {
  if ( a.job.toUpperCase() < b.job.toUpperCase() ) { return -1; }
  if ( a.job.toUpperCase() > b.job.toUpperCase() ) { return 1; }
  return 0;
}
```

Note that we're accessing the job property here. We could get complex and allow the user to define which property to sort by using an additional function parameter, but let's keep it simple. Here's how we use our function to sort our array of objects:

```
console.log(silversunPickups.sort(jobSort));
/*
 * Output:
 *
 * [
 *   {"name":"Nikki", "job":"bass"},
 *   {"name":"Christopher", "job":"drummer"},
 *   {"name":"Joe", "job":"keyboards"},
 *   {"name":"Brian", "job":"vocals"}
 * ]
 *
 */
```

Sweet. You can use custom sort functions for all kinds of stuff, and they can get as complex as you need them to be to properly manage your data. Next time you need to sort an array, before you write your own algorithm, consider `Array.sort` instead.

See you next week!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*