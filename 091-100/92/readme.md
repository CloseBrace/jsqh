**JS Quick Hit: TypeScript - Part 4**

Video URL: https://youtu.be/XaXWBISW2Lg

Now that we're pretty comfortable working with static types, you're probably wondering how we handle objects. Well, good news, everyone &hellip; we're going to talk about that today. In fact, let's start out by doing something awful! Imagine we have the following data (apologies in advance to the 98% of you who don't care about basketball).

```
const team = {
  name: 'Boston Celtics',
  founded: 1946,
  championships: 17,
  division: 'Atlantic',
  goodThisYear: true,
  championsThisYear: 'Probably not',
  starters: ['Walker', 'Brown', 'Tatum', 'Hayward', 'Theis'],
};
```

All right, that there is an object full of all sorts of data. We've got strings, numbers, booleans, and an array of strings. Sweet. Let's create a typescript function that does stuff with this data. This is the part that's awful:

```
const logData = (data: {
  name: string;
  founded: number;
  championships: number;
  division: string;
  goodThisYear: boolean;
  championsThisYear: string;
  starters: string[];
}) => {
  for (let [key, value] of Object.entries(data)) {
    console.log(`${key}: ${value}`);
  }
};
logData(team);
```

Quick note: to use Object.entries we need to configure TypeScript to support ES2017. We can either do this with a config file or, for the purposes of this tutorial, compiling with the following command:

```
tsc --target ES2017 example.ts
```

If we compile this and run the resulting `.js` file, we see that it runs and correctly logs the keys and values for our object. That's great and in a vacuum I suppose that function we wrote isn't even that awful. But imagine you had ten functions, or a hundred, that all did different things using that object. Suddenly we're writing out a _lot_ of types and really making our code difficult to read. There's gotta be a better way, right?

There is: interfaces. Without getting too complicated, TypeScript interfaces allow us to define a schema for an object once, and use it whenever we need it. Here's how:

```
interface Data {
  name: string;
  founded: number;
  championships: number;
  division: string;
  goodThisYear: boolean;
  championsThisYear: string;
  starters: string[];
}
```

Note that this is not a variable. There's no equals sign, and we're using semicolons between lines instead of commas. TypeScript knows how to read this, and it will be removed entirely from your code at compile time (once the error-checking process has finished). Anyway, now that we have it, we can write much cleaner and easier to read functions, like this:

```
const shoutData = (data: Data) => {
  for (let [key, value] of Object.entries(data)) {
    console.log(`${key}: ${value}`.toUpperCase());
  }
};
shoutData(team);
```

That's &hellip; a lot better, right? The best thing is: you can re-use the interface as many times as you want. You can even export it like an ES6 variable and import it in other files. So if you're using a modular approach to your project, you don't have to keep redefining interfaces for the same variables.

Let's go ahead and create another object that will break when we try to use our interface:

```
const team2 = {
  name: 'Los Angeles Clippers',
  founded: 1970,
  championships: 0,
  division: 'Pacific',
  goodThisYear: 'Extremely',
  championsThisYear: 'Very Likely',
  starters: ['Beverley', 'Shamet', 'Leonard', 'George', 'Zubac'],
};
shoutData(team2);
```

When we try to compile this, we'll see that we get an error, because `goodThisYear` is defined as a boolean in our interface, but we've used a string instead. We have multiple options from here: either fix our data, or change the interface to accept multiple types. Personally I'd go with the former, but I leave it up to you!

That's all I've got for this week. Next week we'll discuss a few other things about TypeScript and wrap up this gentle introduction. See you then!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
