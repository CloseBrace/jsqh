**JS Quick Hit: FizzBuzz Refactoring**

Video URL: https://youtu.be/qPLnLX-ZisA

This week we're going to talk a bit about code refactoring while using one of the most venerable "does this person know how to code?" tests around: FizzBuzz!

The goal of FizzBuzz is deceptively simple, but it requires an understanding of some coding basics that make it a handy tool for quickly evaluating that a prospective candidate at least meets a baseline level of programming ability.

Well, sometimes &hellip; I'd worked with JavaScript for *years* before I learned how to properly write a FizzBuzz function, so don't feel bad if you don't know it off the top of your head. Still, it's a good thing to know, especially if you're headed out into the job market.

So, the FizzBuzz question goes like this: can you write a function that prints out numbers from one to one hundred, except if the number is a multiple of three, print "Fizz," and if it's a multiple of five, print "Buzz," and if it's a multiple of _both three and five_, print "FizzBuzz."

There are about a zillion different ways to do this. We're going to take a look at a few, starting with the one that's way more verbose than it needs to be and then refactoring down from there to get something more concise, but still readable. Here's the first example:

```
for (let i = 1; i < 101; i +=1) {
  let output = i;
  if (i % 3 === 0) {
    output = 'Fizz';
  }
  if (i % 5 === 0) {
    output = 'Buzz';
  }
  if (i % 3 === 0 && i % 5 === 0) {
    output = 'FizzBuzz';
  }
  console.log(output);
}
```

That'll do what we want, but let's take a small detour to talk about the percent sign we're using up there. If you're not familiar with it, that's called the modulus operator, and what is does is return the remainder of a division. Remember remainders from school, back before you learned about decimals? For example, `20 / 6 = 3 (2 remaining)`. Meaning six goes into twenty three times, but that only gives you 18, so you have 2 left over. That's what the modulus operator does. So: `20 % 6` would yield a return value of `2`. We're using this to check every single number in our loop. First we divide it by three. If there's no remainder, then great, that's at least a "Fizz". We do the same with five. If there's no remainder, that's at least a "Buzz". Then we check for both three and five. If there's no remainder, well, that's a "FizzBuzz".

This is fine. The code works, it's readable, and it's unlikely to cause any performance issues. But it could be a little bit smarter. We don't actually need the third check. We can create "FizzBuzz" by manipulating the string instead of overwriting it, like this:

```
for (let i = 1; i < 101; i +=1) {
  let output = ''
  if (i % 3 === 0) {
    output += 'Fizz';
  }
  if (i % 5 === 0) {
    output += 'Buzz';
  }
  if (output.length < 1) {
    output = i;
  }
  console.log(output);
}
```

See what's happening here? We're appending "Fizz" and "Buzz" instead of overwriting, which means that a number which happens to trigger both the check for three and the check for five gets both bits of text added to it. Same output, same number of lines ... this isn't much of an optimization, but it's a bit more clever.

Honestly, the above code is probably what I'd submit for a coding interview, with an acknowledgment that it could be condensed but doing so doesn't necessarily make for better code. If pushed on how to condense it, I'd offer the following solutions that use our old friend the ternary operator, which we covered in [Tutorial 9](https://closebrace.com/tutorials/2018-03-21/js-quick-hits-9-ternary-operators).

Here's some condensed but still pretty readable code:

```
for (let i = 1; i < 101; i +=1) {
  let output = '';
  output += i % 3 === 0 ? 'Fizz' : '';
  output += i % 5 === 0 ? 'Buzz' : '';
  output = output.length < 1 ? i : output;
  console.log(output);
}
```

This is almost identical to the code in the second example. We're just getting rid of the `if`s. But wait, we're not done. We can get even shorter if we really want to by using a trick in which an empty string essentially evaluates as false in a logical operator. Here's the code:

```
for (let i = 1; i < 101; i +=1) {
  let output = ((i % 3 === 0 ? 'Fizz' : '') + (i % 5 === 0 ? 'Buzz' : '')) || i;
  console.log(output);
}
```

Do you see what's happening here? We're doing the two ternary operators, all wrapped up in parens, which means within those parens we're either getting `Fizz`, `Buzz`, `FizzBuzz`, or a blank string. If we get a blank string, the "or" logical operator decides that's not what we want, and gives us `i` instead.

BUT WAIT, we can still shorten this, if we're into writing code that other programmers will probably find annoying when they're trying to decipher what the heck we were doing, two years from now. Here's an even shorter version:

```
for (let i = 1; i < 101; i +=1) { console.log(((i % 3 === 0 ? 'Fizz' : '') + (i % 5 === 0 ? 'Buzz' : '')) || i); }
```

Here we've done away with `output` entirely, moved the logic onto one line, and are just `console.log`ing directly.

Even this is not necessarily the shortest way to refactor this code. You can get fancy by using arrays, for example, but &hellip; don't do that. This kind of coding test is generally not about "can you come up with the most clever way to execute this task in the fewest number of characters?" but rather about making sure you grasp the fundamentals of programming. One of the fundamentals of programming, at least as espoused by any development group I'd want to work with, is "write readable code." Getting too tricky is more trouble than it's worth.

My favorite of these, for a working site, would be the third example. The first one that uses ternary operators. I think it's concise and elegant while still being readable. I think once you get into stringing multiple ternary operators on one line, code rapidly becomes unreadable. But, again, for a code interview I'd probably go with the second one, just to keep things explicit.

So, there you have it. Now you're prepared not only to pass a FizzBuzz test, but to explain why you chose the approach that you chose! And if you weren't familiar with the modulus operator, now you've got another tool in your kit.

See you next week!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*