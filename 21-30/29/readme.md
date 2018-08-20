**JS Quick Hits: Bubble Sorting**

Video URL: https://youtu.be/_YEPQghMHLY

Let's talk about sorting. One of the most common tasks that happens in programming is sorting an array of data. There are many different ways to perform sorts, and often one algorithm will be faster in certain situations or the other. We're not going to go into a big performance test, here, because that's outside the scope of this tutorial. Today, we're just going to pick one and talk about how to implement it. The algorithm we're going to talk about? The simple, venerable bubble sort.

Let's say you have an array of data. To keep this short and easy, we're just going to use numbers. Here's an array of random values:

```
const nums = [2, 9, 6, 3, 5, 7, 1, 4, 8];
```

So, we've got this list of numbers, but it's currently randomly ordered. We want to organize it. To do that, we're going to use a bubble sort. **Note:** we could also use `Array.sort`, which is more efficient and straightforward &hellip; but that's not what this tutorial's about!

The way a bubble sort works is: it iterates through the array and compares position zero to position one. If the item in position one should come before the item in position zero, it swaps them. Then it compares position one to position two, does the same thing, and keeps going. Once it's passed through the entire array, it loops back to the beginning, and repeats. Does this sound confusing? [Watch the video!](https://youtu.be/_YEPQghMHLY) It gives some visual context.

So long as it runs that loop once for every entry in the array, the sort will work. That does mean, though, that it may run the loop several more times even once the array's actually sorted. That can introduce performance issues, making large sorts of this type not always the most performant option. But for small datasets like this, it's a great and straightforward way to sort data.

Here's a visual example of how the array would look after one pass of a bubble sort:

```
console.log([2, 6, 3, 5, 7, 1, 4, 8, 9]);
```

As you can see, it's "bubbled" `9` all the way to the end, but the rest of the list is out of order. The next pass would bubble `8` all the way to the second-to-last position. The third pass would bubble `7` to third to last. And so on.

The simplest way to do this is with a `for` loop that just executes the sort (itself another `for` loop) exactly as many times as there are items in the array. The first pass bubbles the last item all the way to the end, the second pass bubbles the second-to-last item, and so forth. Let's write some code to do it:

```
const bubbleSort = (items) => {
  const copy = [...items]
  // This one determines how many passes to make
  for (let i = 0; i < copy.length; i += 1) {
    // This one does the actual checking
    for (let x = 0; x < (copy.length - i - 1); x += 1) {
      // compare items and only swap them if the second one's smaller
      if (copy[x] > copy[x + 1]) {
        let first = copy[x]; // store the first number
        let second = copy[x + 1]; // store the second number
        // now swap 'em
        copy[x] = second;
        copy[x + 1] = first;
      }
    }
  }
  return copy;
};

console.log(bubbleSort(nums));
```

So what're we doing there? First we're making a copy of the incoming array to work on (hooray, variable destructuring!). Then we begin the loop that will run nine times. Inside that loop, we initiate a second. Rememeber that the way `for` loops work means that the internal one will execute all of its loops before the external one moves on to its second loop. The length of our array is nine, so when `i` is equal to `0`, the `x` loop will execute 8 times (`copy.length - i - 1` or `9 - 0 - 1). Then `i` will be `1`, and the `x` loop will run again, this time executing 7 times (`9 - 1 - 1`). It always takes one less iteration than the length of the array to have checked all of the adjacent pairs, and then one less iteration each subsequent time since you know you can ignore the stuff that's already been properly bubbled.

The actual swapping code is pretty simple. We just create two variables storing the numbers in the two positions we're comparing, then copy them over each other. Of course, we only do this if the numbers need to be swapped. This is the heart of the sort &hellip; and this is where you'd write a whole bunch of other code if you were, saying, sorting a list of album titles by alphabetical order. That'd be a whole lote more complicated, but the principals the same: evaluate if the two items need to be swapped, and if so, swap them.

So that's the famous bubble sort. Straightforward, really, and a good algorithm to be familiar with. Interested in learning more sorting algorithms or other JavaScript patterns? Just hit reply and let me know!

See you next week.

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*