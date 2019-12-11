**JS Quick Hit: The Querystring**

Video URL: https://youtu.be/Ib4bbtB1cK8

We're going to hold off on MongoDB for a bit and stick with one-off tutorials. Today we're taking a look at the Query String, which is the stuff you sometimes see in a URL that looks like this:

```
?username=CaptainCode&id=12345&email=captaincode@closebrace.com
```

It used to be, if you wanted to read those values and convert them into individual JavaScript variables (or an object full of key/value pairs), you had to do a bunch of tedious string parsing. Something like the following code:

```
const getQueryStringData = () => {
  const qStringObj = {};
  const qString = window.location.search;

  // remove unnecessary question mark if it's there
  qString = qString.charAt(0) === '?' ? qString.substr(1) : qString;

  // Generate an array of key/value pairs
  const params = qString.split('&');

  // Turn each param into an array and then use those values as key/value pairs
  params.forEach(param => {
    const arr = param.split('=');
    qStringObj[arr[0]] = arr[1];
  })

  return qStringObj;
}
```

That's a nifty little function which can easily be expanded to take an argument, allowing you to either pass in a string _or_ use `window.location.search` but it's still a bit clunky and fragile, and it only produces an object as its output. Wouldn't it be nice if browsers would just support a native function that would give us a lot of flexibility when working with the querystring?

Well, good news, everyone! It turns out that most modern browsers do exactly that. Witness the glory of `URLSearchParams`. This simple, built-in function will allow us to do all sorts of things with the data that we've got in our querystring. Two quick caveats: first, this function does not work in Internet Explorer (a browser that Microsoft is in the process of deprecating and that only \~2% of internet users still use) or Edge for mobile (a browser Microsoft has said it will deprecate and that virtually no one uses). It works fine in modern versions of Chrome, Firefox, Safari, Opera, Edge for desktop, and others. So, it all depends on which users you're trying to support.

We're going to assume our users are on modern browsers for the purpose of this tutorial! First we'll need this line of code:

```
const urlParams = new URLSearchParams(querystring);
```

You'd think you could just console.log `urlParams` from there, but &hellip; nope. It's not a simple object, but rather an entire JS class with a whole bunch of methods you an access. Here are several methods for accessing your querystring data:

```
console.log(urlParams.get('username')); // CaptainCode
urlParams.forEach(val => { console.log(val) }); // CaptainCode, 12345, captaincode@closebrace.com
console.log(urlParams.has('email')); // true
```

Want each key/value pair as an array? No problem. Check this out:

```
for (entry of urlParams.entries()) {
  console.log(entry); // ['username', 'CaptainCode'], ['id', 12345], ['email', 'captaincode@closebrace.com']
}
```

You can also easily get just the keys, or just the values, like this:

```
for (key of urlParams.keys()) {
  console.log(key); // username, id, email
}
for (value of urlParams.values()) {
  console.log(value); // CaptainCode, 12345, captaincode@closebrace.com
}
```

Additionally, you can manipulate the values once you've ingested them, including setting a value, appending a value, or deleting a value. Note that this won't change your actual querystring, it just changes the data stored in the `URLSearchParams` object we're working with.

```
urlParams.set('username', 'CaptainCode2');
console.log(urlParams.get('username')); // CaptainCode2

urlParams.append('age', '31');
console.log(urlParams.get('age')); // 31

urlParams.delete('age');
console.log(urlParams.has('age')); // false
```

As you can see, `URLSearchParams` is a powerful new way to work with the querystring that allows a ton of flexibility. I definitely recommend it and, hey, if you _gotta_ support IE or Edge Mobile, there's always transpiling, right?

See you next week!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*