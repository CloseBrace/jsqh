**JS Quick Hit: TypeScript - Part 3**

Video URL: https://youtu.be/oHVu6FchZ3w

In our last tutorial, we showed how we can specify different types and use TypeScript to make sure we're passing correct data to our functions. Today, we're going to look into using multiple types for a single variable, what to do if we want a variable to be able to be undefined, and a convenient but dangerous "escape hatch" that's available. Let's dive in!

By this point, hopefully, you're pretty comfortable with the idea that you can say "hey, this function parameter should be a string" and expect to get an error if you pass it, say, a number or a boolean. What happens, though, if we want to write a function that can take two types of variables? Here's a function that might work that way:

```
const listNames = (names: string | string[]) => {
  if (typeof names === 'string') {
    return console.log(names);
  }
  names.forEach(name => console.log(name));
}

listNames('Reed'); // Reed
listNames(['Sue', 'Johnny', 'Ben']); // Sue Johnny Ben
```

As you can see, we're passing a single variable, `names`, but we're allowing it to be either a string or an array of strings. The TypeScript syntax for arrays is pretty straightforward, unless the array contains objects &hellip; but we'll get to that. For now, you can use `string[]`, `boolean[]`, `number[]`, and so forth.

Generally speaking, I try to keep my use of TypeScript `or` functionality like that to a minimum, but it definitely comes in handy, especially when working in React where you're dealing with a lot of third-party libraries that have all kinds of functionality. Getting into making TypeScript play nicely with React is _way_ outside the scope of this tutorial, but might be the subject of a future course if people are interested!

Armed with this understanding of how to use the pipe to create an `or` in your type definitions (often referred to as typedefs), you might think you'd do the same thing if you wanted to allow a variable to be undefined, like this:

```
const shoutName = (name: string | undefined) => {
  if (name) {
    return console.log(name.toUpperCase());
  }
  return console.log('Wait ... who?');
}
shoutName('Victor'); // VICTOR
shoutName(undefined); // Wait ... who?
```

And that will work &hellip; sort of. Obviously you'd rather that function compile correctly if you just pass no parameters, rather than having to actually pass `undefined` to it. Unfortunately, if we remove that `undefined` and just run `shoutName` with no parameters, we'll get an error when we try to compile telling us that we're not passing a variable to the function. To make a parameter truly optional, so that it can either have a value or be any of a number of "falsey" values in JavaScript, such as `undefined` and `null`, we use this syntax:

```
const nameLength = (name?: string) => {
  if (name) {
    return console.log(name.length);
  }
  return console.log('Hey, I need a name.');
}
nameLength('Nathan'); // 6
nameLength(); // Hey, I need a name.
```

All you need to make a variable option is that one little question mark!

Let's say you want a function that can take _any_ kind of variable as a parameter. TypeScript's helpfully named `any` type allows you to do just that. Observe:

```
const stringifyWhatever = (whatever?: any) => {
  if (whatever) {
    return console.log(JSON.stringify(whatever));
  }
  return console.log(JSON.stringify('No Input Given'));
}
stringifyWhatever('Mr. Fantastic'); // "Mr. Fantastic"
stringifyWhatever(['The Invisible Woman', 'The Human Torch', 'The Thing']); // ["The Invisible Woman","The Human Torch","The Thing"]
stringifyWhatever({ name: 'Victor Von Doom', codeName: 'Doctor Doom' }); // { "name":"Victor Von Doom","codeName":"Doctor Doom"}
stringifyWhatever(); // "No Input Given"
```

This can make using `any` very tempting, especially if you're struggling to get your typedefs working properly. Of course, there's a problem: it'll allow data through that could potentially break things and give you JavaScript errors. Observe:

```
const divideThese = (x: any, y: any) => console.log(x / y);
divideThese(8, 2); // 4
divideThese(124, 5); // 24.8
divideThese('Hamburger', false); // NaN
```

As you can see, by using `any` here, we've essentially circumvented TypeScript entirely and gone back to the original JavaScript problem we were encountering in the first tutorial in this series! Don't get me wrong: there are places where `any` makes sense &hellip; for example, when you're dealing with incoming, unknown data. In that situation, you're going to want to use `any` and then deal with the various possibilities manually, by writing code that checks the type of the data and does stuff with it accordingly. When you're working with your own code, though, and have complete control, `any` should rarely be necessary.

So, when it comes to basic JavaScript types, there's one big elephant in the room we haven't covered: objects. Creating typedefs for objects requires using what are called TypeScript interfaces, and we're going to dive into those in the next tutorial.

See you there!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
