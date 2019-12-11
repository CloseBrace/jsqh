**JS Quick Hit: TypeScript - Part 5 - Wrapping Up**

Video URL: https://youtu.be/cpfiMrxR0rE

All right, we're ready to wrap up our gentle introduction to TypeScript this week. That's not to say we'll have covered all of the ins and outs - TypeScript is a powerful and complex language! But we should have a solid foundation on which to build. I want to cover a few final things, though, just for clarity.

The first is that TypeScript is not just for function parameters! They make for easy examples, so that's what I've been using, but if you're using `var` or `let`, you should be typing those values too, like this:

```
var myString: string = 'This is a string!';
let myNum: number = 15.547;
```

It's the same deal with objects that are not part of a function. They still need an interface, regardless of what keyword you're using to declare them. Here's an example:

```
interface Character {
  name: string;
  email: string;
  age: number;
}
let newChar: Character = {
  name: 'Bojack Horseman',
  email: 'bojack@whattimeisitrightnow.com',
  age: 55,
};
```

If you're using `const`, which I find is actually more common than `let` for most of the work I do (I barely ever use `var` anymore), you don't need to type simple primitives because, since `const` throws an error if you change it at all, it's never going to change type. So these are fine:

```
const movie = 'Secretariat'; // always a string
const academyAward = false; // always a boolean
```

Objects, as mentioned above, still need an interface. Arrays are slightly different, too &hellip; the way `const` works with them is that as long as the variable is always an array, the JS engine won't complain, but it doesn't care if you change what's _in_ the array. So it's generally good to type the Array's internal values even if you use `const`, like this:

```
const shows: string[] = ['Horsin\' Around', 'Philbert'];
```

This prevents you from accidentally tossing a number or object into an array that's only supposed to contain strings.

The last thing to keep in mind, for today, is handling arrays full of objects. You've probably already guessed the syntax for that, but just to confirm, yes: you just use the name of your interface with two brackets after it. So this will work:

```
interface Show {
  title: string;
  premiere: number;
  seasons: number;
}
const showsExpanded: Show[] = [
  { title: 'Horsin\' Around', premiere: 1987, seasons: 9 },
  { title: 'Philbert', premiere: 2017, seasons: 2 },
  { title: 'Fake Show', premiere: 2025, seasons: 'none' }, // typescript error!
];
```

Well &hellip; right up until that third value, anyway, which as we've noted, will throw a TS error because you're passing a string to `seasons`, which expects a number.

So, that's it for the basics of TypeScript! Hopefully this has helped people understand why it's of value, and how to get started with it. If you're looking for way more information, you can check out the documentation at [typescriptlang.org](https://www.typescriptlang.org), or you can reply to this email going "Dude I would pay you money for a more complete TypeScript course" and perhaps I'll make one.

See you next week!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
