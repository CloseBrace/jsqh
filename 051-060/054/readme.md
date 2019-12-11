**JS Quick Hit: Express Routes**

Video URL: https://youtu.be/n7KScdl2N8c

Express's route files are at the core of how the web server works. Basically, when the server receives an HTTP request (GET, POST, etc), it goes "hey, I should do stuff!" and looks to see if there's route that tells it what to do when evaulating the request. This route does not have to be a separate file. You could code it right into `app.js` if you want, leading to a single-file web server that's potentially thousands of lines long. You could also take a claw hammer and just whale it down on your legs and groin repeatedly, and while I have no power to stop you, I can definitely state without compunction that doing so is a bad idea.

So, we have separate route files! The way most people tend to organize Express, if they're keeping things simple, is one file per top-level directory, so you might have the following:

```
http://mysite.me/
http://mysite.me/news
http://mysite.me/news/2019-01-01-today-marks-a-new-year
http://mysite.me/contact
```

That's four URLs, but only three routes, because our `news` route is going to handle not only the index, but also individual items. Similarly, that `contact` route would handle a GET request (to show the contact page) and a POST request when submitting the contact form. It might also handle another GET to something like `/contact/thanks` in order to forward them to a thanks page.

Let's take a look at the two routes Express has generated for us. There's an index route, and a users route. The files are imported up near the top with these lines of code:

```
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
```

We assign them to specific URLs later, here:

```
app.use('/', indexRouter);
app.use('/users', usersRouter);
```

Let's take a look at the index router first. Go ahead and open up `/routes/index.js`. It's a pretty simple file, just 10 lines long (and two of those are blank). The first two lines import Express and then create a router variable for us to work with. You'll do this same thing at the top of any additional router files you create, at least if you want them to work.

The next block is helpfully commented to explain exactly what it does. It looks for GET requests to `/` and then responds with a view. More on views next week, but for now you might be wondering about why we have to set `/` in `app.js` and in `/routes/index.js`. Well, as I mentioned before, router files can handle get requests to multiple URLs, so that `/` in `app.js` would catch the top level, but also something like `/blah` if that URL isn't assigned to any other router. Now, that doesn't mean `/blah` will work - we don't have anything set up for it in our router file, so it's still going to fall through to the 404 catcher.

Let's take a quick look at the actual GET code:

```
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
```

So, what's that saying? Basically, when the top level is requested via GET, run a function that takes three variables: `req` is the request, `res` is the response Express is building, and `next` is the built-in function that cycles through middleware. We're not using `next` here, nor are we doing anything with the request itself, but we do need to send a response. We do that with Express's built-in `res.render` method, which tells our web server to render a view. Again, we'll cover views in the next tutorial, but it just means "render the associated EJS file and provide data to it" &hellip; in this case, that data is an object which contains a `title` property and value.

So that's how we render views. What else can we do with `res`? Well, let's open up `/routes/users.js` and look at our almost identical code:

```
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
```

As you can see, it's using `res.send` instead of `res.render`, which means it's not working with any views. It's just sending plain text. That's boring, so let's add a route that sends JSON. DO NOT replace the index route. It won't stop this code from functioning, but a) it'll break the index route, and b) the point is to show that these files can handle multiple requests. Here's the code:

```
/* GET user and respond with JSON */
router.get('/:id', function(req, res, next) {
  console.log('The ID is: ' + req.params.id);
  var fakeUser = {
    age: 31,
    name: 'Corey Smith',
    twitter: 'cdawg',
    username: 'csmith',
  };
  res.json(fakeUser);
});
```

There's two things to note here. The first is that `/:id`. This is how we tell Express to evaluate the URL and take parameters from it. Basically, that `id`, which we could call whatever we want, becomes an available variable for us to work with. We access that variable through the `req.params` property, as you can see in our `console.log` line. After that, we create a user object (in the real world, we'd use the `id` parameter to look up info from a database). Then we send that object back as JSON, which `res.json` helpfully does for us without us having to use `JSON.stringify`.

Go ahead and save the file, then restart your server, unless you were running nodemon, in which case it should've restarted automatically. You can now navigate to `http://localhost:3000/users/1234` and you'll see your JSON. If you check your console, you'll also see that your log showed up: `The ID is: 1234`.

Cool. So we understand how to use routes to handle GET requests. We're going to cover POST next week, by creating two views: one with a form, and one to send the user to after they submit the form. We'll also, of course, talk about how those views work.

See you there!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*