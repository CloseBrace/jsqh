**JS Quick Hit: MongoDB and Mongoose - Part 5 - Deleting Data**

Video URL: https://youtu.be/FULLoKBeqyc

Whether it's because they requested account removal, have reached a set amount of time of inactivity, or just disagreed with you about whether to use tabs or spaces &hellip; sometimes you gotta nuke a user. Let's add some delete links to our user list, and then let's make those delete links actually work. Make sure you have your server running with [Nodemon](https://nodemon.io/) so it'll catch code changes automatically.

First, go ahead and add a bunch of users to your list, so that you have lots to delete. Five or six should do.

Now open up `/views/userlist.ejs` and find this line:

```
            ${user.age}
```

**Below** it, but above the closing `</li>` tag, add the following:

```
            &nbsp; &nbsp;
            <button class="btn-delete" data-user="${user.id}">Delete</Button>
```

You can save this and refresh the page to see our ugly and ineffective delete buttons. Clicking on them does nothing. You know what this means: it's time to write some client-side event catchers. Remember those from [JS Quick Hits 57](https://closebrace.com/tutorials/2019-02-27/js-quick-hits-57-event-listeners)? If not, hit that tutorial for a quick refresher, or just follow along. It's pretty straightforward. First, create a file in `/public/javascripts` called `site.js`. Then add this code:

```
document.addEventListener("DOMContentLoaded", function() {
  const deleteButtons = document.getElementsByClassName('btn-delete');
  for (let i = 0; i < deleteButtons.length; i++) {
    // Get the user's ID from the button's data attribute
    const id = deleteButtons[i].getAttribute('data-user');
    deleteButtons[i].addEventListener('click', (event) => {
      console.log(id);
    });
  }
});
```

Then head back to `/views/userlist.ejs` and just below the stylesheet tag, add this line:

```
    <script src="/javascripts/site.js"></script>
```

Refresh, open your console, and click on the buttons, and you'll see that we're catching the clicks and logging the user's ID. That's great, but not going to get the job done. We're going to need to use XHR to submit them. We covered XHR in [JS Quick Hits 63](https://closebrace.com/tutorials/2019-04-10/js-quick-hits-63-full-stack-project-part-4-xhr), albeit not in depth. I should probably do a series on that, too, at some point! Anyway, here's a big lump of code to replace that `console.log` in `/public/javascripts/site.js`. I've commented it so it's clear what's happening:

```
      // Make the request
      const xhr = new XMLHttpRequest();
      xhr.open('DELETE', `/users/delete/${id}`, true);

      xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE) {
          // Success
          if (this.status === 200) {
            // reload the users page to remove the deleted user
            window.location = '/users';
          }
          // Failure
          else {
            alert('User was not deleted. Check console for error.');
            console.log(`Error: ${this.response}`);
          }
        }
      };

      xhr.send();
```

That's a fancy XHR request that makes a `DELETE` call to a URL that &hellip; well, that doesn't exist yet. We're going to fix that right now. Open up `/routes/users.js` and head for the bottom of the file. Just above the `module.exports` line, add this simple route:

```
/* DELETE to delete. */
router.delete('/delete/:id', function(req, res, next) {
  // Delete the user from the DB
  User.findByIdAndDelete(req.params.id, (err, user) => {
    if (err) { return res.status(500).send(err); }
    return res.status(200).send('success');
  });
});
```

As you can see, we're once again using Mongoose to make our life easier. We just pass it the ID of the user to delete, and it does the rest, looking up the user in the `users` collection, deleting them, and sending an error or success depending on whether things worked out or not.

We're done! Save any files you haven't saved and return to `localhost:3000/userlist` in your browser. Refresh the page, and delete one of your test users. You should see them disappear from the list. Hooray!

Next week we'll look at updating the users, which will involve a lot more code on the client side, and a bit more on the server side. See you then!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
