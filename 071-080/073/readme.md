**JS Quick Hit: An Intro to IIFEs**

Video URL: https://youtu.be/Jpn1zOjYQ-Y

Today we're going to take a quick look at the IIFE (often pronounced "iffy"), or Immediately-Invoked Function Expression. That's a semi-alarming term for something that's acutally pretty straightforward. You've probably seen it in the past. You may've even used it without fully understanding what it's doing, or why. Let's fix that!

An IIFE is written like this:

```
(function swarmsOfBees(numBees){
    console.log(`Not the bees! Specifically, not ${numBees} bees!`);
})(10);
```

If you test that, you'll note that we don't need to call the function. It just runs. The reason for this is mostly "because the JavaScript parser's a little weird", but what it comes down to is that the initial parentheses tell the JavaScript parser, "Hey, this is a function expression!" while the trailing parentheses tell the parser to run that expression. So everything within the parentheses gets run, which is to say, our `swarmsOfBees` function.

Now, there's an obvious question here, which is: "why can't I just write an IIFE like this?":

```
function releaseTheHounds(numHounds) {
    console.log(`${numHounds} released!`);
}(10);
```

The answer is, "Because the JavaScript parser doesn't work that way."" The `function` keyword tells it you're _assigning_ a function, not trying to run it. Then it views the trailing parentheses as, essentially, a totally different line of code, because it assumes your function assignment has stopped after the close brace. If you remove that `10` you'll actually get an error since an JS doesn't know what to do with an empty pair of parentheses.

There's another obvious question here, which is "why would I want to do this?" Well &hellip; remember in [JS Quick Hits 59](https://closebrace.com/tutorials/2019-03-13/js-quick-hits-59-interview-gotchas-1) when Black Widow kept escaping prison because she was getting attached to the global namespace? IIFEs help us avoid that troublesome situation. Normally in a script, if we declare a variable outside of a `function` block, that variable gets attached to the global namespace. It becomes available everywhere, and can potentially conflict with variables declared in other script files we might be loading via a `script` tag in our HTML.

In an IIFE, we can execute all of the code we want without any global variables getting created (unless we want to, which I'll cover in a second). Here's an example of both cases:

```
let rube = 'Homer Simpson';
function changeRube(str) {
   rube = str;
}
changeRube('Barney Gumble');
console.log(rube); // Barney Gumble

(function moesTavern() {
  let lastName = 'freely';
  let initials = 'I.P';
  console.log(`Uh, is ${initials} ${lastName} here? Hey, everybody! ${initials} ${lastName}!`)
})();
console.log(lastName); // nope!
```

As you can see, our `rube` variable is globally accessible. We can change it within a function, and it changes in the outside world. That's fine but could be a problem in some cases. By using an IIFE, we keep our variables contained. And if we absolutely need to create a global within an IIFE (hint: you almost definitely don't), here's how to do it:

```
(function() {
  let privateVar = 'Private!';
  window.publicVar = 'Public!';
})();
console.log(publicVar); // Public!
console.log(privateVar); // undefined
```

IIFEs aren't as necessary as they used to be; JavaScript bundling using `import` or `require` does basically the same, thing, keeping variables scoped within their module. Still, it's excellent practice to wrap anything you're sending out to the public in an IIFE in order to make sure you're not screwing with someone else's variables. It's just the right thing to do!

See you next week.

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
