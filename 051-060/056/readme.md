**JS Quick Hit: Express Middleware**

Video URL: https://youtu.be/2dFN2EAkw9U

All right, we've got routes and views working, and we can submit forms and have our server react to the incoming data. This is a solid start! Now it's time to talk about Middleware. The truth is, we've actually already been using a little bit of Express middleware in our routes, but let's go over it in detail. Here, straight from the Express homepage, is a description of what this stuff is:

> Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named `next`.

&hellip; yep. We've talked about all that before. And you'll note that all of our routes have `req / res / next` variables available to them. That's because each route is essentially a bit of middleware. In each of our current cases, we're preparing a response and then sending it, which ends the middleware cycle, but there's no reason you can't chain functions. We'll get to that.

Middleware is extremely useful, especially when you're doing things like accessing databases. We're not doing that in this series of tutorials, but we have enough going on that we can do a little bit of data massaging to show how middleware works. Go ahead and open up `/routes/contact.js` and look at all of our glorious routes. We're going to write some new middleware. Above everything except the first two lines (the requires), add this code:

```
/* Used by EVERY contact route */
router.use(function (req, res, next) {
  var method = req.method;
  if (method === 'POST') {
    console.log('Body: ' + JSON.stringify(req.body));
  }
  else {
    console.log('Not a POST');
  }
  next();
})
```

So, this is pretty goofy middleware, but it gets the point across. For this particular function, instead of `router.get` or `router.post`, we're using `router.use`, which means it'll be triggered on any HTTP request regardless of type. Because we're not providing any path to the function, the router will apply this middleware to _every_ HTTP request to `/contact`. Note: it's important this is at the top. Express middleware, including the routes, run sequentially. If you move the GET request to `/` above this middleware, for example, and then refresh `/contact` in your browser, you won't get the "Not a POST" console log.

that `next()` call is also really important. Without it, Express doesn't know to keep on falling down the chain, and it'll just sit there having console logged something, without moving on to actually rendering any views (or executing any other pieces of middleware).

Let's add a second bit of middleware, which we'll only use when there's a POST to `/`. We can put this below the GET to index, but above our existing POST to index. We're going to use it to slightly modify our request object before moving on to the next middleware. Here's the code:

```
/* POST to index page - append date */
router.post('/', function(req, res, next) {
  const { name, message } = req.body;
  const now = new Date();
  req.data = {
    date: now,
    message,
    name,
  };
  next();
});
```

You'll note that I've switched to ES2015 here so I can use destructuring, among other things. That's fine! Express and Node are compatible with newer JavaScript features. You'll also note, I hope, that we're attaching a new property to our req object. `req.data` contains the same stuff that `req.body` does, but we've added a date and time, as well. We could just overwrite `req.body` but I prefer a non-destructive approach.

OK, great, we've got `req.data` &hellip; now we need to do something with it. We're going to modify the next router, the one that generates the querystring. Since it's next in line, and it's also set to respond to `/`, it'll be the next function that runs when `next()` is called. It'll also be the last function that runs, since it sends a response. Here's the new code:

```
/* POST to index page. */
router.post('/', function(req, res, next) {
  var querystring =
    'date=' + encodeURIComponent(req.data.date) +
    '&name=' + encodeURIComponent(req.data.name) +
    '&message=' + encodeURIComponent(req.data.message)
  ;
  res.redirect('/contact/thanks?' + querystring);
});
```

As you can see, we're using our new `data` property, and we're adding the date to the querystring we're generating. Next we need to edit the GET to `/thanks` to be aware of the new item in our querystring, like this:

```
/* GET thanks page */
router.get('/thanks', function(req, res, next) {
  console.log(req.query);
  res.render('thanks', {
    title: 'Thanks',
    date: req.query.date,
    name: req.query.name,
    message: req.query.message,
  });
});
```

Cool, now we're passing everything we need to pass to our view. Last thing we need to do is edit that view to display it, so save this file and open up `/views/thanks.ejs`. Below `<p>Your message was received!</p>`, add this line:

```
    <p><strong>Date: </strong><%= date %></p>
```

That's it. Save the file, head for `localhost:3000/contact` and submit something. You'll see that our very ugly date string is now apended.

Congrats, you're using middleware! That wraps up the basics of Express. We'll be back next week with a new topic. See you then!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*