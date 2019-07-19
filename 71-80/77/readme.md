**JS Quick Hit: MongoDB and Mongoose - Part 4 - Retrieving Data**

Video URL: https://youtu.be/-xK4Lskv4fo

We've got data in our database, thanks to our simple and extremely ugly submission form and our Mongoose schema/model on the back-end. That's great, but it's not great enough! No, we're going to press onward and actually display that data on a page. You'll find that this is quite easy, thanks again to the power and utility of Mongoose. There's a reason why it's the de facto ORM tool for Node projects that use MongoDB!

Oh, by the way, ORM stands for "Object-relation Mapping," which basically means "the tool lets you work with nice, named API methods instead of just spewing raw data from the DB and expecting you to deal with it."

The first thing we need to do is get the data from the database. We're going to handle this in `/routes/users.js`. We already have a `GET` to the user listing, but it's not very useful. So instead of a generic "respond with a resource" message, let's put together an actual response! Here's the code:

```
/* GET users listing. */
router.get('/', function(req, res, next) {
  // Get the data from the DB
  var query = User.find();
  query.exec(function (err, userData) {
    if (err) {
      return res.send('Something went wrong retrieving users from the database');
    }
    // Send it to the view
    res.render('userlist', { title: 'User List', userData: userData });
  });
});
```

As you can see, we're using our model to perform a `find` operation. Because we've given it zero parameters, it's going to find everything in our `users` collection in the DB, which is what we want for our list. We'll cover adding parameters in a bit. For now, we need to create that `userlist` view, which doesn't currently exist. So add a blank file in `/views` called `userlist.ejs`. Then put this code in it:

```
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1><%= title %></h1>
    <ul>
      <%
        var userMarkup = '';
        userData.forEach(user => {
          userMarkup += `<li>
            <a href="/users/${user.username}">${user.name}</a>,
            <a href="mailto:${user.email}">${user.email}</a>,
            ${user.age}
          </li>`;
        });
      %>
      <%- userMarkup %>
    </ul>
    <p><a href="/">Add Another User</a></p>
  </body>
</html>
```

Save this file, head for `localhost:3000/users` in your browser, and you should see the test user we added last week show up in your list! We can add a few more, but let's make the whole loop a little smoother with one simple change. Open up `/routes/users.js`, and find this line:

```
    return res.send('Successfully added the user to the database.');
```

Then replace it with this one:

```
    return res.redirect('/users');
```

Save the file and refresh your browser. Now every time we save a new user, instead of a generic success message, you'll get immediately sent to the User List page, which should show the new user (along with our other users). Pretty cool!

Real quick, let's wire up those links so that clicking a user's name shows a detail page. First, open up `/routes/users.js` and, below the first `GET`, add this one:

```
/* GET individual user */
router.get('/:username', function(req, res, next) {
  // Get the data from the DB
  var query = User.findOne({username: req.params.username});
  query.exec(function (err, userData) {
    if (err) {
      return res.send('Something went wrong retrieving the user from the database');
    }
    // Send it to the view
    res.render('user', { title: 'User Data', userData: userData });
  });
})
```

We'll need a corresponding User view, so save this file and then create a new one in `/views` called `user.ejs`. Here's the code for it:

```
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1><%= title %></h1>
    <ul>
      <li><strong>ID:</strong> <%= userData._id %></li>
      <li><strong>Name:</strong> <%= userData.name %></li>
      <li><strong>Email:</strong> <%= userData.email %></li>
      <li><strong>Username:</strong> <%= userData.username %></li>
      <li><strong>Age:</strong> <%= userData.age %></li>
    </ul>
    <p><a href="/users">User List</a></p>
    <p><a href="/">Add Another User</a></p>
  </body>
</html>
```

We should be all set. Save that file, refresh your browser, and take a look at the user list page. Click a user's name, and you should see their details. Awesome!

Next week, we'll cover deleting a user, and after that we'll do updating. See you then!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
