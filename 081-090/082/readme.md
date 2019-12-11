**JS Quick Hit: Chaining Object Methods**

Video URL: https://youtu.be/e9YZYpA2q6M

If you've worked with jQuery (a library that's gotten something of a tarnished reputation recently but which helped an awful lot of people, including me, get their start with JavaScript), you've probably used its chained methods many times over, for example:

```
$('#myDiv').addClass('active').show();
```

You don't need a third-party library to allow that kind of method chaining. You just have to plan for it in your object constructors. Today, we're going to learn how to easily do that. We talked about constructors back in [JS Quick Hits 22](https://closebrace.com/tutorials/2018-06-20/js-quick-hits-22-prototypes-part-1), in case you need a refresher. They're just functions that you can use to generate new objects with default properties, methods, and the like. Here's one:

```
const Dog = function(name, breed, sex) {
  this.name = name;
  this.breed = breed;
  this.sex = sex;

  this.greet = () => `Hello, ${name}!\n`;
  this.describe = () => `You are a ${breed}. What a good ${sex === 'm' ? 'boy' : 'girl'}!\n`;
}
```

Those `\n`s, by the way, just add new lines in the console. We're also using template literals ([JS Quick Hits 7](https://closebrace.com/tutorials/2018-03-07/js-quick-hits-7-template-literals)) and a ternary operator ([JS Quick Hits 9](https://closebrace.com/tutorials/2018-03-21/js-quick-hits-9-ternary-operators)) in there, just to keep things clean. Anyway, let's use our constructor and its methods without any chaining, like this:

```
const bort = new Dog('Bort', 'Boston Terrier', 'm');
console.log(bort.greet() + bort.describe());
```

That works as expected, producing two nice lines of text. Let's take a look at what happens if we try to chain our methods, though:

```
const tessa = new Dog('Tessa', 'German Shepherd', 'f');
console.log(tessa.greet().describe()); // type error!
```

&hellip; nope. That's giving us an error, and for good reason. Our `greet` method returns a string. That string would have access to JavaScript's built-in string methods like `toUpperCase`, but it's not going to have the `describe` method, because that method exists on our constructor. In order to access methods in succession, each method needs to return the entire object, accessed with the `this` keyword. Here's how to write a better, chainable constructor:

```
const BetterDog = function(name, breed, sex) {
  this.name = name;
  this.breed = breed;
  this.sex = sex;
  this.string = '';

  this.greet = () => {
    this.string += `Hello, ${name}!\n`;
    return this;
  };

  this.describe = () => {
    this.string += `You are a ${breed}. What a good ${sex === 'm' ? 'boy' : 'girl'}!\n`
    return this;
  }

  this.print = () => this.string;
}
```

Because our `greet` and `describe` methods are now returning the entire object, instead of a string, we can continue to access methods. Of course, we need to have a print method that actually returns our string. By the way, I know arrow functions are still confusing for a lot of folks, so if you need a refresher, check out [JS Quick Hits 12](https://closebrace.com/tutorials/2018-04-11/js-quick-hits-12-arrow-functions-part-1) and [JS Quick Hits 13](https://closebrace.com/tutorials/2018-04-18/js-quick-hits-13-arrow-functions-part-2). Anyway, let's check out our now fully operational chaining with this code:

```
const mrChops = new BetterDog('Mr. Chops', 'Beagle', 'm');
console.log(mrChops.greet().describe().print()); // there we go
```

Cool. We also don't have to use the chain in that exact order, though this code is going to produce a result that's a little odd:

```
const ladyChocolate = new BetterDog('Lady Chocolate', 'Labrador Retriever', 'f');
console.log(ladyChocolate.describe().greet().print()); // weird ... but ok
```

One caveat, of course, is that you can't chain a method if it doesn't return `this`, so for example we can't stick our `print` method into the middle of the chain. It'll just give the same type error as we got in our Tessa example above. Observe:

```
console.log(ladyChocolate.greet().print().describe().print()); // type error
```

So, there you have it, a basic introduction to chaining using object constructors. Go forth and chain away &hellip; preferably with something a little more useful (although perhaps less gratifying, depending on your preferences) than greeting dogs.

See you next week!


_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
