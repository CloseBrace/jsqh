**JS Quick Hit: Increment/Decrement Operators**

Video URL: https://youtu.be/oY3NL9PhLFc

We're going to keep it short today. I was inspired to talk about this week's subject by a question asked in the [CloseBrace Weekly Keybase Team's](https://keybase.io/team/closebraceweekly) chat channel. Let's talk a little bit about the `++` and `--` operators (along with `+=`). I imagine most of the people reading this have used `++`, at very least, since it shows up in a _ton_ of `for` loops, like this:

```
for (let i = 0; i < 10; i++) {
    console.log(i);
}
```

Which will log zero through nine to the console. If you need me to do a complete tutorial on `for` loops, please let me know!

What's interesting about these increment operators, though, is that you can change the order of the operator, and get differing results. Not in a `for` loop, but in other usage. Here's an example:

```
let a = 15;
let b = a++;
console.log(b); // 15
console.log(a); // 16
```

So, this seems weird, right? We've incremented `a`, so why is `b` still fifteen? The answer is because if the operator is after the variable, it happens after the assignment. So basically that code is going "b equals a, then add one to a". This is one of two reasons (the other being differing behavior when it comes to automatic semi-colon insertion, which maybe we'll talk about in another tutorial) that a lot of linting configurations recommend using `+= 1` instead of `++` or `-= 1` instead of `--`. But there's nothing inherently wrong with sticking to the operator so long as you understand how it works.

Here's what to do if you want to get the incremented (or decremented) value into your new variable:

```
let r = 20;
let s = ++r;
let t = --r;
let u = r--;
console.log(r); // 19
console.log(s); // 21
console.log(t); // 20
console.log(u); // 20
```

As you can see, the operator's always running on `r`, which is how we end up with it at `19` (20 + 1 - 1 - 1). But the value our other variables get depends on whether we put the operator before or after `r`. Let's do one more, where we log our base variable as we're modifying it, just to be clear:

```
let n = 84;
console.log(n); // 84

let o = n++;
console.log(o); // 84
console.log(n); // 85

let p = ++n;
console.log(p); // 86
console.log(n); // 86

let q = n--;
console.log(q) // 86
console.log(n) // 85
```

Pretty simple, right? But a really important thing to be aware of while coding! If you're going to use math operators that increment and decrement your numbers, be aware of their positioning.

That's it for this week. We'll be back with something a little more complex next time. See you then!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*