### JS Quick Hits: The Rest Operator

In my previous tutorial I mistakenly said that the rest operator allowed you to get the rest of an array. This is sort of true, and sort of not. It allows you to get the rest of *any arguments passed into a function* as an array. Mea culpa!

JavaScript has always allowed you to send an arbitrary number of arguments to a function, even beyond those actually defined in said function, and then made those available as an `arguments` variable within the function. You could then iterate over the arguments, like this:

```
function logNames() {
  for (var i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
}
logNames('Bob', 'Jen', 'Cam', 'Pratik'); // Bob Jen Cam Pratik
```

The problems that arise are:

  1. You can't use all of the various `Array` methods on the arguments object, because it's not an array.
  2. The arguments object *includes* any arguments you **did** define as parameters

So, for example, this code is problematic:

```
function logNames(name1, name2) {
  console.log(name1);
  console.log(name2);
  for (var i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
}
logNames('Bob', 'Jen', 'Cam', 'Pratik') // Bob Jen Bob Jen Cam Pratik
```

We have two parameters defined, and are using those, but we also want to handle any other arguments passed to the function. However, we don't want to repeat Bob and Jen, there, right? So that's where the new rest operator comes in. Check this out!

```
const logNames = (name1, name2, ...names) => {
  console.log(name1);
  console.log(name2);
   for (let i = 0; i < names.length; i++) {
    console.log(names[i]);
  }
}
logNames('Bob', 'Jen', 'Cam', 'Pratik'); // Bob Jen Cam Pratik
```

We're literaly getting the *rest* of the arguments, rather than all of them (since the first two parameters cover the first two arguments). What's that, you say? You'd like to see it in action with a function that's somewhat less stupid? Seems reasonable! Try this one:

```
const splitBill = (numPeople, tipPercent, ...prices) => {
  let total = 0;
  for (let i = 0; i < prices.length; i++) {
    total += prices[i];
  }
  total += total * tipPercent;
  return total / numPeople;
}
const totalPerPerson = splitBill(3, 0.2, 24, 26, 14, 18, 17, 21);
console.log(\`Each person owes $${totalPerPerson}\`); // Each person owes $48
```

As you can see, that's really handy for working with functions that are built to take an arbitrary number of arguments but still do something useful with them.

Next week we're going to talk about template literals, which we're using again up above with `${totalPerPerson}`. Then, the following week, we'll cover the spread operator, which has some similarities to the rest operator but is used differently.

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*