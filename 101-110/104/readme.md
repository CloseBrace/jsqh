**JS Quick Hit: Errors vs. Exceptions**

Video URL: https://youtu.be/M7WCzkXz67U

This week we're going to answer a question that one of the folks in the CloseBrace Slack workspace had: what's the difference between errors and exceptions?

By the way, want to come hang out in the Slack channel? It's open to the public. Just email [contact@closebrace.com](mailto:contact@closebrace.com) or reply to this newsletter asking for an invite!

Anyway, the difference between errors and exceptions in JavaScript is: nothing. They're just two words for the same thing. Sweet! With that answered, let's call it a week and I'll see you next ti&mdash;

Okay, sure, we can do better than that. So, what do I mean when I say there's no difference? Well, basically it just means the two terms are synonymous. In fact, JavaScript has no real concept of an "exception" &ndash; all it handles are errors, which you can produce like this:

```
try {
  throw new Error('Oh no, the barbarians have broken down the gate and are stealing our data!');
} catch (e) {
  console.log(e.message);
}
```

We talked about the `Error` constructor and how it works in [JS Quick Hits 68](https://closebrace.com/tutorials/2019-05-15/js-quick-hits-68-the-error-constructor) and [JS Quick Hits 69](https://closebrace.com/tutorials/2019-05-22/js-quick-hits-69-custom-errors), so if you need a refresher, that's the place to check.

Now, by _convention_, what I just did was throw an exception. What I mean is: some developers like to make the distinction between when your code blows up because you did something wrong, and when you intentionally throw an error in order to catch unwanted behavior. So, this is an error:

```
const str = "You can't change this";
str = "But I want to change it!"
```

Because you're trying to change a const, so JavaScript is going to yell at you. You're not generating the error yourself. You just wrote broken code. So that's an error.

_This_ is an exception:

```
const input = 2000 // pretend this value came from a form field, or similar
try {
  if (input > 1000) {
    throw new Error('Sorry, the value must be less than 1000');
  }
} catch (e) {
  console.log(e.message); // Sorry, the value must be less than 1000
}
```

You're intentionally throwing (and handling) an error, here, and that's what makes it an exception. This is good to know, just so you can better understand what other developers are talking about when you're ~~copying and pasting their code off Stack Overflow~~ chatting with them.

That's all there is to errors and exceptions, for real this time. See you next week!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
