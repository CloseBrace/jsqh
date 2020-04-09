**JS Quick Hit: Build a Tree With Recursion**

Video URL: https://youtu.be/rWOmbXqDP08

There's a part in Batman Begins where Alfred asks Bruce, "Why bats?" and Bruce responds, "Bats frighten me. It's time my enemies share my dread." Well, recursion is my bats, and you all are, uh &hellip; my enemies? No, wait, this analogy doesn't work very well, sorry.

But it's true that recursions scares me! Or at the very least, it confuses me, and a common reaction to confusion is fear! Recently I had cause to use recursion a bunch in some code work I was doing, and it reminded me that a) recursion is tremendously powerful and b) the best way to stop being confused by something is by repeated exposure. Every time I work with recursion, it makes a little more sense. So even though we already covered it back in [JS Quick Hits 46](https://closebrace.com/tutorials/2018-12-05/js-quick-hits-46-recursion-demystified) and [JS Quick Hits 47](https://closebrace.com/tutorials/2018-12-12/js-quick-hits-47-recursion-continued), let's do a refresher lesson, shall we?

Today we're going to iterate over an array full of arrays (which may also contain arrays) and use that data to build a tree. Here's our data array:

```
const dogs = [
  ['Dogs', 'https://wikipedia.org/wiki/Dog', [
    ['Spaniels', 'https://wikipedia.org/wiki/Spaniel', [
      ['American Cocker Spaniel', 'https://wikipedia.org/wiki/American_Cocker_Spaniel', []],
      ['Papillon', 'https://wikipedia.org/wiki/Papillon_(dog)', []],
    ]],
    ['Scent Hounds', 'https://wikipedia.org/wiki/Scent_hound', [
      ['Basset Hound', 'https://wikipedia.org/wiki/Basset_Hound', []],
      ['Dachshund', 'https://wikipedia.org/wiki/Dachshund', []],
    ]],
  ]],
];
```

So, that's a bit of a complicated data set, right? We have multiple nested arrays with three entries each. Though array entries aren't named, we're following a pattern: a name string, a url string, and a children array. It's this rigid pattern that's going to make recursion work for us. We want to build out HTML that looks like this:

```
<ul>
  <li>
    <a href="https://wikipedia.org/wiki/Dog">Dogs</a>
    <ul>
      <li>
        <a href="https://wikipedia.org/wiki/Spaniel">Spaniels</a>
        <ul>
          <li><a href="https://wikipedia.org/wiki/American_Cocker_Spaniel">American Cocker Spanial</a></li>
          <li><a href="https://wikipedia.org/wiki/Papillon_(dog)">Papillon</a></li>
        </ul>
      </li>
      <li>
        <a href="https://wikipedia.org/wiki/Scent_hound">Scent Hounds</a>
        <ul>
          <li><a href="https://wikipedia.org/wiki/Basset_Hound">Basset Hound</a></li>
          <li><a href="https://wikipedia.org/wiki/Dachshund">Dachshund</a></li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
```

We can do this with an extremely simple recursive function. It'll basically go "open the `ul`, look at the array, build the `li` and `a` tags, and then if the children array has a length greater than zero, re-run the function on the child array. If not, close the `li` tag and, if there's no more items in the array, close the `ul`."

The key to understanding how the recursion will work is that it always drills down until it can't anymore, then it works its way back up. So it'll open the first `ul`, make and `li` tag, make an `a` tag, insert "Dogs", and then see that the children array has entries and re-run the function on those entries. The top-level function WILL NOT FINISH until the sub-function has finished. Same deal with the sub-function. It WILL NOT FINISH if there are sub-sub-functions to run. So you go:

Open Dogs
&nbsp;&nbsp;&nbsp;&nbsp;Open Spaniels
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Open American Cocker Spaniel
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Close American Cocker Spaniel
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Open Papillon
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Close Papillon
&nbsp;&nbsp;&nbsp;&nbsp;Close Spaniels
&nbsp;&nbsp;&nbsp;&nbsp;Open Scent Hounds
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Open Basset Hound
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Close Basset Hound
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Open Dachshund
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Close Dachshund
&nbsp;&nbsp;&nbsp;&nbsp;Close Scent Hounds
Close Dogs

See how long it takes for the first function to finally end? That's because recursion is busy driving down and doing its thing.

With all that in mind, let's take a look at the code:

```
const buildTree = (data) => {
  let html = '<ul>'
  for (let i = 0; i < data.length; i += 1) {
    let kids = data[i][2];
    html += '<li><a href="' + data[i][1] + '">';
    html += data[i][0] + '</a>';
    if (kids.length > 0) {
      html += buildTree(kids);
    }
    html += '</li>';
  }
  html += '</ul>';
  return html;
}
```

I know this is complicated, so here's a version with a ton of comments:

```
const buildTree = (data) => {
  // Open this level's <ul>
  let html = '<ul>'

  // Loop through the array of data.
  // At the "dogs" level this length is one
  // At the next level, it's two: spaniels and scent hounds
  // At the next level, it's also two. For example, American Cocker Spaniel and Papillon
  for (let i = 0; i < data.length; i += 1) {

    // The children array is always in position 2
    let kids = data[i][2];

    // Build our <li> and <a> tags
    html += '<li><a href="' + data[i][1] + '">';
    html += data[i][0] + '</a>';

    // Don't close the <li> if there's data in the children array. Instead, recurse the function
    if (kids.length > 0) {

      // Note how we're adding ALL of the returned HTML from the recursive function to this iteration's html string
      html += buildTree(kids);
    }

    // Now that all children have been accounted for, close this level's <li>
    html += '</li>';
  }

  // close this level's <ul>
  html += '</ul>';

  // Return the complete HTML
  return html;
}
```

And here's what it looks like on the page:

* [Dogs](https://wikipedia.org/wiki/Dog)
  * [Spaniels](https://wikipedia.org/wiki/Spaniel)
    * [American Cocker Spaniel](https://wikipedia.org/wiki/American_Cocker_Spaniel)
    * [Papillon](https://wikipedia.org/wiki/Papillon_(dog))
  * [Scent Hounds](https://wikipedia.org/wiki/Scent_hound)
    * [Basset Hound](https://wikipedia.org/wiki/Basset_Hound)
    * [Dachshund](https://wikipedia.org/wiki/Dachshund)

Now, I'm pretty positive that if you're new to recursion, this one tutorial isn't going to suddenly make you a complete master. It's a tough concept to wrap your brain around. I had to rewrite that function multiple times to get it right, and I _just did a similar exercise_ like two weeks before I wrote this tutorial. They key is to not get frustrated. Once you get the basics, then you can put together a function, see that it doesn't work, and begin tweaking it until it does. As you grow more and more confident, your functions will require less tweaking to get them to a working state. This building up of knowledge through practice is the amazing process we humans refer to as "learning" and while it's sometimes painful, it's virtually always worthwhile!

Have you got something you're struggling with and on which you'd like me to do a short tutorial? Don't hesitate to reach out by replying to the newsletter, leaving a comment on YouTube, or joining the [CloseBrace public slack workspace](https://join.slack.com/t/closebracepublic/shared_invite/enQtOTM0MzgyMjMxNTczLTM4MWEyODhlNTI4ODczNTExMDZjZGIyNDBhYzBkOWMxMDY1MWM0YmQzYWMzOWY3NmVlNjQzYzg0MWEwZmM5M2I)!

See you next week.

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
