**JS Quick Hit: Building the Node Module**

Video URL: https://youtu.be/iPLBPI1RvJo

Last week we talked about writing code that's built to run in Node.js. Today we're going to create our module and a file that imports the module, for testing purposes. We're also going to create a .JSON file just to show that Node.js also allows you access to the filesystem. Everybody ready?

First, create a clean directory with nothing in it. This will make life easier when we package things up in the next tutorial. You can name it "test" or "temp" or "puppiesrule" &hellip; doesn't matter.

Next up, in that directory, create a file called `test.json`. This is some of the data we're going to test with (we'll also do some testing with in-line data). Here's what it should look like:

```
[
  { "username": "CaptainCode" },
  { "age": 34 },
  { "email": "cap@therealcaptaincode.com" },
  { "fullName": "Leslie Smith" },
  { "favoriteColor": "Blue" },
  { "petType": "Hamster" },
  { "petName": "Mr. Chunkles" },
  { "booleanFan": true }
]
```

As you can see, that array's not in any particular kind of order. We're going to create a function that will sort it by key name (so, for example, `age` is going to come first, followed by `booleanFan`, and so forth). To do that, we need to create a new file called `index.js`. Inside we're going to add the meat of our code. We're even going to include an optional "options" parameter that'll allow us to sort by ascending (the default) or descending. Let's start with just opening and closing our function:

```
const sortByKeys = (json, options) => {
}
```

Now we'd like to handle json whether it's already been parsed, or not, so add this inside the function:

```
  // handle parsed or unparsed json
  let keyArray;
  typeof json === 'string' ? keyArray = JSON.parse(json) : keyArray = json;
```

Now let's do our sort and return a value. Below the code you just added, add the following:

```
  // sort the array
  keyArray.sort((a, b) => {
    const key1 = Object.keys(a)[0];
    const key2 = Object.keys(b)[0];
    // handle options
    if (options && options.sort === 'desc') {
      if (key1 < key2) { return 1; }
      if (key1 > key2) { return -1; }
    }
    else {
      if (key1 < key2) { return -1; }
      if (key1 > key2) { return 1; }
    }
    return 0;
  });
  return keyArray;
```

Note: for brevity's sake, this function's a little fragile. It doesn't check and make sure it's being fed an array of objects, for example. It also doesn't deal at all with objects that have more than one key/value pair &hellip; it just sorts by the first one it finds in each of the two objects it's comparing. For a production app, you'd want to handle breaking issues, errors, and malformed data more gracefully. But this is "JS Quick Hits" and not "JS Long and Exhaustive Hits" so we're keeping it simple.

Our function's complete. Now we need to export it so that other files can use it. At the *very end of the file*, underneath the function, add this code:

```
module.exports = sortByKeys;
```

Save the file and that's it. Our node module is complete and usable by any other file running in a Node.js ecosystem. Neat! Let's test it out. Create a new file in the same directory called `test.js`. This one's simple, so I'm going to give you all of the code at once and then explain it:

```
const sortByKeys = require('./index');
const json = require('./test.json');

const tempData = '[{ "favoriteColor": "Turquoise" },{ "age": 22},{ "petName" : "Porkbelly"},{ "email": "ice@spamcapture.com"},{ "fullName": "Corey Johnson"},{ "username": "IceFlash"},{ "petType": "Dog"},{ "booleanFan": false}]';

// Test with in-line JSON
console.log(sortByKeys(tempData));

// Test with JSON from file
console.log(sortByKeys(json));

// Descending sort option
console.log(sortByKeys(tempData, { sort: 'desc' }));
```

As you can see, we're importing our `sortByKeys` function from our module by using Node.js's built-in `require` method. We're not using ES6 `import / export` syntax at this time because it behaves differently than `require` and the Node.js team is still working on full implementation. You can check out [this article](https://medium.com/the-node-js-collection/an-update-on-es6-modules-in-node-js-42c958b890c) for more info. We're also using require to read our JSON file. This converts the JSON to a JS array by default, so I also provided a raw JSON string (similar to what you'd get from an XHR request) to test with. We also run a descending sort, to test that option.

Save this file and let's check out our tests! Open a terminal window or command prompt, cd to the directory in which you've stored these files, and type the following:

```
node test.js
```

You should see it print out your three arrays, now sorted alphabetically by keyname, with the third sort being descending. Woohoo! Congratulations, you've written a node module.

Ah, but it's not *really* a node module yet, is it? It's just a file you can import. Turning it into a true module means packaging it and uploading it to NPM so it can be easily installed and used in other projects. We'll tackle that next week. See you then!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*