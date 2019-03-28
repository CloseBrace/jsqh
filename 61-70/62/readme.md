**JS Quick Hit: Full-Stack Project Part 3**

Video URL: https://youtu.be/DoGW6dNQKKo

We have a form. We have front-end validation. Now we're going to pivot to the back-end for a bit (mostly) in order to get something working. We're going to start with basic server-side form processing. This is the tried-and-true way that people have been handling forms on the web for decades now, and there's nothing wrong with it. It'll work in any browser, and it'll work even if the user has JavaScript turned off. We're _also_ going to handle submission with AJAX and do everything dynamically, but that'll come later. This dual solution allows us to handle requests even if something goes wrong with our JS, which is always nice to have.

We'll need a thanks page, though, so very quickly, add a file named `thanks.ejs` to `/views/` and in it put the following code:

```
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel="stylesheet" href="/stylesheets/style.css" />
  </head>
  <body>
    <h1><%= title %></h1>
    <p>Your message has been received! We'll respond as soon as we can.</p>
  </body>
</html>
```

Simple and boring. Let's add a route, which we can do in `/routes/contact.js`. Put it below the initial `GET` but above the `module.exports` line. It should look like this:

```
/* GET thanks page. */
router.get('/thanks', function(req, res, next) {
  res.render('thanks', { title: 'Thank You' });
});
```

That's all we need to do. We're already importing and using that router file in `app.js` so we don't need to make any edits there. Restart your server (again: [Nodemon](https://nodemon.io/) is your friend) and navigate to `localhost:3000/contact/thanks` and you should see our extremely basic thanks page. Cool! Let's move on by heading back to `/routes/contact.js`. We're going to handle a `POST` here, catching the form's submission. But by "handle" I don't just mean "send the form data along to an SMTP provider" &hellip; there's stuff we need to do first!

A thing that would be smart to do is validate the form on the server end. This is especially useful in case someone visits the form with JavaScript disabled, which would potentially allow them to skip the front-end validation we set up last week (most modern browsers do some validation on their own, but I suppose we might get someone visiting on an older machine). We're going to do this by creating a middleware function, one which includes a big scary email-validating regular expression that I borrowed from the interwebs. So, below our two `GET`s, let's add a `POST` catch, like this:

```
/* POST to contact page - part 1: validation */
router.post('/', function(req, res, next) {
  const { email, message, name } = req.body;
  const errors = {
    count: 0,
    list: [],
  };

  if (!email || email === '') {
    errors.count += 1;
    errors.list.push('Email missing.');
  }
  if (!message || message === '') {
    errors.count += 1;
    errors.list.push('Message missing.');
  }
  if (!name || name === '') {
    errors.count += 1;
    errors.list.push('Name missing.');
  }

  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(String(email).toLowerCase())) {
    errors.count += 1;
    errors.list.push('Malformed email.');
  }

  if (errors.count > 0) {
    return res.json(errors);
  }

  next();
});
```

For speed purposes, we're going pretty light on validation here. Basically, "Did they fill in each box and does the email address look like an email address?" is all we're looking for. We can't really test this without changing a bunch of code, but I _did_ test it while writing this tutorial, and it does work. You get forwarded to an ugly block of JSON, which isn't spectacular, but in the spirit of keeping this short we're going to skip writing an error page.

Note that `next()` at the end. That tells us to move on to our next piece of middleware, in this case is the one that's going to send our email (well, sort of) and forward the user to the thanks page. We do that by writing a second `POST` function below the first, like this:

```
/* POST to contact page - part 2: send the email */
router.post('/', function(req, res, next) {
  // format email and send via SMTP server
  // ... or just console log it, for now!
  console.log(req.body);
  res.redirect('/contact/thanks');
});
```

That's all we need &hellip; for now. Save that file and open up `/public/javascripts/site.js`. We need to make a small update so that our form actually does anything other than logging to the console when submitted. Change this block:

```
    if (valid) {
      console.log('Valid!');
    } else {
      console.log('Errors!');
    }
```

to this:

```
    if (valid) {
      return form.submit();
    } else {
      return null;
    }
```

That's it! Save the file, refresh your server, head back to the contact page, fill it out properly, and submit. You'll see the data logged in your node console. We're done with this step. Don't worry, we will eventually be actually sending an email instead of just using `console.log` on the back-end.

Next time, we'll look into creating an API endpoint and talking to it with XHR (aka: Ajax). See you then!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
