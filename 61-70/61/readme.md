**JS Quick Hit: Full-Stack Project Part 2**

Video URL: https://youtu.be/dPNZ3APe05w

Last week we [started in on a full-stack application](https://closebrace.com/tutorials/2019-03-20/js-quick-hits-60-full-stack-project-part-1-setup). This tutorial builds on that one, so make sure you follow it, first! If you've gone through that one, you have a handy contact form at `localhost:3000/contact` which we need to make do, well, anything. We're going to start with some front-end validation. There are tons of libraries in NPM that are available for this, but we're not building a bundled app and I don't want to get into working with Browserify or Webpack here, so we have two choices: either roll our own or use simple script tags to import a library.

Rolling our own would be its own set of tutorials, so I'm going with the latter approach. We're going to be using one called Pristine, which I like for a variety of reasons, but the biggest of them are that it's all Vanilla JS, it compresses down to 2 KB when gzipped, it's updated regularly on GitHub as of this writing, and it's really easy to use. You can download it or get the github link at [pristine.js.org](http://pristine.js.org/). All you really need from the zip file or repo is `/dist/pristine.min.js`, which you should copy into the `/public/javascripts` folder in your project.

Next step, create a new file in `/public/javascripts/` called `site.js`. This is going to hold our custom JS. For now, just add this code to it:

```
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM is ready');
});
```

Good times &hellip; don't worry, we'll be adding to that shortly. For now let's import our two files by adding script tags to our contact form. Open up `/views/contact.ejs`, and below this line:

```
<link rel='stylesheet' href='/stylesheets/style.css' />
```

Add these two:

```
    <script src="/javascripts/pristine.min.js"></script>
    <script src="/javascripts/site.js"></script>
```

And while you're there, find this line:

```
    <form method="post" action="/contact">
```

and give it an ID, like this:

```
    <form method="post" action="/contact" id="formContact">
```

Save that file, restart your server (or start it, if it wasn't running), and head for your contact page. If you refresh with your console open, you'll see it's logging our "DOM is ready" message. Good, good. Let's connect Pristine to our form.

In `/javascripts/site.js`, remove the `console.log` line and replace it with this:

```
  const form = document.getElementById('formContact');
  const pristine = new Pristine(form);

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const valid = pristine.validate();

    if (valid) {
      console.log('Valid!');
    } else {
      console.log('Errors!');
    }
  });
```

Save, refresh, and try submitting your form with your console open. You'll see it returning `Valid!` which seems weird since we're submitting an empty form, but that's because we haven't told Pristine what to check for yet! What's interesting is that Pristine does some validation out of the box. So, for example, if we add `asdf` to the email field and submit it, we'll get `Errors!` because that's not a valid email address. However, our fields don't have any minimum length or `required` attributes set on them, which is why it's accepting a blank form. Let's fix that. Switch back over to `/views/contact.ejs`. Find all this code:

```
      <fieldset>
        <label for="name">Name</label>
        <input type="text" name="name" id="inputName" placeholder="Leslie Smith" />
        <label for="email">Email</label>
        <input type="email" name="email" id="inputEmail" placeholder="captaincode@closebrace.com" />
        <label for="message">Message</label>
        <textarea name="message" id="inputMessage" placeholder="Your message here" maxlength="500"></textarea>
      </fieldset>
```

And change it to this:

```
      <fieldset>
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" name="name" id="inputName" class="form-control" minlength="3" placeholder="Leslie Smith" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" name="email" id="inputEmail" class="form-control" minlength="6" placeholder="captaincode@closebrace.com" required />
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea name="message" id="inputMessage" class="form-control" maxlength="800" placeholder="Your message here" minlength="5" required></textarea>
        </div>
        <div class="center"><button type="submit" id="btnSubmit">Submit</button></div>
      </fieldset>
```

Yeah, that's a big change. Sorry. We have to use certain wrappers to make Pristine work properly! Now the last thing we need to do (for this tutorial) is update our CSS a bit. Open up `/public/stylesheets/style.css` and _underneath_ the big hideous blob of CSS, add this new big hideous blob of CSS:

```
input[type=email],input[type=text]{margin-bottom:0}.form-group{margin-bottom:1rem}.has-success .form-control{border-bottom:1px solid #CCC}.has-danger .form-control{border:1px solid #dc1d34}.form-group .text-help{color:#dc1d34;font-size:1rem}.pristine-error{display:table}
```

Lookin', uh &hellip; good? Well anyway, save the file and refresh your contact page. Now submit the form and you'll see that we get red borders and responsive red error text as we make changes. Neat! Front-end validation is done enough for our current needs.

In the next tutorial, we'll wire up what to do when we have a submittable form. See you there!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
