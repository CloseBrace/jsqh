### JS Quick Hits: Variable Destructuring

One of my absolute faaaa-haaaavorite parts of ES 2015 (aka ES6) is variable destructuring. It's the rare solution that both shortens code *and* makes it easier to read. Destructuring essentially means that you can pull values from inside an object/array/etc and assign them to variables in a single line. Let's take a sample object:

```
const wolverine = {
    alias: 'Logan',
    firstName: 'James',
    lastName: 'Howlett',
    powers: [
      'healing factor',
      'adamantium skeleton',
    ],
    age: 130,
    isHairy: true,
};
```

Now let's say you wanted ol' Wolvie's first and last names available as variables for some reason. In the past, you'd need to do the following:

```
var firstName = wolverine.firstName;
var lastName = wolverine.lastName;
```

BUT NO LONGER! Now we can do this:

```
const { firstName, lastName } = wolverine;
```

Obviously that's a short, simple example, but I hope you can see how that can save a lot of code over the course of an entire application. Obviously, your variable names have to match the object's property names in order for this to work. If you want to have different variable names, you can do that, too:

```
const { firstName: fName, lastName: lName } = wolverine;
console.log(fName, lName); // James Howlett
```

Oh, want to destructure nested data? No problem. Here's how:

```
const { powers: [power1, power2] } = wolverine;
console.log(power1, power2) // healing factor adamantium skeleton
```

You can also destructure arrays, like this:

```
const xMen = ['Storm', 'Cyclops', 'Beast', 'Phoenix', 'Wolverine', 'Mystique', 'Quicksilver'];
const [first, second, third] = xMen;
console.log(first, second, third); //Storm Wolverine Cyclops
```

This is nice enough, but where it really shines is in loops (including the various re-renders that happen in React, but that's a different tutorial &hellip; [series](https://closebrace.com/categories/five-minute-react)). Let's take a look at the `for / of` loop we talked about [last week](https://closebrace.com/tutorials/2018-02-14/js-quick-hits-4-for-of-loop) in combination with the [entries iterator we covered in week 3](https://closebrace.com/tutorials/2018-02-07/js-quick-hits-3-array-iterators). That's the one that gives us little mini-arrays of both index and value. We'll use our xMen array from above.

```
for ([index, value] of xMen.entries()) {
  console.log(`Number ${index} is ${value}`);
}
```

That's going to log six lines, each of which looks like this:

```
Number 0 is Storm
```

Except, of course, the index and the value will change as it moves through the array.

Before we get to talking about template literals like `${value}`, we're going to take a quick detour next week to talk about an important addition to desctructuring called the rest operator, which literally allows you to get the *rest* of an array.

