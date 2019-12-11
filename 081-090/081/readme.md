**JS Quick Hit: Working With JSON**

Video URL: https://youtu.be/PThDUVQrhgw

If you work on the web, especially with JavaScript, for any length of time over a couple of months, you're likely to run into people talking about and using JSON. If you're not familiar with the term, it stands for JavaScript Object Notation, and what it's used for is, basically, converting JavaScript data to a big string, and back, in order to pass it to and from APIs or databases, and then use the results. Let's take a look at a simple JavaScript object:

```
const movie = {
  title: 'Once Upon a Time ... in Hollywood',
  director: 'Quentin Tarantino',
  mainCast: ['Leonardo DiCaprio', 'Brad Pitt', 'Margot Robbie'],
};
```

Here's what that same object looks like when converted to JSON:

```
'{"title":"Once Upon a Time ... in Hollywood", "director":"Quentin Tarantino", "mainCast":["Leonardo DiCaprio","Brad Pitt","Margot Robbie"]}'
```

Note that everything's in quotes. Note also that the trailing comma after the array was removed. Both of these are necessary in JSON. It'd be really annoying if every time we wanted to convert our JavaScript data to JSON, we had to go through and manually make these kind of changes. If we were working with large datasets&mdash;something with hundreds, thousands, or even more records&mdash;it'd be awful. Fortunately, JavaScript provides a native `JSON` object, and its methods make working with JSON in your JavaScript a snap. For example, here's how I got that JSON output from our `movie` variable:

```
const movieJSON = JSON.stringify(movie);
console.log(movieJSON);
```

`JSON.stringify` converts ordinary JavaScript variables (objects, arrays, etc) to JSON data. We've used it before in this series, here and there, when talking to APIs. That's one half of the path to being able to go back and forth with data. The other half? `JSON.parse`. We can fake a JSON response from the server like this:

```
const nextMovieJSON = '{"title":"Fast & Furious Presents: Hobbs & Shaw","director":"David Leitch", "mainCast":["Dwayne Johnson", "Jason Statham", "Idris Elba"]}';
```

Note again that this whole thing is wrapped in single quotes, thus making it just a big string. It'd be immensely tedious to parse that by hand, using various string methods to cut it into pieces and assign them to object keys and values. `JSON.parse` does that for us, like this:

```
const nextMovieParsed = JSON.parse(nextMovieJSON);
console.log(nextMovieParsed);
```

Boom, we've got a whole JavaScript object created from that text string. This is immensely, incredibly useful for working with APIs, and if you're going to be doing that, `JSON.parse` and `JSON.stringify` will rapidly become your best friends.

One more thing about `JSON.stringify`. It takes optional `replace` and `space` parameters, the former of which allows you to alter the behavior of the whole process, and the latter of which allows you to add whitespace to the object. Basically the number you give sets the level of tab indentation, although you can also use a string and pad everything out with that string &hellip; which is weird and I don't really see why you'd want to do that, but you do you! I've literally never used the `space` parameter before writing this tutorial, but it might come in handy. Here's an example:

```
const uppercaseTitle = (key, val) => {
  if (key === 'title') {
    return val.toUpperCase();
  }
  return val;
}
console.log(JSON.stringify(movie, uppercaseTitle, 2));
```

This produces the following output:

```
{
  "title": "ONCE UPON A TIME ... IN HOLLYWOOD",
  "director": "Quentin Tarantino",
  "mainCast": [
    "Leonardo DiCaprio",
    "Brad Pitt",
    "Margot Robbie"
  ]
}
```

So &hellip; that's the JSON object. Just two methods, but if you work with data I/O in your JavaScript, you're going to want to know them.

That's it for this week. See you next time!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
