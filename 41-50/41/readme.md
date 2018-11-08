**JS Quick Hit: Immutable Maps**

Video URL: https://youtu.be/FVq5-zAfBTY

I had a couple of mentions over in the [CloseBrace Weekly Keybase Channel](https://keybase.io/team/closebraceweekly) that people wouldn't mind more Immutable.js tutorials, so I thought we'd take a quick look at Immutable maps, which are like objects, only, well &hellip; better, really. Immutable maps have many more built-in methods than JavaScript objects, and of course, they're immutable, which means a vastly reduced risk of accidentally changing your data when you don't want to.

Much like with the previous tutorial on Immutable lists, we're not going to be able to cover even a fraction of what you can do with Immutable maps. This is just a brief overview to give you the basic idea and get you set up to explore on your own!

Quick note: we're running a Node.js app again for this tutorial. You can find full setup instructions in [tutorial 32](https://closebrace.com/tutorials/2018-08-29/js-quick-hits-32-node-module-2-building-the-module), and abbreviated ones specific to using Immutable.js in [tutorial 39](https://closebrace.com/tutorials/2018-10-17/js-quick-hits-39-intro-to-immutable-js)

Here's the stuff you'll need for the node app to work:

```
const Immutable = require('immutable');
```

Whew! Wipe the sweat from your brow. That was tough work! All right, moving on to our actual code. Let's start by building a map, like this:

```
const user = Immutable.Map({
  firstName: 'Corey',
  lastName: 'Smith',
  age: 32,
  username: 'ElCapitan',
  location: 'East Greenwich, RI, USA',
  ownsBoat: true,
  occupation: 'Charter Fishing',
});
```

Mister Corey Smith is now an Immutable map, rather than a plain JavaScript Object. We can still `console.log` it like an object, but it'll self-identify as a Map. Observe:

```
console.log(user); // our user Map
```

We cannot, however, access its properties the way we would a JavaScript object. Watch:

```
console.log(user.username); // undefined
```
We have to use `.get` instead, like this:

```
console.log(user.get('username')); // ElCapitan
```

This will seem annoying at first, but I find it useful: helps you remember that you're working with immutable values rather than mutable ones. To prove that, let's try to change a value:

```
user.username = 'BoatMaster';
console.log(user.get('username')); // ElCapitan
```

Nope, that doesn't work. For one thing, much like needing to use `.get` to access properties, we need to use `.set` to change them. And of course, since this is Immutable.js, the original map doesn't change. Instead you're given a new map to work with that contains your changes. Here's an example:

```
const newUserData = user.set('username', 'BoatMaster');
console.log(newUserData.get('username')); // BoatMaster
console.log(user.get('username')); // ElCapitan
```

Immutable maps have a *lot* of built-in functionality that ordinary JavaScript Objects don't have. I could write tutorial after tutorial on all of the built-in methods, but let's just highlight one here. Ever wish you could easily find the name of a key that contains a specified value? Well, `.findKey` will get the job done for you with minimal fuss. Here's an example:

```
const key = user.findKey((value) => value === 'East Greenwich, RI, USA' );
console.log(key); // location
```

You can see here that `.findKey` runs through the values of the map, and then if we have a value that matches a certain, well, value, then it returns the key.

Need to return to raw JavaScript for some reason? No problem. Immutable has several different methods that allow for quick conversion. You could use `.toObject`, but that's a shallow conversion, meaning if you had nested Immutable maps, they'd stay maps. If you want to deep-convert, try `.toJS`. Here's an example, although since our map is only one level deep, it doesn't matter which of the two we use here:

```
const mutableUser = user.toJS();
console.log(mutableUser.occupation); // Charter Fishing
mutableUser.age = 40;
console.log(mutableUser.age); // 40
```

Note, of course, that our original map is still a map. The conversion creates a new object; it doesn't modify the original one. We can see that by trying to log a property, getting undefined, and then using `.get` instead. Or we could use the `Map.isMap` method.

```
console.log(user.age); // undefined
console.log(user.get('age')); // 32
console.log(Immutable.Map.isMap(user)); // true
```

So there you have it. You now know how to create Immutable lists, which are analagous to arrays, and Immutable maps, which are analagous to objects. Interested in learning more? Drop me a line or join the [CloseBrace Weekly public Keybase channel](https://keybase.io/team/closebraceweekly) and let me know!

Until next time.

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*