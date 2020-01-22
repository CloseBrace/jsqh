**JS Quick Hit: Applying Lessons**

Video URL: https://youtu.be/TslRAbVzUwc

We're going to do something different this week, and basically run through a bunch of stuff we've learned in the past in order to make a very simple dynamic web page. I'm going to load you up with code right from the start, specifically a bunch of HTML and a bunch of data. Here's the HTML:

```
<html>
  <body>
    <div>
      <select id="select">
        <option value="all">All Titles</option>
        <option value="published">Published Only</option>
      </select>
    </div>
    <div>
      <table border="1" cellpadding="10" cellspacing="0">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Age</th>
            <th>Pages</th>
            <th>Year Published</th>
          </tr>
        </thead>
        <tbody id="bookList">
        </tbody>
      </table>
    </div>
  </body>
<script>
</script>
</html>
```

Nothing crazy happening here, but note that we're adding IDs to the `select` and the `tbody`. That's because we're going to be reading the `select`'s value and manipulating the `tbody`'s inner HTML later.  Now here's the data, which you should put in between the `<script>` and `</script>` tags:

```
const myBooks = [
  { age: 'Adult', genre: 'Urban Fantasy', pages: 350, published: true, status: 'Published', title: 'The Blood That Bonds', yearFinished: 2009, yearPublished: 2009 },
  { age: 'Adult', genre: 'Urban Fantasy', pages: 489, published: true, status: 'Published', title: 'Blood Hunt', yearFinished: 2011, yearPublished: 2011 },
  { age: 'Adult', genre: 'Urban Fantasy', pages: 510, published: true, status: 'Published', title: 'The Children of the Sun', yearFinished: 2012,yearPublished: 2012 },
  { age: 'Young Adult', genre: 'Science Fiction', pages: 341, published: true, status: 'Published', title: 'The Broken God Machine', yearFinished: 2013, yearPublished: 2013 },
  { age: 'Middle Grade', genre: 'Urban Fantasy', pages: 280, published: false, status: 'Trunked', title: 'The Werewolf at the Window', yearFinished: 2013, yearPublished: 0 },
  { age: 'Adult', genre: 'Thriller', pages: 395, published: true, status: 'Published', title: 'Elixir', yearFinished: 2014, yearPublished: 2018 },
  { age: 'Adult', genre: 'Sci-Fi / Horror', pages: 430, published: false, status: 'Trunked', title: 'Pulse', yearFinished: 2015, yearPublished: 0 },
  { age: 'Adult', genre: 'Space Opera', pages: 380, published: false, status: 'Shopping to Agents', title: 'Divergence Point', yearFinished: 2017, yearPublished: 0 },
  { age: 'Adult', genre: 'Urban Fantasy', pages: 350, published: false, status: 'Shopping to Agents', title: 'Possessed', yearFinished: 2019, yearPublished: 0 },
];
```

Yes &hellip; those are actually my books. Did you know I write fiction? Well, shameless self promotion time! You can find all five of my published books on basically every eBook platform, and also in print on Amazon, and you can learn more at [cwbwriting.com](http://cwbwriting.com).

OK, promotion done. Let's get to actually coding. We're going to fill that table with stuff using the array of data, and then change it based on what's selected. To start, we want to wait for the DOM to be ready before we start doing anything, so below the data, add this code:

```
document.addEventListener('DOMContentLoaded', () => {
});
```

We talked about event listeners in [JS Quick Hits 57](https://closebrace.com/tutorials/2019-02-27/js-quick-hits-57-event-listeners) but to quickly recap, what we're doing here is saying "hey, once this DOM is ready, run the following function." We're using an arrow function here, which we covered in [JS Quick Hits 12](https://closebrace.com/tutorials/2018-04-11/js-quick-hits-12-arrow-functions-part-1) and [JS Quick Hits 13](https://closebrace.com/tutorials/2018-04-18/js-quick-hits-13-arrow-functions-part-2).

Of course, the arrow function is empty at the moment. Let's fix that. Between the braces, add this code:

```
  // We want the element we're going to fill and the selectbox
  const tbody = document.getElementById('bookList');
  const select = document.getElementById('select');

  // On load
  fillData('all', tbody);


  // On Change
  select.addEventListener('change', e => {
    fillData(select.value, tbody);
  });
```

We covered DOM query selectors in [JS Quick Hits 16](https://closebrace.com/tutorials/2018-05-09/js-quick-hits-16-dom-query-selectors), and here we're using them to grab the `tbody` and `select` elements so that we can use them elsewhere. And by "elsewhere" I mean "directly below." You'll note that we're calling a `fillData` function and passing it the `tbody` value and, in the second event listener (which we're adding to our select), the value currently selected in the selectbox.

You'll also note that the `fillData` function doesn't actually exist, yet! So let's create that. We can do that outside of the `DOMContentLoaded` event listener. It's up to you whether you prefer to have the function up top or down below. I like the latter, so that's where I'm putting it. Here's the code:

```
const fillData = (selectVal, tbody) => {
  let bookList = myBooks;
  // show all or just published?
  if (selectVal === 'published') {
    bookList = myBooks.filter(book => book.published);
  }

  // Create the HTML
  let html = '';
  bookList.forEach(book => {
    html += '<tr>';
    html += `<td>${book.title}</td>`;
    html += `<td>${book.genre}</td>`;
    html += `<td>${book.age}</td>`;
    html += `<td>${book.pages}</td>`;
    html += `<td>${book.yearPublished > 0 ? book.yearPublished : 'N/A'}</td>`;
    html += '</tr>';
  });

  // Inject the HTML
  tbody.innerHTML = html;
}
```

As you can see, this is pretty straightforward. If we're only looking for published books, we do a quick `Array.filter`, which we covered waaaay back in [JS Quick Hits 2](https://closebrace.com/tutorials/2018-02-07/js-quick-hits-2-array-filter). Then we use a bunch of template literals, which we covered in [JS Quick Hits 7](https://closebrace.com/tutorials/2018-03-07/js-quick-hits-7-template-literals), including one with a ternary operator, which we covered in [JS Quick Hits 9](https://closebrace.com/tutorials/2018-03-21/js-quick-hits-9-ternary-operators), to generate the HTML we want to put in the table. Then we &hellip; put it in the table. Fancy!

If you save all of this and refresh your page, it should all work. You get an ugly but serviceable table full of books, which you can then filter using the selectbox.

So, there you go! A whole buncha stuff we've talked about in the past, used to do something useful. Well, "useful" &hellip; this isn't exactly the killer app that's going to land you ten million in VC funds. But it's a good way to show how this stuff works together practically to take a simple table, fill it with data, and manipulate it.

See you next week!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
