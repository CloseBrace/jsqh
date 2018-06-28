### JS Quick Hits: Prototypes Part 2

Video URL: https://youtu.be/PXPO-lC-Y9s

Last week we got started with prototypes, explaining how whenever you create a new object, array, or other type, it gets created from a master constructor that has certain methods attached to it, and your new variable gets access to those methods. We also showed how to create our own constructor functions that allow us to create new objects that inherit properties from those constructors, but noted that these are not really prototypes, because the properties are duplicated in the child object, instead of living in the parent and being accessed via the prototype chain.

This week, we're going to quickly show you how to change that. First, let's create a constructor:

```
const Actor = function(name, roles) {
  this.name = name;
  this.roles = roles;
}
```

Now, let's say we wanted to create a `listRoles` method. We could of course put it right there in the constructor, but as we mentioned, then every single child object we made would duplicate the method. Due to the prototype chain, and the fact that the JS engine will always look up the chain to see if a method is available, that's unnecessary. So let's add the new method as a prototype of the `Actor` constructor, like this:

```
Actor.prototype.listRoles = function() {
  let str = `${this.name} has played `;
  const len = this.roles.length;
  for (i = 0; i < len; i +=1) {
    str += this.roles[i];
    if (i === len - 2) {
      str += ', and ';
    }
    else if (i === len - 1) {
      str += '.';
    }
    else {
      str += ', ';
    }
  }
  console.log(str);
}
```

All it takes is that `.prototype` in the first line to tell JavaScript that this method should be part of the prototype, rather than copied each time. Super easy. Let's take a look at it in action. First we'll create a new actor. I just went on a mild Marvel binge recently, so Scarlett Johansson comes to mind.

```
const scarJo = new Actor(
  'Scarlett Johansson',
  ['Black Widow', 'Major', 'Lucy', 'Kaa', 'Charlotte' ]
);
```

Now, when we `console.log` our `scarJo` object, the `listRoles` method doesn't show up. Watch:

```
console.log(scarJo);
```

But you can still use it, like this:

```
scarJo.listRoles(); // Scarlett Johansson has played Black Widow, Major, Lucy, Kaa, and Charlotte.
```

That's awesome! Note that if you expand the `__proto__` arrow you can see methods inherited from the prototype. That can be handy, especially if you're working with 3rd party code.

Another cool thing about prototypal inheritance is that you can add to the constructor's prototype after the fact and your child objects still gain the functionality. Watch:

```
Actor.prototype.addAge = function(age) {
  this.age = age;
}
```

Now we can use that method, even though we're adding it later in the code than we created our scarJo object, see?

```
scarJo.addAge(33)
console.log(scarJo);
```

Again, the `addAge` method isn't listed, except under `__proto__`, but the age is!

Prototypal inheritance is immensely powerful, especially in large code bases where you're creating tons of objects. It's also super useful for keeping things organized, due to property enumerability. We talked a bit about enumerability in a previous tutorial, but we're going to cover it in more depth next week. See you there!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*