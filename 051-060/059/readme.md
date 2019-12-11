**JS Quick Hit: JS Interview Gotchas 1**

Video URL: https://youtu.be/Q1uxUUIj_tQ

Hello! Do not be fooled by the "one" in this week's title. This is not a multi-part tutorial. Instead, it is an acknowledgment that I might return to this well at some point in the future, because the list of interview questions that are basically some version of "LOL JavaScript is weird!" is lengthy and robust.

So, let's acknowledge the truth first: JavaScript _is_ weird. If we've learned anything from the new millenium, however, it's that being weird is totally fine. Our recent global celebration of weirdness means that movies about fringe superheroes can now make billions of dollars and people are now fleeing "normal" careers at historic rates to work on gigs programming AI subroutines for three-legged robotic dogs. Ain't nothing wrong with weird, is what I'm saying. But it's still important to _understand_ JavaScript's weirdness so it doesn't bite you in the rear end &hellip; and so you can move on to the part of the interview where three near-identical bearded dudes quizz you on buzzwords that didn't exist ten weeks ago!

Take a look at this code:

```
(function() {
  let captainAmerica = blackWidow = 'Super Hero'
  console.log(captainAmerica); // Super Hero
  console.log(blackWidow); // Super Hero
})()
```

Straightforward, right? But what happens if we try to console log those two heroes _outside_ of the IFFE they're in (which is supposed to restrict them to only working inside the braces &ndash; want a tutorial on IFFEs? Let me know!)?

```
console.log(blackWidow); // Super Hero ... oops!
console.log(captainAmerica); // breaks the script because it's undefined
```

You'll note I had to log `blackWidow` first, because if we did `captainAmerica` first, it'd break script execution and we'd never get to the second log. You'll also notice that `blackWidow` has escaped her IFFE and is available globally. I guess that's what happens when you try to detain the world's deadliest covert assassin.

Anyway, here's why: if you string multiple variables together the way we did in the first line of our function, JavaScript reads it differently than you'd expect. You would think it'd just be shorthand, like this:

```
// let captainAmerica = blackWidow = 'Super Hero';
let blackWidow = 'Super Hero';
let captainAmerica = blackWidow;
```

But, nah, that's not how JS works. Instead it interprets it like this:

```
blackWidow = 'Super Hero';
let captainAmerica = blackWidow;
```

Notice that there's no `let` (or `var` or `const`) in front of `blackWidow`. Instead of crashing and burning, which is what we'd actually want if we wrote out that code manually, JavaScript instead stupidly tries&mdash;like a Rhode Island driver slamming to a halt and wildly gesticulating for you to turn left in front of them even though they have the right of way&mdash;to be helpful. It goes "well, they didn't use any kind of declaration, so let's just attach this variable at the global level!" &hellip; and that's why Black Widow manages to escape her prison while poor Captain America's stuck behind bars.

How do you avoid dealing with this? You've got two options. The first is simple: don't string variables together like that. The second is the better option: run your code in strict mode so that you get a runtime error when you try to do stuff like this, allowing you to fix the issue before it becomes a problem later on in your code.

That was fun. Want to do another? Let's take a look at array concatenation. We'll start with three arrays:

```
let avengers = ['Black Widow', 'Captain America', 'Hawkeye', 'Hulk', 'Iron Man', 'Thor'];
const moreAvengers = ['Falcon', 'Scarlet Witch', 'Spider-Man', 'Vision'];
const pseudoAvengers = ['Black Panther', 'Dr. Strange', 'War Machine', 'White Wolf'];
```

I &hellip; probably forgot some possible inclusions in these lists. There are a _lot_ of Avengers! Anyway, let's assemble our Avengers into a single team. What's the output going to be if we do this?

```
avengers.push(moreAvengers, pseudoAvengers);
console.log(avengers);
```

If you guessed "our original array of six strings with two subarrays tacked onto the end" and _not_ "an array of fourteen strings like we actually want" then congratulations, you've earned the right to go to an awkward team lunch full of inside jokes and references you don't yet understand before coming back to the office and continuing with your interview while fighting off the sleep-inducing effects of that giant burger with extra fries you definitely shouldn't have ordered, but did!

What's the easiest way to do things the right way? Well, with ES2015's spread operator, it's really quite simple. Here's how. Oh, note that if you leave the code above in, you'll need to rebuild your avengers array back to the original six strings, since we changed it by using `.push`. I'd recommend deleting the code above, since it is bad and does not do what we want it to do. Here's the proper solution:

```
const avengersAssembled = [...avengers, ...moreAvengers, ...pseudoAvengers];
console.log(avengersAssembled); // there we go!
```

Simple, easy, and modern. Everyone loves the spread operator! At least assuming they understand it. Not yet familiar? Worry not! Instead, visit [JS Quick Hits 8](https://closebrace.com/tutorials/2018-03-14/js-quick-hits-8-the-spread-operator) for a complete tutorial.

That's it for this week. I'm ahead on tutorial writing right now (woo!) so I'm not sure what's coming next week. Do you have suggestions for anything you'd like to see a couple of weeks from now? Drop me a line and let me know.

See you soon!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*