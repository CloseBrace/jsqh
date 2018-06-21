### JS Quick Hits: Prototypes Part 1

Video URL: https://youtu.be/MVMsqBfUBNU

Let's talk about Prototypes! JavaScript is a prototype-based language, rather than class-based. I don't want to dive into a complete explanation of what that means because this isn't a computer science textbook, but what it comes down to is that all of the basic types you use in JavaScript come from an existing prototype (which are themselves usually objects or primitives, but that's also getting deeper than I want to go). `Object`, for example, or `Array` &hellip; if you've worked with JS for any significant amount of time, you'll know that these types all have methods associated with them. For example, here are an array and an object:

```
const characters = ['Mario', 'Samus', 'Megaman', 'Kirby', 'Link'];
const nintendoSwitch = {
  portable: true,
  price: 299,
  graphicsCard: 'Nvidia',
}
```

Now, we know we can use various methods on those variables, right? Like this:

```
const shoutCharacters = characters.map((name) => name.toUpperCase());
console.log(shoutCharacters); // ['MARIO', 'SAMUS', 'MEGAMAN', 'KIRBY', 'LINK']

const hasPropPrice = nintendoSwitch.hasOwnProperty('price');
console.log(hasPropPrice); // true
```

So, the question is: where are those methods coming from? We didn't define them, after all. The answer is, they're coming from the prototype from which all base types are built. When you create an object, for example, the JavaScript engine goes "Hmm, OK, time to make an object. How do I do that?" and then consults its list of prototypes. It finds the built-in `Object` constructor and then builds a new object using the additional data you've provided. So you get your shiny new `nintendoSwitch` object with its three properties, `portable`, `price`, and `graphicsCard`, but you also get all of the methods that are built in to the Object proptotype.

Quick side note: strings are primitives, but the JS engine automatically wraps them in an object while performing certain actions, which is why you can do:

```
const game = 'Super Smash Bros. Ultimate';
console.log(game.length); // 26
```

But you can't do this:

```
game.myValue = 'test';
console.log(game.myValue); // undefined
```

The string isn't an object. It's just temporarily being wrapped with one by the JS engine while it runs the `.length` method.

This prototype inheritance is immensely powerful. For one thing, it allows us to use the wide variety of built-in methods that come with objects, arrays, strings, and so forth. That's great, and obviously a core aspect of programming in JavaScript, but equally important (if not moreso) is the fact that you can create your own constructor objects, and gain the benefits of this prototypal inheritance. You do this using functions. Note that by tradition, constructors begin with a capital letter. Observe!

```
const SwitchGame = function(price, title) {
  this.price = price;
  this.title = title;
  this.givePrice = function() {
    return `The price of ${this.title} is $${this.price}`;
  };
};

const smashBros = new SwitchGame('54.99', 'Super Smash Bros. Ultimate');

console.log(smashBros); // SwitchGame {price: "54.99", title: "Super Smash Bros. Ultimate", givePrice: ƒ}
console.log(smashBros.givePrice()); // The price of Super Smash Bros. Ultimate is $54.99
```

As you can see, we're getting values from our constructor. Notice also that we can see the `givePrice()` method. That's because constructors don't actually assign prototype methods, so in this case that method will get recreated with every new object you create from the constructor. This is not always desireable or necessary, because JavaScript knows how to *look up the chain* to see if a method exists at any stage, all the way up to the original Object prototype, which delivers methods like `hasOwnProperty()`. See?

```
console.log(smashBros.hasOwnProperty('title'); // true
```

So, next week we'll talk about how to assign methods to an object's prototype, thus meaning it only gets instantiated once no matter how many child objects you create. Hooray, performance gains!

In the meantime, do you want to change something after the fact? Not a problem. We can overwrite values that came from the constructor. Here's an example:

```
smashBros.price = '59.99';
console.log(smashBros.givePrice()); // The price of Super Smash Bros. Ultimate is $59.99
```

JavaScript constructors and prototypes are complex and there's a lot to learn. We'll cover a bunch more next week. See you then!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*