**JS Quick Hit: Mmm &hellip; Cookies**

Video URL: https://youtu.be/5dx5iXwzw4s

I'm surprised I haven't covered cookies yet. They're an important piece of the web. So important, in fact, that the EU got all freaked out about them and passed an idiotic piece of legislation that resulted in a hundred million banners saying "this website uses cookies" on which everyone just clicks "ok fine, whatever" without really thinking about it!

&hellip; but I digress. Cookies allow you to store small bits of data on a user's PC, via their browser, for a set period of time. You can then retrieve that data later. Basically they act sort of like a very small, very impermanent database. Cookies are most frequently used in association with sessions for handling things like logging in and access control, but you can also store things like a visitor's preferences in them. That's what we're going to do today.

We have to use an Express server here because most browsers no longer support setting cookies through a local file. If you need a refresher on how to set up a server, check out [JS Quick Hits 52](https://closebrace.com/tutorials/2019-01-23/js-quick-hits-52-intro-to-express). Once you have a server scaffolded out, just open `/views/index.js`. We're going to do all of our work here, because I'm lazy. Replace everything in the file with the following code. This is a bunch of boilerplate that we're not going to cover it here because we've covered it elsewhere. Basically, it just sets us up to be able to interact with our form.

```
<!DOCTYPE html>
<html>
  <body>
    <div>
      <p>Which is your favorite (available) Avenger?</p>
      <form>
        <label><input type="radio" id="ironman" name="avenger">Iron Man</label><br />
        <label><input type="radio" id="captainamerica" name="avenger">Captain America</label><br />
        <label><input type="radio" id="thor" name="avenger">Thor</label><br />
        <label><input type="radio" id="blackwidow" name="avenger">Black Widow</label><br />
        <label><input type="radio" id="hulk" name="avenger">Hulk</label><br />
        <label><input type="radio" id="warmachine" name="avenger">War Machine</label><br />
        <label><input type="radio" id="antman" name="avenger">Ant-Man</label><br />
        <label><input type="radio" id="rocket" name="avenger">Rocket</label><br />
        <label><input type="radio" id="nebula" name="avenger">Nebula</label><br />
        <label><input type="radio" id="captainmarvel" name="avenger">Captain Marvel</label><br />
        <button id="btnSaveChoice">Save</button>
      <form>
    </div>
  </body>
<script>
document.addEventListener('DOMContentLoaded', () => {
  // Get button by ID
  const btn = document.getElementById('btnSaveChoice');

  // Catch button click
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    setChoice();
  });
});
</script>
</html>
```

OK, we've got a bunch of Avengers to choose from, and a button to click. You'll note that clicking the button runs a `setChoice` function that doesn't currently exist. That's a bummer, but we'll fix it in a second. First, we need to write a few lines of code that read all of the available cookies and convert them into a handy object that we can access. Here's the code:

```
  const cookies = {}
  document.cookie.split('; ').forEach(cookie => {
    const cookieArray = cookie.split('=');
    cookies[cookieArray[0]] = cookieArray[1];
  });
```

Cookies live on `document.cookie`, and look something like this: `test=testval; test2=testval2`. We're just taking that string, turning it into an array of key/value pairs, and then making an object out of it. There are a variety of ways to do this, including using `Array.reduce`, but I like this one because I find it a bit more readable. If you have a way you'd rather do it, go for it!

Next up, let's write our `setChoice` function. Below the entire `DomContentLoaded` event listener, so just above the closing `script` tag, add the following:

```
const setChoice = () => {
  const avenger = document.querySelector('input[name="avenger"]:checked').id;
  document.cookie = `avenger=${avenger}; expires=Tue, 31 Dec 2030 23:59:58 UTC;`;
}
```

The first thing we do here is grab the id from the checked radio button (so, for example, Captain America would be `captainamerica`). Then we get to the meat of things. We use `document.cookie` to set our cookie, complete with expiration date. Note: you don't have to provide an epiration date. By default, cookies expire at the end of the session, so for example when you close your browser. That's not always useful, though, so I've picked a date far in the future. If you're reading / watching this one minute past midnight on January 1st, 2031, first off, Happy New Year and second off, way to go me for keeping this site running an additional almost-twelve years! If you want to continue with this tutorial, pick a date that is sometime in your future.

If you use `document.cookie` again, you **will not** overwrite existing cookies. It's not quite like a normal string. Instead, assuming you use a different cookie name, it'll just append the new cookie to the list. If you want to modify a cookie, just use `document.cookie` with the same cookie name and a new value. And in order to actually remove a cookie, you need to use `document.cookie` with the appropriate name, but an expiration date that's set sometime in the past. I suggest May 23rd, 1977, which is known internationally as the date of my birth or, alternately, "two days before Star Wars came out."

All right, let's finish this up. We need to use the stored cookie to select the proper radio button. The code goes just below all the code we wrote to parse the cookies. It looks like this:

```
  if (cookies.avenger) {
    document.getElementById(cookies.avenger).checked = true;
  }
```

That's it! Save the file, fire up your server, and head for `localhost:3000`. Your should see your radio buttons. Choose your Avenger, click save, watch all of the glorious _nothing_ happen! Very exciting. But wait &hellip; refresh the page, and you'll see that your chosen avenger remains checked. Cool. Let's prove it works by selecting another Avenger, but _not_ clicking the save button. Now hit refresh again and notice that your original choice has been repopulated. We're only writing the cookie when the save button is pressed.

That's it for this brief overview of cookies. There is, of course, another way of storing data in the browser: local storage. But that's a whole other tutorial.

Oh, and here's some homework if you feel like it: why not try creating a "clear selection" button that clears your `avenger` cookie?

Until next time.

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._