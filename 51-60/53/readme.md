**JS Quick Hit: Express: App.js**

Video URL: https://youtu.be/vbMb9F5r_TU

Quick note: this tutorial runs a bit longer than usual, both time-wise and text-wise, because there's a lot of code to cover and I didn't want to leave you sitting with an installed application but no explanation until next week! We're talking about Express again this week, so if you didn't read [last week's tutorial](https://closebrace.com/tutorials/2019-01-23/js-quick-hits-52-intro-to-express), you might want to do so. If you're already familiar with the basics of Express, you probably don't need to go back to that one. Then again, a refresher never hurts!

Anyway, let's roll on. Today we're going to install Express and Express generator and set up our scaffolding. You're going to need Node.js installed. We covered that in [JS Quick Hits 31 - Node Basics](https://closebrace.com/tutorials/2018-08-22/js-quick-hits-31-node-module-1-node-basics), so get thee hence if you need help with installing Node. As always, I recommend the latest long-term stable (LTS) version, which as of this tutorial is 10.15.0.

Got Node installed? Excellent. That means you also have NPM, which does not stand for Node Package Manager, even though it used to. It now stands for &hellip; NPM. Despite all of that, the important thing to note is that you can use NPM to, well, manage your node packages. Let's use it to install Express Generator. Head to a terminal window or command prompt, `cd` to wherever you like to keep your websites and/or Node applications, and type the following:

```
npm i -g express-generator
```

So, why are we installing the generator but not Express itself? Because the generator gets a global install, allowing us to use it anywhere in order to generate a basic Express scaffolding. That scaffolding is what actually contains a compartmentalized instance of Express. We don't want to install Express globally because we may want to have a lot of different projects that use different instances of Express.

So, now that we have the generator. We're going to set up Express using the EJS templating language (I'll explain why in a bit), and the Sass CSS engine, because that's by a wide margin the most popular option. We're also telling it to add a `.gitignore` file because &hellip; why not? Again, make sure you're in the folder where you want your new project to be stored, and then type the following:

```
express --view=ejs -c sass --git express-test
```

This will produce a bunch of output lines. As you can see, the generator creates a bunch of files and tells you how to run your application (in debug mode). Let's go ahead and do that, first. `cd` to `express-test` and type the following:

```
npm install
```

This will install all of the node modules that Express needs to function (including the actual Express module!). If you skip this step and go right to running the application, you'll get an exciting error about a missing module, so make sure to run the install. Once it's done its thing, you can type the following for Windows:

```
SET DEBUG=express-test:* & npm start
```

OR the following for Mac:

```
DEBUG=express-test:* npm start
```

You'll get something that looks like this:

```
> 53@0.0.0 start D:\sites\express-test
> node ./bin/www
```

This means your server is running. You can go to `http://localhost:3000` to check that. You should see a web page with the following text:

```
Express
Welcome to Express
```

Cool! Also, check out your terminal and note that it's logged a couple of events. Specifically, HTTP requests that your browser made when it attempted to access the web page. Specifically, I get:

```
GET / 200 22.750 ms - 207
GET /stylesheets/style.css 200 15.783 ms - -
GET /favicon.ico 404 3.617 ms - 973
```

So, that's three HTTP GET requests (we talked about those in the previous tutorial). The initial GET to `/` which gets the HTML, and then a GET for the stylesheet, and a (failing) GET for the favicon. We haven't created a favicon. We probably won't. But you can if you want!

Anyway, here we are. We've got a working web server running on our machine. That was pretty painless! From here, the sky is the limit. You can quite literally build an entire production-ready web application on Express, deploy it, and run it. For example, CloseBrace.com runs on Express.

But that's maybe getting a little complex a little quickly, right? Let's dig in to what actually got created. In your text editor of choice, open up `app.js`. This is the heart of your Express application, and we're going to break down in detail exactly what's going on. Let's take a look at the following lines:

```
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
```

They're not in alphabetical order, which I find annoying, but we're not going to mess with it right now. We'll be using these variables later in this same file. Note also that this is all in ES5. You can convert these to `const`s if you want, but you can't use ES6 imports with Node.js - you have to use the older `require` syntax. There are reasons for this that we won't get into right now, but it shouldn't have much of an effect on you.

Let's take a look at the next three lines:

```
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
```

As you can see, we have router files, and we're calling those. We'll talk about how Express routes work in the next newsletter, but it should be pretty clear from this code that we have a top-level, or index, route, and a users route. We also instantiate Express and assign it to the `app` variable, which we'll use a lot while configuring the server in the lines below.

Speaking of the lines below, here are the next two:

```
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
```

This handles our view engine. "What's a view engine?" you might be asking. Well, basically, we need some way of sticking dynamic data into the HTML that Express serves. If you just use HTML, you can't do that, so we need an engine that allows us to do something like this:

```
<h1><% myTitleVariable %></h1>
```

Then we can set `myTitleVariable` for each page we're serving, and Express will fill it in automatically. We're using EJS, even though Express defaults to Jade, for two reasons. The first is that Jade is deprecated and has been replaced by the newer module named Pug, and I have no idea why Express Generator hasn't been changed to reflect this since it happened like five years ago. The generator *has* been updated to include Pug, but it still defaults to the older, deprecated module, which is weird. Anyway, the second reason is that Jade and Pug are obnoxious. They're indentation-based languages, which I personally find to be really annoying to work with. Basically, if you screw up the indentation of a single line of code, by a single space, it'll break your entire page.

If that sounds appealing to you (for example, maybe you're coming to JS development from Python, which I think works the same way), then by all means read up on Pug. But we're using EJS, because it's "HTML with some JavaScript in it" and I think it's the most readable and usable of the templating languages Express supports.

Onward! The next lines are:

```
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
```

This is a whole bunch of configuration. As you've probably guessed, `app.use` is the way you tell Express (which, remember, we assigned to the `app` variable) what middleware to use. We talked a bit about middleware last time, but a quick recap: it's stuff that gets implemented between receiving the request from the browser, and sending the response. Here we're adding a logger (which is what prints those lines to the Node console that we mentioned earlier), allowing Express to use JSON, allowing for URL encoding, adding a cookie parser, and setting up a public directory in which to store things like images and CSS files while also generating CSS files from Sass and creating sourcemaps. Note also that by default, this sets Sass to work with indent-based syntax which, again, I hate. I'm changing this line to false, like this:

```
  indentedSyntax: false, // true = .sass and false = .scss
```

Some of that `path.join` stuff may be confusing. I'll try to explain how the `path` module works in another tutorial. For now, just know that anything you put in `/public` will be served at `/` ... so, for example, `/public/images` would be accessed in your HTML as just `/images`.

Next up, we've got these two lines:

```
app.use('/', indexRouter);
app.use('/users', usersRouter);
```

Which tell Express what router files to look at when a website visitor accesses a particular URL. So, again, our top-level URL uses the index router, and if we were to navigate to /users in the browser, we'd use the users router. You can actually do that if you want. You'll get a page that says "respond with a resource" &hellip; which is good advice, and in a future tutorial we will create a resource with which to respond!

The next lines in `app.js` are:

```
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
```

This is a fall-through. When a site visitor goes to a URL, Express checks the routes in the order that they're listed. So if we go to `/test` it goes, "is that `/`? Nah. Is it `/users`? Nope, not that either." Those are our only two routes, currently, so by definition anything that uses neither route must be a 404 - page not found. So these lines basically say "any URLs that don't have routes, create an error for them and assign it a status of 404".

Which brings us to the last big chunk of lines of the file:

```
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
```

When we ran the `createError` function for our 404 (or when Express internally runs it for various 500 errors), it creates the `err` variable used by this middleware. The middleware is one final fall-through route, saying "if all else has failed, render the error page". It sets a message you can display, and if you're in development mode also gives you local access to the complete error object. Then it renders the error view, which you'll find along with index in the views folder. That page uses the local variables to show the error message and, if in development mode, print a full stack trace.

The last line of the file just exports `app` for use in other files. It looks like this:

```
module.exports = app;
```

We're not actually going to be using it anywhere else ourselves, but Express needs it to be exported in order to run all of its internal stuff, so don't nuke that line!

So, there you have it: the beating heart of your web server. Next week, we're going to dive into routes and views. See you then!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*