**JS Quick Hit: MongoDB and Mongoose - Part 5 - Deleting Data**

Video URL: https://youtu.be/2zHwhfektwc

All right, we've got a lot to get through today, so I'm going to jump right in. By now you should have a pretty good idea of how all of these pieces work, so I'll keep the explanations to a minimum and just focus on "here's what we need to do, and here's the code to do it."

So, here's what we need to do: add an update link to each user in our list. Open up `/views/userlist.ejs` and just below the delete button line, add the following code:

```
            &nbsp; &nbsp;
            <a href="/users/update/${user.id}">update</a>
```

We could do this with a button and a bunch of XHR, but I think this is going to be quicker and easier. We'll create a `GET` route for that page, it'll snag the user info from the DB and populate the form. Then we'll submit the form with an `POST` method (with a RESTful API we'd use `PUT`, but form submissions can only be `GET` or `POST`), update the user, and kick back to the list page. So save the file you just changed, and then create a new file in `/views/` called `update.ejs`. Here's the code:

```
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1><%= title %></h1>
    <div style="width: 400px;">
      <form action="/users/update" method="post" id="formUpdateUser">
        <fieldset>
          <legend>Update a User</legend>
          <label>Name: <input type="text" name="name" id="inputName" value="<%= user.name %>" /></label><br /><br />
          <label>Email: <input type="email" name="email" id="inputEmail" value="<%= user.email %>" /></label><br /><br />
          <label>Username: <input type="text" name="username" id="inputUsername" value="<%= user.username %>" /></label><br /><br />
          <label>Age: <input type="number" name="age" id="inputAge" value="<%= user.age %>" /></label><br /><br />
          <input type="hidden" name="id" id="inputUserId" value="<%= user._id %>" />
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </div>
  </body>
</html>
```

Save that file, and obviously we need to update our route to access it (and provide it data). So open up `/routes/users.js` and at the bottom, above the `module.exports` line, add this code:

```
/* GET to update. */
router.get('/update/:id', function(req, res, next) {
  // Get the user from the DB
  var query = User.findOne({_id: req.params.id});
  query.exec(function (err, userData) {
    if (err) {
      return res.send('Something went wrong retrieving the user from the database');
    }
    // Send it to the view
    res.render('update', { title: 'Update User Data', user: userData });
  });
});
```

Save that file, and we should be able to head over to `localhost:3000/users`, see our update links, click on them, and our form should show up, auto-populated with the user's data. So far, so good! Now we need to do something when the form's submitted, so head back to `/routes/users.js` and, again, at the bottom but above `module.exports`, add this line:

```
/* POST to update. */
router.post('/update', function(req, res, net) {
  const { age, id, email, name, username } = req.body;
  // Update the user in the DB
  User.updateOne(
    { _id: id },
    { name, email, username, age },
    (err, user) => {
      if (err) { return res.status(500).send(err); }
      // Redirect to the user list
      return res.redirect('/users');
    }
  );
});
```

We're using a bit of destructuring there to keep the code clean. If you're unfamiliar with destructuring, check out [JS Quick Hits 5](https://closebrace.com/tutorials/2018-02-21/js-quick-hits-5-variable-destructuring). If you're unfamiliar with variable shorthand, try [JS Quick Hits 11](https://closebrace.com/tutorials/2018-04-04/js-quick-hits-11-object-shorthand).

Anyway, that's it, we're done! Save the file, head back to `localhost:3000/users`, click an update link, make some changes, and submit. You should be kicked back to the user list, and your changes should show up. Exciting!

So, there we go. We've covered the basics of CRUD with MongoDB and Mongoose. We're going to handle authentication at some point in the future, but I think we've earned a rest from mutli-part tutorials. Next week will be &hellip; well, I haven't figured that out, yet, but it'll be a one-off. See you then!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
