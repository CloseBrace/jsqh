**JS Quick Hit: Full-Stack Project Part 5**

Video URL: https://youtu.be/Z8uyYtrJqSw

Today we're going to do something unique to this newsletter so far, I think. We're going to sign up for a 3rd party service. The reason we're doing this is because running your own SMTP server&mdash;in particular, getting it set up so that your emails are reliably delivered to users without being flagged as spam or otherwise marked as toxic in some way by services like Gmail&mdash;is really obnoxious.

We can set up a third-party SMTP server that handles all that crap for us for the low, low price of "free" (at least for the limited amount of emails we're going to be spending), which seems like a good deal to me. There are about a hundred million SMTP providers out there, but I like Mailgun because they have a developers-first approach, which means a very robust API and a solid set of easy-to-use modules ready to be plugged into your application.

So, if you don't already have a mailgun account, fire up a browser and head for http://mailgun.com and click the "Sign Up" button in the upper right. You might notice that they want your credit card info here. Don't worry: you don't have to provide it (however, they're very trustworthy and I assure you, they won't bill you unless your contact form suddenly starts blasting out thousands of emails every month &hellip; and even then, they'll warn you first). If you don't want to fill in your info, that's fine, just uncheck the box. You'll be limited to only sending to email addresses that have been authorized, but that's fine. We'll cover that in a second.

Fill in the rest of the form and create your account. There's a validation step (the ol' "click the link in the email we sent you" process), so go through that. Once you're all confirmed and signed in and all that good stuff, you'll be looking at your dashboard. Below the (probably empty) "Sending Overview" chart, you should see a list of "Sending Domains". There should be a sanbox domain listed, something like `sandboxcc85939c083f9378a9e720f0217b8927.mailgun.org`. That's your test domain, and it's all you're going to need. Click on it. You'll be presented with two choices in the main window. We're going to use the API, so click that, and you'll be given a list of languages to choose from. Obviously, you want `Node.js`, so choose that, and you'll be given some info and some sample code. You can ignore the sample code, but you'll need the API key and the base URL of your sandbox.

One other thing you need to do here: approve a receiving email address! This will be the address that our form sends to, but Mailgun in trial mode won't send to _any_ email addresses without approval. So, in the right column, under "Authorized Recipients", add whichever address you want to use. This will require you to go through another confirmation step by clicking a link that's emailed to the address you put into the box, so go do that. I'll wait. \*hums jeopardy theme\*. All set? Good, let's switch over to our text editor and start writing code!

OK, I lied, before we switch to the text editor we actually need to switch to a terminal window or command prompt, kill our sever, and type the following:

```
npm install --save mailgun-js
```

This will instill their handy Node module that we'll be using on the back-end. Let it do its thing, and then restart your server (preferably with nodemon) and head for your text editor for real. Open up `/routes/api.js` and let's wire this thing up. First, under this line:

```
var express = require('express');
```

add the following:

```
var mailgun = require('mailgun-js');
```

Now we need to configure Mailgun, so below this line:

```
var router = express.Router();
```

Add a padding line and then this code:

```
const sandbox = 'sandboxcc85939c083f9378a9e720f0217b8927.mailgun.org';
const key = 'key-ef48acf8d32ac32d9f76034fcd75a9f3';
const mg = mailgun({apiKey: key, domain: sandbox});
```

Now, here's the deal: **you have to replace those `sandbox` and `key` variables with your own values from mailgun**. The ones above are made up. They won't work, and you'll get nothing but mailgun errors. So make sure you use your own values.

Cool? Cool. Head down to the second `POST` catch, which looks like this:

```
/* POST to contact api - part 2: send the email */
router.post('/contact', function(req, res, next) {
  return res.json({ success: true });
});
```

And make it look like this!

```
/* POST to contact api - part 2: send the email */
router.post('/contact', function(req, res, next) {
  const { email, message, name } = req.body;
  const data = {
    from: `${name} <${email}>`,
    to: 'captaincode@closebrace.com',
    subject: 'Contact Form Submission',
    text: message
  };

  mg.messages().send(data, function (error, body) {
    if (error) {
      throw new Error(error.message);
    }
    return res.json({ success: true });
  });
});
```

See what we're doing here? We're creating a data object using the submitted form values, along with an email address to send the message to, and a subject, and then we're sending it. If there's an error, we throw an error. If not, all's well so we just return our JSON. This seems like a good time to note that **you need to change `captaincode@closebrace.com` to the email address you registered with mailgun or you will not receive any emails**.

Sorry for all the shouting, but I'm trying to head off frustration for you! Now that we have all of this in our API, we need to add it to our server-side form processing, too, so save this file and open up `/routes/contact.js`. I'm not going to repeat code, here &hellip; I'm very confident you folks can handle this. You need the import, the three new lines at the top, and then the sending code in the second `POST` catch, just like in the API file. There's only one difference. Instead of this line:

```
return res.json({ success: true });
```

go with this:

```
res.redirect('/contact/thanks');
```

That's it. Save the file, restart your server, and submit your contact form. One more bold note: **You need to use a Mailgun-verified address in the form input, too! Otherwise Mailgun won't send the mail (even though it reports a success).** Unless you've given them your credit card info, anyway.

If you've got your Mailgun configuration in your code set up correctly, you should receive a contact email! I just tested my code, and it worked. That's always nice. I hate when I write these tutorials and then find out everything's broken and have to go fix it (and yes, that does happen).

We're done for this week, and we're almost done with this series entirely. Next week we're going to talk about the _obvious security flaw_ of storing your API keys in your code, and how to mitigate it. After that &hellip; who knows? Reply to this email and tell me what you'd like to learn about!

See you next week.

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
