**JS Quick Hit: Recursion Continued**

Video URL: https://youtu.be/7eu0bNyltSA

This week we're going to do a little more exercising with recursive functions, but we'll keep it a bit shorter than last week. We're going to recursively iterate through an object, combining values. Just one function. It's actually quite straightforward, but takes a bit to wrap one's head around.

Let's start with an array. How about we use the top-15 grossing films (in the US) for 2018, sorted by studio? Here's our object. It's, uh ... huge. Sorry!

```
const movies2018 = {
  disney: {
    antManAndTheWasp: 216648740,
    blackPanther: 700059566,
    incredibles2: 608549440,
    avengersInfinityWar: 678815482,
    solo: 213767512,
  },
  fox: {
    bohemianRhapsody: 164985592,
    deadpool2: 318491426,
  },
  paramount: {
    aquietplace: 188024361,
    missionImpossibleFallout: 220159104,
  },
  sony: {
    hotelTransylvania3: 167510016,
    venom: 212300606,
  },
  universal: {
    jurassicWorldFallenKingdom: 416769345,
    theGrinch: 204576230,
  },
  warner: {
    aStarIsBorn: 193918438,
    crazyRichAsians: 173950732,
  },
};
```

The code to sort through this and sum all of those hundreds of millions of dollars into a single amount is really short! Let's write it down, and then we'll go over it. Here's the entire thing:

```
function sumMovies(value) {
  if (typeof value === 'object') {
    let sum = 0;
    for (let subVal of Object.values(value)) {
      sum += sumMovies(subVal);
    }
    return sum;
  }
  else {
    return value;
  }
}

const total = sumMovies(movies2018);
console.log(total); // 4678526590
```

So, how does this work? Well, the first thing it does is check the `value` we passed in. Let's actually look at the `else` first. It's what happens at the bottom of the chain. If the value's not an object, we just return it. Obviously, this function would break down quickly if the data was formatted incorrectly (for example, if it had a bunch of strings or booleans in it), but in order to keep this simple, we've made sure our data's going to work correctly. This means the only thing that will be ever be returned is a number.

OK, now let's take a look at the meat of this function. If the value we're passing is an object, we get all the values for the object and recurse the function on each of them. This dives deeper and deeper into the object until it hits a number (and it'll work no matter how far you nest objects as long as the most internal value is a number). The `for of` loop is doing a ton of work here, controlling the recursion. Let's talk about what's actually happening when we run the function.

We send it the `movies2018` object. It detects that the object is, well, an object. It runs `Object.values` to get the values within that object. What are those values? They're an array that looks like this:

```
[{"antManAndTheWasp":216648740,"blackPanther":700059566,"incredibles2":608549440,"avengersInfinityWar":678815482,"solo":213767512},{"bohemianRhapsody":164985592,"deadpool2":318491426},{"aquietplace":188024361,"missionImpossibleFallout":220159104},{"hotelTransylvania3":167510016,"venom":212300606},{"jurassicWorldFallenKingdom":416769345,"theGrinch":204576230},{"aStarIsBorn":193918438,"crazyRichAsians":173950732}]
```

Specifically, an array full of objects. Neat! So we can use `for of` on that array, and iterate through each of them. We declare a top-level variable `sum`, equal to zero. Now we start looping. So, next we recurse the function, running it on the first object in the array above, which looks like this: `{"antManAndTheWasp":216648740,"blackPanther":700059566,"incredibles2":608549440,"avengersInfinityWar":678815482,"solo":213767512}`

So, aha! That object is also an object. So we run `Object.values()` on it, and we get this array:

```
[216648740,700059566,608549440,678815482,213767512]
```

Now we're talking! We create a new `for of` loop that operates on that array, and each time our function runs now, it encounters a number, so it returns those numbers, and each of those get added to that function's `sum` value, which then gets returned &hellip; but remember that we're still in the FIRST for loop, which is iterating over the array that includes all of the studio objects. So the total sum value we returned in the array with all the numbers is just one of several loops of that top-level `for of` loop. I know this is getting confusing, but this is the nature of recursion. Here's a simplified step-by-step:

1. `movies2018` is an object,
2. create a top-level `sum` variable and set it to zero
3. get the values of its subobjects
  a. `disney` is an object
  b. create a 2nd-level `sum` variabled and set it to zero
  c. get the values of its subobjects
    1. these five values are numbers
    2. create a 3rd-level `sum` variable and set it to zero
    3. iterate over the values and add each of them to `sum`
    4. return `sum`
  d. add the returned `sum` from the disney object to the 2nd-level `sum`
  e. proceed to the `fox` object
  f. repeat through all studio objects, adding all their returns values to top-level `sum`
4. Return top-level `sum`

So once you get all the way through the studios, the 2nd-level `sum` variable is returned. That value gets added to the top-level `sum` variable, which, since there are no more objects to iterate over at that level, gets returned.

Now, as I mentioned in the last tutorial, I find this stuff confusing. That's all right! It's fine to be confused, but the key is to not get frustrated and give up. Human brains are really flexible. The longer you work with certain concepts, the more ingrained they become. Try playing around with the object and the function. You'll break stuff, but that's the point: understanding why something is breaking is one of the best ways to learn how it works.

That's it for recursion, at least for now. Next week I'll be exploring one of two subjects (see the question of the week), so make sure to get your vote in on which one you'd like to learn about next!

See you then!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*