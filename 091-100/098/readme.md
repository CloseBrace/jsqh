**JS Quick Hit: Weakmaps and Weaksets**

Video URL: https://youtu.be/yxKgh02b8eI

We've talked about `map`s and `set`s for the last couple of weeks, and now it's time to talk about weak versions of those two data types. `weakmap`s and `weakset`s are not so-called because they have puny little child arms. You do not need to shout "bro, do you even lift?!" as you employ them. What the "weak" is referring to is how the keys and/or values are referenced. We'll explain that in a second, but first we have to talk about some SIGNIFICANT differences between the weak and non-weak versions of these collections of data.

You may remember with `map`s, our keys can be anything - a string, a number, even a function. Not so with `weakmap`s. Their keys can _only_ be objects. Keep in mind that lots of things in JavaScript are objects, including arrays and functions. Anyway, this won't work:

```
const wm1 = new WeakMap();
wm1.set('testkey', 'testvalue');
```

In fact, it will throw an error and stop your JS execution entirely if you don't wrap it in a `try / catch` block. If you want your code to work, try this:

```
const obj = { name: 'Chris '};
wm1.set(obj, 'testvalue');
console.log(wm1.get(obj)); // testvalue
```

Note that, as this example makes apparent, _values_ can be anything. Strings, numbers, functions, etc. But the keys have to be objects.

For `weakset`s, there's a similar rule. The entries must be objects. So, again, you can't do this:

```
const ws1 = new WeakSet();
ws1.add('testvalue');
```

That will give you a script-breaking error (unless you catch said error). Instead, you need to do something like this:

```
const obj = { name: 'Chris '};
ws1.add(obj);
console.log(ws1.has(obj)); // true
```

So &hellip; why all the insistence on objects? The answer is garbage collection. Hang on for a sec, we're about to go kind of deep into how applications work, in a way that a lot of JavaScript programmers literally never have to deal with. When the JavaScript engine is evaluating your code, it ends up having to store a lot of stuff in memory. For example&mdash;and we're keeping this simple, the actual process is a bit more complex&mdash;if you have an object with a bunch of properties, those properties are stored in memory for quick and easy access as the code is executing. When you overwrite that object later with an empty object, those old property values no longer exist, so they're no longer needed, so they get removed from memory. That's garbage collecting in a nutshell.

Again, the actual process is a lot more nuanced. JavaScript handles it automatically, which is why many programmers never need to really think about it in a way that, say, low-level machine code programmers need to. Hooray, web development! However, this also means that the JS engine's not always sure whether it's going to need values, and it may keep stuff around that's not actually needed. So if you want to be more explicit in your memory management, you can use `weakmap` and `weakset` to explicitly tell the JS engine "hey, as soon as the objects stored here are no longer referenced elsewhere in the code, clean 'em out of memory."

There are all kinds of uses for this, one of them being handling private data that should only be accessible to a particular function, rather than the broader codebase. If you'd like an entire tutorial on that, I recommend [this blog post by Nick Fitzgerald](https://fitzgeraldnick.com/2014/01/13/hiding-implementation-details-with-e6-weakmaps.html) which explains how to do it _and_ why it's a good idea (for one thing, it means you don't have to trust people consuming a public API to ignore methods or data you've designated as private).

One last thing to note about `weakmap` and `weakset`: they are suuuuper not-iterable/enumerable. This, again, has to do with garbage collection. By introducing references to what the `weakmap` or `weakset` contains, you're requiring that data to be kept in memory in ways that defeat the purpose of not just using `map` or `set`. So none of the following will work!

```
for (let [key, value] of wm1) {
  console.log(key, value); // nope
}
const keys = wm1.keys(); // nooope
ws1.forEach(item => console.log(item)); // noooooooope
```

So, yeah &hellip; look, I understand that most of this tutorial was telling you what you _can't_ do with `weakmap` and `weakset` but that's only because they behave very differently from much of the JavaScript stuff we encounter on a day to day basis. Gotta compare and contrast them against something, right? You may never have much use for either of them in your code, but if and when you start dealing with public/private data concerns or large applications with gigantic memory footprints that need active management, you may well find that the value they offer is very real. Better to know about them and never need them, than to need them and never know about them.

Next week, we're on to a new topic. What will it be? I have no idea yet, but I'll see you then!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
