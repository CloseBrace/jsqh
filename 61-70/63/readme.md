**JS Quick Hit: Full-Stack Project Part 4**

Video URL: https://youtu.be/uGGTurjoxdU

Let's make an API endpoint! We don't really need to do this &hellip; we already have a working contact form, after all. But this is a good exercise for understanding XHR. It'll good times for everyone! Let's get started.

Oh, obviously, given that this is part four, you should have done parts one, two, and three already, otherwise you're going to be lacking the scaffolding necessary to proceed. Make sure you've done those, and then this will make a lot more sense!

Add a new file to `/routes` called `api.js` and inside it, start with this code, which is the same as all the rest of our routes:

```
var express = require('express');
var router = express.Router();

module.exports = router;
```

Before we go further, let's make sure Express knows about this route by adding it to `App.js`. So, open that file, and adjust your route requires to look like this:

```
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contactRouter = require('./routes/contact');
var apiRouter = require('./routes/api');
```

And then your router `app.use` declarations to look like this:

```
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contact', contactRouter);
app.use('/api', apiRouter);
```

That's all that's needed there, so save the file and switch back to `/routes/api.js`. We're going to catch a POST to `/api/contact`, which we'll use to make the XHR request. No need for any GETs in this router; we're not serving pages from it. Here's the code. This is a big bunch of stuff, but it's nearly identical to the two POST catches we already have in the contact router.

```
/* POST to contact api - part 1: validation */
router.post('/contact', function(req, res, next) {
  const { email, message, name } = req.body;
  const errors = {
    hasError: false,
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
    errors.hasError = true;
    return res.json(errors);
  }

  next();
});

/* POST to contact api - part 2: send the email */
router.post('/contact', function(req, res, next) {
  return res.json({ success: true });
});
```

See the difference? We've made a slight change to our errors object for expediency, and then sending the result as JSON if there are any issues to report. We're also returning a success message as JSON if everything works out. Save this file, because we're done here. Time to head for the front-end. First, let's add the ability for our contact form to display error and success messages. Open up `/views/contact/ejs`. Below the `h1` tag, but above the `form` tag, add the following:

```
    <div class="success-message" id="msgSuccess">Thanks! Your message has been sent.</div>
    <div class="error-message" id="msgError">Sorry, something went wrong. The server reported:<br/><ul id="errorList"></ul></div>
```

Save that file and open `/public/stylesheets/style.css`. It's time for another big blob of minified CSS! Here's the code. Just add it at the end of the file:

```
.success-message{background:#EFE;border:1px solid #0A0;color:#0A0;display:none;font-size:1rem;margin:0 0 1rem;padding:30px}.error-message{background:#FEE;border:1px solid #A00;color:#A00;display:none;font-size:1rem;margin:0 0 1rem;padding:30px}.error-message ul{margin-bottom: 0}
```

Fabulous. Save that file and head to `/public/javascripts/site.js`. This is where the rubber hits the road. Pristine's already catching our button click, so we don't have to write code for that. We just have to change this line:

```
      return form.submit();
```

To this:

```
      submitForm();
```

Of course, we haven't written the `submitForm` function yet, so let's do that. At the very bottom of the file, below the brace that closes the `DOMContentLoaded` event listener, add this function. This is a hu-huuuuge chunk of code compared to most of what I do in these tutorials. Sorry! I've commented it to make it clear what's happening.

```
const submitForm = () => {
  // Get DOM elements we'll be working with
  const msgError = document.getElementById('msgError');
  const msgErrorList = document.getElementById('errorList');
  const msgSuccess = document.getElementById('msgSuccess');
  const form = document.getElementById('formContact');

  // harvest the form data
  const email = document.getElementById('inputEmail').value;
  const message = document.getElementById('inputMessage').value;
  const name = document.getElementById('inputName').value;
  const data = {
    email,
    message,
    name,
  };

  // Make the request
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/contact', true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function() {
    // Success, but still could have validation errors
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      const { response } = this;
      let resp = null;
      if (response && response !== '') {
        resp = JSON.parse(response);
      }

      // Check for validation failure
      if (resp && resp.hasError) {
        // Populate the error box and show it
        let str = '';
        resp.list.forEach(errorText => (str += `<li>${errorText}</li>`));
        msgErrorList.innerHTML += str;
        msgError.style.display = 'block';
      }

      // Success - turn on the success box and blank the form
      if (resp && !resp.hasError) {
        form.reset();
        msgSuccess.style.display = 'block';
        msgError.style.display = 'none'; // just in case
      }
    }

    // Failure. Error out gracefully
    if (this.readyState === XMLHttpRequest.DONE && this.status !== 200) {
      msgErrorList.innerHTML += `<li>Server Error: ${this.status}</li>`;
      msgError.style.display = 'block';
    }
  };

  xhr.send(JSON.stringify(data));
};
```

We're done. Save the file, head for `localhost:3000/contact` in your browser, and make sure you refresh the page to get the new client-side JS and CSS styles. Then fill in your form with whatever, and hit submit. You should see your success message. Cool! Want to quickly check the error message? Just head to `/routes/api.js` and change this line:

```
  if (!email || email === '') {
```

to this:

```
  if (email || email === '') {
```

Which will generate an error even though you've submitted a working email address. You can do the same thing for message and name, if you'd like. Then save the file, refresh your page, and resubmit your form to see your glorious error box in action. Just make sure to change that code in `/routes/api.js` back!

That's it for this week. Next week we're going to wire up an actual SMTP service. It's pretty easy, but you'll have to sign up for a free website. I'll talk you through the whole thing. See you there!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
