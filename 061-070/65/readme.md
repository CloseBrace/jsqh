**JS Quick Hit: Full-Stack Project Part 6**

Video URL: https://youtu.be/gUlQyoASWHU

Last week, we got our application up and running with an SMTP provider and sent out some test emails. That was pretty cool, but there was a problem: we were inserting our API key right into our code. In a test application, this is no big deal. In a real-world application, it's a huge problem, because it exposes your API keys (and any other secrets you're working with) to anyone with access to your github repo, which could be anyone with an internet connection if your repo's not private. Even if your repo _is_ private, it's still a pretty bad idea. So let's fix it.

First, we'll need to talk about environment variables. Environment variables are variables that are stored in your development and/or production environment, and referenced by your application. They're a perfect place to store API keys and the like, because they exist in the server environment but not in your code, which means they don't get checked into version control.

Traditionally, setting environment variables has been a mild pain in the butt, involving shell configurations and other factors. Thankfully, in the JS world we've got Dotenv, which makes life extremely easy. If you've been working in JavaScript, particularly JS application development, for more than a few weeks, you've probably at least heard of a `.env` file. This simple text file is consumed by Dotenv and transformed into environment variables that are accessible anywhere in your Node.js application. This, my friends, is awesome. Let's install it. Head for your contact form app's directory in a terminal or command prompt and type the following:

```
npm install --save dotenv
```

Let that do its thing and then restart your server (as always, preferably with Nodemon), and then head for your text editor. We need to initialize Dotenv so that we can use it anywhere in our server. Open up `app.js`. This next part is complicated, but stay with me. At the very top of the file, add this line:

```
require('dotenv').config();
```

Now save the file. OK, you're done, and also I lied about this being complicated. That's all we had to do. We can now access Dotenv variables anywhere in our Node app. Woo-hoo-HOO!

Let's make a `.env` file. Put it at the top level, like `app.js`. If you're on a Mac, you might get a warning that files beginning with a period are typically system files and may not be displayed in, for example, Finder. Fortunately, we're not worried about looking at this file in anything but our text editor, which _will_ show it, unless it's a bad text editor, in which case you probably should use a good one instead. Just a thought!

Moving on. Have you created the file? Good. Now add this code to it:

```
SANDBOX=sandboxcc85939c083f9378a9e720f0217b8927.mailgun.org
KEY=key-ef48acf8d32ac32d9f76034fcd75a9f3
```

Except, of course, **you should use your actual values from the last tutorial for those two items, rather than these made-up ones!** By the way, it's accepted practice for environment variables to be in all caps. Cool? All right, save this file and then open up `/routes/api.js`. Find these three lines near the top:

```
const sandbox = 'sandboxcc85939c083f9378a9e720f0217b8927.mailgun.org';
const key = 'key-ef48acf8d32ac32d9f76034fcd75a9f3';
const mg = mailgun({apiKey: key, domain: sandbox});
```

And replace it with this code:

```
const { SANDBOX, KEY } = process.env;
const mg = mailgun({ apiKey: KEY, domain: SANDBOX });
```

Save the file. You'll note we don't have to do anything to get that `process` variable. That's because it's natively accessible anywhere within a Node app. Sweet. One thing to note: if you change your `.env` file you'll need to hard-restart your server. Nodemon doesn't natively detect changes to that file. Anyway, this should work, but let's go ahead and change `/routes/contact.js` and make the exact same change we just made. Swap out our `sandbox` and `key` variables for our new `SANDBOX` and `KEY` environment variables. Save that file, too.

We're ready to test! Flip over to `localhost:3000/contact` in your browser, refresh the page if it's been sitting there open since last week, and submit the form. Remember that you need to type in an approved email address or Mailgun will give you a success message but never actually send the email. You should get the same success message as last week.

Oh, side note: if you're keeping this stuff in a repo and had Github generate a `.gitignore` file, it probably already including `.env` files, but if not, you'll need to manually add the file to `.gitignore`. Otherwise you're still going to have the same problem of secrets ending up in the repo.

That's it! We've created an app, built out a front-end and back-end, got some validation working, got XHR working, got SMTP sending, and secured our secrets. Not a bad place to wrap up, since getting more complicated than this gets into "I ought to just make a full course on it" territory.

Next week we'll be back with something standalone and, I promise, a bit shorter than these last few not-so-quick hits. See you then!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
