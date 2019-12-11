### JS Quick Hits: Default Parameters

Video version: https://youtu.be/Ef0tboGzl4o

We've got another cool ES2015 feature for you this week, default parameters. In the past, if you wanted a function's parameter to have a default setting, you had to check and see if it had been passed a value and, if not, set it, like this:

```
function greetUser(name) {
  if (typeof name === 'undefined') {
    name = 'Anonymous';
  }
  console.log('Hello, ' + name + '!');
}
greetUser(); // Hello, Anonymous!
greetUser('Immortan Joe'); // Hello, Immortan Joe!
```

That's kind of tedious though, right? ES2015 introduces a much better, cleaner way to do it. You can now define a default right in the function declaration. If you pass a value, it'll override the default. If not, the default will be used. Observe!

```
const describeUser = (adj = 'shiny and chrome') => {
  console.log(`You're very ${adj}!`);
}
describeUser(); // You're very shiny and chrome!
describeUser('belligerent'); // You're very belligerent!
```

Be careful, though, of passing falsey values as parameters. `undefined` will trigger the default, but no other falsey values, such as `null` or `false` will. So this code returns possibly undesired results:

```
describeUser(undefined); // You're very shiny and chrome!
describeUser(null); // You're very null!
describeUser(false); // You're very false!
```

It's also important to note that defaults are generated at run-time and aren't global, so you can't, for example, keep using a function to append to an Array. This code will generate two different arrays:

```
const addWarBoy = (name, warBoys = ['Nux', 'Slit']) => {
  warBoys.push(name);
  return warBoys;
}
console.log(addWarBoy('Ace')); // ['Nux', 'Slit', 'Ace'];
console.log(addWarBoy('Rictus')); // ['Nux', 'Slit', 'Rictus'];
```

That's no good. We want Ace *and* Rictus to take their proper place on the road to Valhalla. The way to do that, of course, is to take the returned array and pass it back into the function, overriding the default, like this:

```
const warBoys = addWarBoy('Ace');
console.log(addWarBoy('Rictus', warBoys)); // ['Nux', 'Slit', 'Ace', 'Rictus'];
```

Wanna see something weird? You can reference default parameters in later parameters. Here's an example:

```
const warParty = (numWarBoys = 3, numCars = numWarBoys / 2) => {
  const numCarsRounded = Math.ceil(numCars);
  console.log(`${numWarBoys} WarBoys need ${numCarsRounded} cars.`);
}
warParty(); // 3 WarBoys need 2 cars.
warParty(17); // 17 WarBoys need 9 cars.
warParty(25, 25); // 25 WarBoys need 25 cars.
```

"Do default parameters work with [variable destructuring](https://closebrace.com/tutorials/2018-02-21/js-quick-hits-5-variable-destructuring)?" you ask? Well, is Imperator Furiosa an unbelievable badass? The answer is, of course, yes. Witness me, bloodbag!

```
const Nux = {
  name: 'Nux',
  age: 24,
  occupation: 'driver',
};
const describeWarBoy = ({ name, age, occupation } = { name: 'Rictus', age: 30, occupation: 'heavy gunner' }) => {
  console.log(`${name} is ${age} years old and is a ${occupation}.`);
}
describeWarBoy(); // Rictus is 30 years old and is a heavy gunner.
describeWarBoy(Nux); // Nux is 24 years old and is a driver.
```

As you can see, default parameters are super flexible and can come in handy in a variety of situations. They're supported by all the latest browsers and every version of Node.js since at least 7.x ... and of course you can always transpile 'em down to ES5 with something like babel, if you need to.

Next week we're going to talk about object shorthand. That should be a quick one, but it's another time and code-saving ES2015 improvement that's well worth learning. See you then!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*