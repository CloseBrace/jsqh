### JS Quick Hits: ES2015 Promises

Video Url: https://youtu.be/qmyU1D3aT8k

In today's tutorial we're going to talk about promises, but not the kind we make to friends, family, and/or partners who've been shot by the bad guy one day before they were about to retire from the police force. No, these promises are built to reduce the problem one runs into when developing applications with a lot of nested callbacks, which has been colorfully (and appropriately) named "Callback Hell." It looks something like this:

```
function formatAndLogData(url) {
  fetchData(url, function(data) {
    convertData(data, function(convertedData) {
      filterData(convertedData, function(filteredData) {
        logData(filteredData);
      });
    });
  });
}
```

That's horrible, right? Promises allow you to write code that sits and waits for a returned value, and then does stuff to it, while the rest of your code is moving on with its life. I'm going to show you some examples, but to do that we need to create an asynchronous function that, well, takes some time. The easiest way to do this is with JavaScript's built-in `setTimeout` method, so that's what we're going to do, but this is equally applicable to, say, a function that hits a database and has to wait a while to retrieve a large chunk of data, or an XHR call to a slow API.

Let's start with some data:

```
const data = ['Deadpool', 'Domino', 'Bedlam', 'Shatterstar', 'Negasonic Teenage Warhead'];
```

And here's some code that's not going to work:

```
const timer = setTimeout(() => {
  return data
}, 2000);
console.log(timer);
```

That just logs `1`, which is basically the JavaScript engine going "yeah, your timer is running. Way to go." The `timer` variable doesn't actually receive the returned data (that's not how `setTimeout` works), but even if it did, your `console.log` would've executed long before the two second delay. So that's a problem. This is how we fix it:

```
const getData = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(data);
  }, 2000);
});

getData.then((data) => {
  data.forEach((name) => { console.log(name)}); // Deadpool Domino Bedlam Shatterstar Negasonic Teenage Warhead
});
```

As you can see, we execute on the promise using `then`, so `getData.then` is literally exactly what it sounds like ... get the data, and *then* run a function. This is awesome, because it's non-blocking. Other parts of our app can keep on doing their thing, and whenever the promise resolves, the function we pass to `then` will run. 

ES2015 promises have two built in parameters, `resolve` and `reject`. You call `resolve` when things go right, and call `reject` when they don't. Reject isn't very useful with a simple `setTimeout` since it's not going to fail unless we force it to, but with XHR calls or DB writes it's vital, since those resources can easily fail to return what you want. Here's an example of handling a rejection with `catch`:

```
const getBadData = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Data not found');
  }, 1800);
});

getBadData.then((data) => {
  data.forEach((name) => { console.log(name) });
})
.catch((err) => {
  console.warn(err); // Warning: Data not found
});
```

See how we can string `then` and `catch`? We can also string more than one `then` by returning a value, which creates a new promise, like this:

```
getData.then((data) => {
  const shoutData = data.map(name => name.toUpperCase());
  return shoutData;
})
.then((data) => {
  console.log(data); // ['DEADPOOL', 'DOMINO', 'BEDLAM', 'SHATTERSTAR', 'NEGASONIC TEENAGE WARHEAD']
});
```

ES2015 promises are very useful and very powerful ... and ES2017 makes them even better with its introduction of `async / await`. And with that, I bet you can guess the subject of next week's tutorial. See you there!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*