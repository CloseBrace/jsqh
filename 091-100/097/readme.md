**JS Quick Hit: JavaScript Sets**

Video URL: https://youtu.be/fmCVh3nxzaE

Last week we talked about maps, which are like objects but a little bit different. Today we're going to talk about sets, which are like arrays but&mdash;hang on while I shock you&mdash;a little bit different. Sets are, to get technical, iterable collections of unique elements. That "unique" in there is extremely important. Unlike arrays, sets cannot contain two identical values. So, this is fine:

```
const ages = [27, 19, 43, 58, 21, 94, 27, 32, 70, 43];
```

But if you convert the array to a set, you're going to lose the duplicates, like this

```
const ageSet = new Set(ages);
console.log([...ageSet]); // [27, 19, 43, 58, 21, 94, 32, 70];
```

As you can see, the later instances of `27` and `43` are missing, because they're duplicates of earlier entries. It's very important to be aware of this, and consider it when working with sets and arrays in the same project. Converting arrays to sets can be very useful, but has to be handled with care!

So, why would we want to use sets? Well, for one thing, being able to be certain your data only contains unique values is useful in all kinds of ways. In the above example, suppose we just want to list all of the ages of people in a group. There's no reason to list duplicates, so we could store our data in a set and know that even as we add people to the group, we're not adding duplicates, because if you try to add a duplicate value to a set, it just gets ignored.

Other reasons to use sets? Well, because of the required uniqueness &hellip; is that a word? Uniqueosity? Anyway &hellip; of the data, you can do some tasks very quickly. For example, want to check if your data contains a certain value? It's easy:

```
console.log(ageSet.has(27)); // true
console.log(ageSet.has(29)); // false
```

Want to add new data, without worrying whether it's unique or not? Also easy!

```
ageSet.add(30); // new
ageSet.add(58); // already there
console.log([...ageSet]); // [27, 19, 43, 58, 21, 94, 32, 70, 30]
```

Also, as you can see by those console logs, converting a set into an array is as easy as using our old friend the spread operator. You remember them from [JS Quick Hits 8](https://closebrace.com/tutorials/2018-03-14/js-quick-hits-8-the-spread-operator), right?

Let's remove an item and then get the resulting number of items left in the set:

```
ageSet.delete(21);
console.log(ageSet.size); // 8
```

It's also very easy to iterate over sets using the `for of` loop, which we talked about in [JS Quick Hits 4](https://closebrace.com/tutorials/2018-02-14/js-quick-hits-4-for-of-loop). Let's do that with a new set, so we can also show that sets can contain any kind of data, not just numbers:

```
const mixedData = new Set();
mixedData.add('Baby Yoda');
mixedData.add(2019);
mixedData.add({ thisIsAnObject: true, canYouUseObjectsInSets: 'yes'});
mixedData.add([1,2,3,4]); // you can also hold arrays in sets

for (let item of mixedData) {
    console.log(item);
}
```

There we go, we're logging each item in our set, which as you can see contains all kinds of data types. You can also use `forEach`, like this:

```
mixedData.forEach(item => console.log(typeof item)); // string, number, object, object
```

Remember that arrays are objects, as far as `typeof` is concerned.

One quick gotcha to be aware of: you can have two objects in a set that look identical. This is because each object is its own thing, as far as JavaScript is concerned, even if it contains identical values to another object. That includes arrays, so, yes, a set can contain two identical arrays of data.

So, that's about it for an introductory look at sets. They're really handy if you want an array-like iterable that guarantees each item it contains is unique (within the constraints already mentioned).

Next week, on the day after Thanksgiving when half the people in the United States will be out shopping instead of checking their emails, we'll take a look at weak maps and sets, and explain how they differ from their non-weak counterparts.

See you then!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
