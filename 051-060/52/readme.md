**JS Quick Hit: Intro to Express**

Video URL: https://youtu.be/ZQuM6xnAC7M

Let's talk about Express!

It's possible that you came to this newsletter initially by following one of my Express-based tutorials. If that's the case, some of the information we're going to cover over the next couple of weeks will already be familiar. Hopefully it'll serve as a refresher for you!

If you're not familiar with Express, well, settle in because we're going to get you up to speed! Express is a web server built with Node.js. At its core, it's really very simple. It listens for HTTP requests and sends responses. This is what any web server does (Apache, NGINX, etc). What makes Express a little different from those other ones is that it's entirely built in JavaScript. That means if you know JS, you can now write back-end web server code, including things like developing your own APIs. Obviously, that's useful for a variety of reasons, not the least of which is that it's a nice bullet point to put on a resume.

Let's talk for a bit about how Express works. Central to its approach are three major topics: requests, middleware, and responses. We're going to go through them in that order, because that's the order in which the server itself addresses them. Once we've covered those, in the next tutorial we'll get into scaffolding out a functioning Express server and getting it up and running.

So, let's start with requests. A request (frequently referred to in Express using the variable name `req`) comes from the browser. There are four main types of HTTP requests: `GET`, `POST`, `PUT`, and `DELETE`. `GET` is by far the most common, so let's talk about that first. When you visit a web page, you start by sending a `GET` request asking for a specific HTML file (at the top level, this is usually index.html). The server sees that incoming `GET` request and prepares a response &ndash; in this case it would send the contents of the HTML file, which the browser then renders. This might cause other `GET` requests, for example if the HTML references a CSS or JavaScript file. The server would handle each of these `GET` requests in the same way, sending along the appropriate contents for the browser to parse.

The other HTTP request methods I mentioned all have to do with manipulating data. To send new data to our web server, we use `POST`. To update existing data, we use `PUT`. To delete existing data, we use `DELETE`. This is the standard way in which RESTful APIs work. Note that GraphQL, which we just talked about in the last few tutorials (starting with [Number 49](https://closebrace.com/tutorials/2018-12-26/js-quick-hits-49-querying-graphql)), works a bit differently. Don't worry about that for now!

Once Express has a request to work with, it does two things. Well, sort of. One of those two things can actually be a whole lot of things &ndash; specifically, the application of middleware? What's middleware? Well, it's any function that's meant to operate on the request and/or the response before the server sends that response back to the browser. Almost everything you do on the back-end is done via middleware, and can be chained together using Express's built-in `next()` function, which essentially says "this middleware function is done, so move on to the next one".

The best example of middleware comes built-in to Express: its App and Routing-level middleware. We're going to cover that in more detail in the next tutorial, but for now just know that this code:

```
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
})
```

Would be used by every route on your website, while this code:

```
router.get('/user/:id', function (req, res, next) {
    console.log(req.params.id);
    next();
})
```

Would only be used if the website visitor specifically visited, say, `/user/3` (or any other ID).

Once any middleware has been executed, all thats left to do is generate a server response and send it back to the browser. This can be a variety of things, including HTML, JSON, or other data. Express has handlers built-in for creating a variety of responses, including using view templates to generate HTML pages (this can be done in a varity of template languages, including Pug, EJS, handlebars, and more). Here's an example in which Express automatically converts a JavaScript object to JSON and sends it as a response:

```
const myResp = {
    name: 'Chris Buecheler',
    age: 41,
    yearsPro: 21,
}
res.JSON(myResp);
```

That's all pretty straightforward, but obviously, Express is capable of significant complexity. Don't worry, we'll take it in bite-size pieces. Next week we're going to look at some automatic scaffolding created by the handy tool Express-Generator. See you then!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*