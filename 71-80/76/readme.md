**JS Quick Hit: MongoDB and Mongoose - Part 3 - Sending Data**

Video URL: https://youtu.be/1msN_7JqnlI

Last week we got our application talking (OK, connecting) to our database and created a user model. This week we're going to build a form, `POST` to our backend, handle the `POST`, and use a model to send the data to our db. Ready to get started? Let's do it!

First we need a form. Start your server if it's not already running and load up `localhost:3000` in your browser. You should see the generic "Welcome to Express" text. We're going to replace that with a `fieldset`, so switch to your text editor and open up `/views/index.ejs`. Find this line:

```
    <p>Welcome to <%= title %></p>
```

And replace it with all of the following:

```
    <div style="width: 400px;">
      <form action="/users/create" method="post" id="formCreateUser">
        <fieldset>
          <legend>Create a User</legend>
          <label>Name: <input type="text" name="name" id="inputName" /></label><br /><br />
          <label>Email: <input type="email" name="email" id="inputEmail" /></label><br /><br />
          <label>Username: <input type="text" name="username" id="inputUsername" /></label><br /><br />
          <label>Age: <input type="number" name="age" id="inputAge" /></label><br /><br />
          <label>Twitter: <input type="text" name="twitter" id="inputTwitter" /></label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </div>
```

Note that we've included a field, Twitter, that we didn't define in our schema last week. This is intentional. If you save and refresh, you'll see our extremely ugly and unstyled form. If you'd like a tutorial on how to validate this sort of form, I recommend visiting [JS QUick Hits 60](https://closebrace.com/tutorials/2019-03-20/js-quick-hits-60-full-stack-project-part-1-setup), where we build a simple contact form and validate it both on the front-end and the back-end. For today, we're going bareback, which I do not recommend in a production environment since your DB will very rapidly be filled with nonsense at best and malicious code at worst, but should be fine for a simple test on our local machines.

Our form's done, so we move onward to handling that `POST`. Open up `/routes/users.js`. First things first, I don't like that camelcase in `userName`. It's makes it sound like the user's name, instead of, well, the username. So replace this line:

```
  userName: String,
```

with this one:

```
username: String,
```

This is good, because it means our model will match our incoming form data (except for the `twitter` property), which is useful for not having to do conversions.

Next, above the `module.exports` line at the bottom, but below everything else, write the following code:

```
/* POST to create. */
router.post('/create', function(req, res, next) {
  // insert user into DB
  // if there's an error, send an error message
  // if not, send a success message
});
```

You may notice that this code isn't going to do much right now. Well spotted! We need to turn those comments into actual code. But first, we need to create a model. You might remember that last week, I said that models were separate things from schemas. Well, they are! We create a model from the schema, and then use the model to interact with the database. So, just below our schema definition, add this:

```
var User = mongoose.model('User', userSchema);
```

Now back to our POST. We're going to replace the three lines of comments with the following code:

```
  // insert user in DB
  var NewUser = new User(req.body);
  NewUser.save(function(err, resp) {
    // If there's an error, send an error message
    if (err) {
      return res.send('Something went wrong adding the user to the database.');
    }
    // If not, send a success message
    return res.send('Successfully added the user to the database.');
  });
```

That's all it takes! Save the file and head back to your browser. Fill in the form with some data, and submit it. You should see your success message show up. That's &hellip; well, conceptually it's cool but it's not very exciting. Let's check and see if that data actually made it into our DB. Open a new terminal window or command prompt and just type `mongo`. This will initialize the MongoDB shell, which by default connects to localhost, which is where we're storing our data. Type the following:

```
show dbs
```

And you should see your `jsqh` DB in the list. To look at data inside that DB, we type the following:

```
use jsqh
```

Once we do that, it sets an internal `db` variable to that particular database. We can now issue commands to our `jsqh` DB via that variable, like this:

```
db.users.find()
```

Hey, there's our user. There's a few things to pay attention to, here. The first is that the `twitter` value did not get recorded. That's because it's not in our schema! Which is kind of the whole point of schemas: they ensure that data you don't want in your DB doesn't get sent to your DB. The next thing to note is that the users collection was created automatically when we saved our first user. This is just a handy thing that Mongoose does. If we'd named our model `Person` instead of `User`, we'd end up with a collection called `persons`. I suppose this means you should shy away from model names that have irregular plurals, like, uh &hellip; mouse, or cactus. Should you need to use those, Mongoose does let you specify collection names, but that's out of the scope of this tutorial.

We're all set for this week. Next week, we're going to read data back out of the database and display it on our website. See you then!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
