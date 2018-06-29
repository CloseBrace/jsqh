Since we spent the last couple of weeks talking about the prototype chain, it's definitely worth touching on something called property enumerability at the same time. This is a complex topic, but not one that I want to span out over multiple tutorials, so we're only going to touch on certain aspects of it. For example, I'm not going to talk about Symbols at all, because I don't think they're something that's used by most day-to-day JavaScript developers (am I wrong? Do you use Symbols all the time? Hit reply and let me know!).

So, let's talk first about `for ... in`. This is a built-in JavaScript approach to looping through object properties. We'll start by creating a constructor and then instantiating a new object, like we talked about [last week](https://closebrace.com/tutorials/2018-06-27/js-quick-hits-23-prototypes-part-2).

```
const Incredible = function(name, powers, age, hair) {
  this.name = name;
  this.powers = powers;
  this.age = age;
  this.hair = hair;
}

const mrIncredible = new Incredible('Bob Parr', ['Strength', 'Durability'], 40, 'blond');
```

And let's write a simple `for ... in` loop that iterates over the object and displays each property name, and the associated value, like this:

```
for (let prop in mrIncredible) {
  console.log(`${prop}: ${mrIncredible[prop]}`);
} // name: Bob Parr, powers: Strength,Durability, age: 40, hair: blond
```

Now let's add a prototype method and re-run our loop, with this code:

```
Incredible.prototype.shoutName = function() {
  console.log(this.name.toUpperCase());
};

for (let prop in mrIncredible) {
  console.log(`${prop}: ${mrIncredible[prop]}`);
} // d'oh ...
```

You may note that it's displaying our prototype method. That's not what we want, and it seems confusing. If it's displaying *that* prototype method, why isn't it displaying native ones like `hasOwnProperty`? The answer is, because those methods have their enumerability flag set to false. New methods that we create do not default to false, at least not when created by direct assignment like we did above.

Fortunately, we can change that after the fact using `Object.defineProperty` and then running our loop again. Try this:

```
Object.defineProperty(Incredible.prototype, 'shoutName', {
  enumerable: false,
});

for (let prop in mrIncredible) {
  console.log(`${prop}: ${mrIncredible[prop]}`);
} // hooray!
```

The `shoutName` prototype method's no longer showing up, which is what we want. But can we still use it? You bet! Check it out:

```
mrIncredible.shoutName(); // BOB PARR
```

`Object.defineProperty` also works just fine for non-prototype methods that you'd prefer not be enumerable. In fact, you can use it to define a new method entirely&mdash;you don't have to define the method first and then set its enumerability flag&mdash;and it'll default to false without you even having to tell it to. Watch:

```
Object.defineProperty(mrIncredible, 'listPowers', {
  value: function() {
    this.powers.forEach((power, index) => {
      console.log(`Power ${index + 1}: ${power}`);
    })
  }
});

for (let prop in mrIncredible) {
  console.log(`${prop}: ${mrIncredible[prop]}`);
} // hooray! again!
```

And of course, we can still use the `listPowers` method, like this:

```
mrIncredible.listPowers();
```

As you can see, property enumerability is really useful in keeping your objects "clean" ... it allows you to iterate over stored data while ignoring any methods you don't want the iterator looking at. One quick thing to note: by default `Object.defineProperty` also sets a property's `writeable` flag to false, which means you can't overwrite the method (or value! it doesn't have to be a function) using an assignment operator. That is to say:

```
mrIncredible.listPowers = 'now this is a string!';
```

Isn't going to work. If you're creating non-enumerable properties that you're going to want to reassign later (which is not something I prefer, but there are probably valid reasons for it here and there), you'll need to expressly set the `writeable` flag to `true`.

That's it for this week. See you next time!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*