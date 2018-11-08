**JS Quick Hit: Immutability Approaches**

Video URL: https://youtu.be/0Oknt9Cy6fM

In the [previous tutorial](https://closebrace.com/tutorials/2018-10-03/js-quick-hits-37-immutability-basics), we talked about immutability and how some methods mutate data while others do not. This week, we're going to look into why you might find it beneficial to work with immutability in mind while programming, regardless of whether you're writing pure functional code, object-oriented code, or a hybrid of the two. This is a bit more of a theoretical topic than I normally cover, but I think it's good stuff to keep in mind!

We talked previously about the fact that JavaScript doesn't support immutability for arrays or objects out of the box, but that's not entirely true. In ES2015, `Object.assign` was introduced, which we covered back in [tutorial 20](https://closebrace.com/tutorials/2018-06-06/js-quick-hits-20-object-assign-basics) and [tutorial 21](https://closebrace.com/tutorials/2018-06-13/js-quick-hits-21-object-assign-issues). `Object.assign` allows you to create new objects from existing ones. ES2015 also added `Object.freeze`. This method allows you to, well, freeze your objects. It also allows you to freeze arrays, because almost everything in JavaScript is technically an object. I still think they should've created an `Array.freeze` method to be more explicit, but I'm not on the standards board so I guess I can't complain!

Anyway, you can't add, remove, or change properties in a frozen object, or values in a frozen array. Observe!

```
const game = {
  genre: 'Action',
  numEditions: 7,
  rating: 'M',
  releaseDate: 'October 5th, 2018',
  setting: 'Greece',
  title: 'Assassin\'s Creed Odyssey',
};

console.log(game); // the object

Object.freeze(game);

game.genre = 'Action-Adventure'; // throws an error in strict mode
delete game.rating;

console.log(game); // still the original object
```

That's handy for making sure you're not accidentally modifying data, but only sort of &hellip; first, `Object.freeze` is shallow, which means it only freezes the top properties. If you're nesting objects, all of those sub-objects remain unfrozen. You'd have to write a function that goes through the entire tree recursively and freezes every object's property. That's tedious.

Second, `Object.freeze` is one-way. Once the object or array is frozen, you can't unfreeze it. This isn't that big of a deal, however, since you can *clone* a frozen object and modify the clone, like this:

```
const newGame = {...game};
newGame.genre = 'Action-Adventure';
delete newGame.rating;
console.log(newGame); // modified object
```

As you can see, we can happily edit our `newGame` object even though the object from which it was cloned is frozen. In this way, we're adopting immutable-centric data manipulation methods.

Oh, a third reason to be wary of `Object.freeze`: it's really slow. Using it on large objects or arrays can create significant performance issues, so I don't recommend that. My guess is that in another year or two, various JavaScript engines will have sped this method up significantly, but for now, approach with caution. 

Interestingly, working with immutable data itself tends to be much *faster* because, among other reasons, it vastly speeds up comparisons. To get this speed boost without worrying about `Object.freeze`, you'll need a third-party library. We'll talk a bit about those in the future.

So, great, we know how to freeze our data and then use clones to make changes &hellip; what's the point? Well, the truth is that in small, simple programs, you're not going to gain much from immutable data. It's larger-scale applications that really benefit, both in terms of speed optimizations and also data integrity. Immutability allows you to do things like undoing a change (or, with some solid coding, infinite undos/redos). It also helps prevent against race conditions, where two asynchronous functions are trying to change the same data, leading to one of them overwriting the other.

I told you last week that I'd also explain why I tend to work using immutable approaches, rather than mutable ones. Part of it is because I do a lot of my work in [React / Redux](http://fiveminutereact.com), and the way both component and application state is handled in those frameworks makes it practically required (it *is* required with Redux). The other part is because I like to break things up into small functions for ease of readability and potential re-use. Observe the following simple functions:

```
const addOne = (arr) => {
  arr.push(arr.length + 1);
  return arr;
}

const logArrays = () => {
  const nums = [1, 2, 3, 4, 5];
  console.log(nums); // 1, 2, 3, 4, 5
  const newNums = addOne(nums);
  console.log(newNums); // 1, 2, 3, 4, 5, 6
  console.log(nums); // 1, 2, 3, 4, 5, 6
}

logArrays(); // ... d'oh.
```

See the problem? The `addOne` function is mutating the array established in the `logArrays` function, but when quickly glancing over the code, that's very much not obvious, *especially* because the `addOne` function is also returning a new value, which makes it look like an immutable function. Confusing, frustrating, and potentially a source of bugs. Here's what I believe is a better approach:

```
const addOneFixed = (arr) => {
  const newArr = [...arr];
  newArr.push(arr.length + 1);
  return newArr;
}

const logArraysFixed = () => {
  const nums = [1, 2, 3, 4, 5];
  console.log(nums); // 1, 2, 3, 4, 5
  const newNums = addOneFixed(nums);
  console.log(newNums); // 1, 2, 3, 4, 5, 6
  console.log(nums); // 1, 2, 3, 4, 5
}

logArraysFixed(); // much better!
```

By adding a single line, we use variable destructuring to clone the array and modify the clone. Note that we haven't actually made either array immutable (though we COULD use `Object.freeze` on the initial array, if we wanted to, and this code would still work). Instead, we're just using an immutable approach to coding, which helps keep our data integrity intact even without relying on true immutability.

That said, true immutability is valuable. It helps make sure that the code doesn't break your data without relying on the coder to always remember to create clones. For that reason, we're going to take a brief peek at Facebook's immutable.js library next week. It's a huge, powerful library, but don't worry, we're just going to dip a toe in and get an idea for how it works.

See you then!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*