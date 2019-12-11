**JS Quick Hit: Custom Errors**

Video URL: https://youtu.be/afrGLtz7omk

Last week we talked about JavaScript's Error constructor and its built-in error objects. This week we're going to talk about how to make our own custom error types. It's not terribly difficult, and especially in large applications, it can be really useful, since it allows you to pass extra data along with your errors.

Let's dive in. We're going to do this with ES6, which means you'll need a transpiler like Babel if you want to support older browsers, but if you're working on a larger app you're probably using Babel anyway, and if you're a web developer who's learning on your own, you probably use a modern browser, so &hellip; I think we're all good here, right?

Let's start by defining a custom error. We're going to fake an XHR error. Here's the code:

```
class XHRError extends Error {
  constructor(status, url = 'unknown', ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, XHRError);
    }

    this.name = 'XHR Error';
    this.status = status;
    this.url = url;
  }
}
```

Let's break this down real quick. When extending an existing JavaScript class, you can use a constructor to explain what to do with any incoming parameters. In this case we're saying our custom error class can take parameters of `status`, `url`, and an unknown number of additional parameters. We're going to handle the first two ourselves, including telling our constructor that if `url` isn't defined, it should default to a string saying "unknown", and then we use the `super` command to say "take any additional parameters and just pass them on to the parent constructor". In this case, that's the Error object we discussed last week, so at very least we know it's going to need a string for its `message` property.

After that we check to see if the `captureStackTrace` property exists on the top-level Error class. If it does (which as of this writing, only happens if you're using Google's V8 JavaScript engine, on which both Chrome and Node run), then we can pass the stack trace along, which is nice to have.

Finally, we add a few local properties to our custom class. The name, the status (which is defined by the parameter), and the url (which is also defined by the parameter, and can default to "unknown"). These properties don't exist on the normal `Error` object. Well, except `name`, which we're overriding. Let's throw an error and print out our data:

```
try {
  throw new XHRError(
    500,
    'https://my.custom.api.com.edu/api',
    'Server Error: Could Not Connect to Database',
  );
}
catch (error) {
  console.log(error.name); // XHR Error
  console.log(error.status); // 500
  console.log(error.message); // Server Error: Could Not Connect to Database
  console.log(error.url); // https://my.custom.api.com.edu/api
}
```

As you can see, this works as expected. We pass a status, a URL, and a message. Our custom error handles the name, status, and URL. The message gets kicked up to the parent class, which handles that. The resulting error has all four pieces of information, two of which you wouldn't find in any of the default JavaScript Error types, and one of which&mdash;name&mdash;is more useful than a generic "Error" would be.

Let's do one more thing: show off that default parameter value. Try this code:

```
try {
  throw new XHRError(
    undefined,
    undefined,
    'An unidentified error has occurred',
  )
}
catch (error) {
  console.log(error.name); // XHR Error
  console.log(error.status); // undefined
  console.log(error.message); // An unidentified error has occurred
  console.log(error.url); // unknown
}
```

Note that `error.status` stays as `undefined`, because we didn't give our constructor a default value for that parameter, but `error.url` switches from `undefined` to "unknown" because we _did_ provide a default in that case.

Custom errors are very useful when building complex web applications because they allow you to standardize your messaging while simultaneously allowing for additional detail if and when you need it. I definitely recommend using them if you're finding that JavaScript's default Error constructor's just not giving you all the data you need.

See you next week!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._