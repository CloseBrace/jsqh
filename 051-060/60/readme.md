**JS Quick Hit: Full-Stack Project Part 1**

Video URL: https://youtu.be/892S4AYC6n0

You guys wanna build something?

I feel like we've spent a lot of these tutorials talking about abstract concepts or tackling individual bits of functionality. That kind of makes sense, since "quick hits" should be, well &hellip; quick. But it might be satisfying to spend a couple of tutorials writing code that actually DOES something!

So we're going to build a contact form. We already did a similar form in previous lessons, but this one's going to be more complex. Our contact form is going to have a few different pieces: the form itself, some basic front-end validation, and a back-end to handle the submission (with additional validation) both via standard POST and via Ajax. We're going to use Node.js for our back-end, of course, and I'm considering connecting to an actual SMTP service so we can send the email. Does that sound interesting? Let me know!

So, for today, let's get our Express server set up. We've done this in the past, specifically in tutorials 52 through 56 (visit the [JS Quick Hits index over on CloseBrace](https://closebrace.com/categories/js-quick-hits) to see those). We're going to scaffold it out quickly using Express Generator. So, `cd` to wherever you keep your Node projects and type the following:

```
express --view=ejs --git contact-form
```

This will create a `contact-form` folder with all of our Express scaffolding in it. Huzzah! `cd` into the `contact-form` folder and type:

```
npm install
```

To add the basic modules we'll need to run our server. Once that's done its thing, you can start it up with

```
nodemon npm start
```

Assuming you use nodemon, which we've talked about a bunch. If you _don't_ use nodemon, omit that first word. Either way, go ahead and add that folder to your text editor of choice. I've been using VS Code for a lot of things and it's pretty cool, but the guy who created Sublime Text has been adding lots of nifty stuff as well, lately. Either editor is great, and there are many other alternatives you might prefer. I'm not here to judge!

Anyway, once you've added the folder you'll see a bunch of files and directories. We covered these in depth in the aforementioned tutorial so let's not spend a bunch of time on them. We're going to create a separate route and view for our contact page, because &hellip; well, why not? We could do it on the index page, but that's boring. So in `/routes` create a file called `contact.js` and add this code to it:

```
var express = require('express');
var router = express.Router();

/* GET contact page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact Us' });
});

module.exports = router;
```

Now we need a view, so create `/views/contact.ejs` and add this code:

```
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1><%= title %></h1>
    <form method="post" action="/contact">
      <fieldset>
        <label for="name">Name</label>
        <input type="text" name="name" id="inputName" placeholder="Leslie Smith" />
        <label for="email">Email</label>
        <input type="email" name="email" id="inputEmail" placeholder="captaincode@closebrace.com" />
        <label for="message">Message</label>
        <textarea name="message" id="inputMessage" placeholder="Your message here" maxlength="500"></textarea>
        <div class="center"><button type="submit" id="btnSubmit">Submit</button></div>
      </fieldset>
    </form>
  </body>
</html>
```

Finally we need to wire up our route and view, so open `/app.js`, find the two route imports and add a third below them, like this:

```
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contactRouter = require('./routes/contact');
```

Then scroll down and find the route assignments, and add a third below them, like this:

```
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contact', contactRouter);
```

Save that. I'm going to assume you're using Nodemon and your server's automatically restarting whenever you save a JS file, but if not, you'll need to restart your server multiple times during these tutorials. You can hit `localhost:3000/contact` now and see our supremely ugly contact form. If you want to make it slightly less ugly, open `/public/stylesheets/style.css` and add the following code:

```
fieldset{background:#EEE;border:1px solid #CCC;display:block;font-size:1.5rem;line-height:1.6;margin:0 auto 0.5rem;padding:30px;width:362px}label{color:#888;display:block;font-weight:normal}input[type=email],input[type=text],textarea{background:#FFF;border:1px solid #CCC;font-size:1.25rem;margin-bottom:1rem;padding:5px 10px;width:400px}textarea{height:200px}input::placeholder,textarea::placeholder{color:#DDD}button{background:#00B7FF;border-radius:15px;border:none;color:#FFF;cursor:pointer;font-size:1.5rem;padding:15px}.center{text-align:center}
```

I know, I know, that's some ugly CSS, but I'm trying to keep this tutorial from scrolling for nine centuries! Trust me, it'll work.

That feels like a good place to stop for this week. We've got a form established, we can go look at it, and it looks reasonably pretty. Next week, we'll begin wiring it up. See you then!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*