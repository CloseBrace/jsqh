**JS Quick Hit: An Intro to GraphQL**

Video URL: https://youtu.be/V6SIgSfmhP4

We're going to take a look at Facebook's GraphQL language over the course of the next few weeks. It's a popular topic at the moment, and a lot of people are really interested in figuring out what it's all about. The good news is: it's very easy to get started with. So let's get rolling.

The first thing we're going to talk about is REST. Does that seem counterintuitive? Well, there's a good reason for it. GraphQL is basically an answer to some of the problems that come up when working with RESTful systems. If you've done any web work at all, you've probably worked with these systems in order to interface with the database. You may have heard the term CRUD, which stands for Create, Read, Update, Delete. In a RESTful system using HTTP methods, you Create with `POST`, you Read with `GET`, you Update with `PUT` and you Delete with `Delete`. You've probably seen code like this:

```
fetch('https://mysite.com/myapi/movies/2018')
  .then(resp => JSON.parse(resp))
  .then((data) => {
    const newData = data.map(item => {
      const { id, title, worldwideGross } = item;
      return {
        id,
        title,
        worldwideGross,
      };
    });
    return newData.length > 0 ? newData : null;
  });
```

That code is using an HTTP GET to access an API. The API then accesses a database, gets some data from it (presumably a list of 2018 movies, returned as objects in an array), and sends it back as JSON. Fetch then takes that data, parses the JSON, does a little bit of work on it, and then returns the result. Pretty straightforward!

The thing with a REST API endpoint like this, though, is that you can't really control what data it sends back. You're going to get that whole list of movies, with all the data populated in each movie object. Let's assume the movie objects look something like this pseudo-code:

```
{
  id: '1234567890',
  title: 'Movie Title',
  releaseDate: '23 May 2018',
  actors: [Array of Actor Objects],
  director: { Director Object },
  studio: 'Moneybags Inc.',
  producers: [Array of Producer Objects],
  budget: 125000000,
  usGross: 76848396
  worldwideGross: 1458027383
}
```

There would probably be even more info, but that's a good starting point. That's a ton of information, including various sub-arrays and objects. But as you can see from the `fetch` code above, all we actually want is an array of objects each containing just the movie's ID, title, and worldwide gross. So, what do we do? Well, you have two options:

1. Get all the data and then massage it yourself to retain what you want
2. Build an entirely separate REST API endpoint that only returns the data you want

Option two is rarely worth doing, so most of the time you're going with option one (just as we did in the code above). This is fine. Hang on, I want to repeat that _loudly_ and _clearly_: **THIS IS FINE!**. There's nothing wrong with REST. It's been happily powering awesome websites and applications for decades. It will continue to be a good, useful solution for a long, long time to come. It's OK to like REST. I like REST. I do not always use GraphQL, not even with React applications. Big chunks of CloseBrace use REST and (at the moment) none of it uses GraphQL.

So, if REST is great and all, why did Facebook even invent GraphQL? Well, because Facebook operates at a scale where every drop of extraneous data becomes an absolute ocean. The REST API we described above? That's fine if you've got a thousand users a day querying it. It's even fine if you have a hundred thousand, or maybe even a million, depending on how beefy your server setup is. Now let's say you've got a _billion_ people hitting just that one endpoint, every single day of the year. That means even if your servers can keep up, you're transmitting a ridiculous amount of excess data. Bandwidth costs money. Why send stuff that you're just going to get rid of with `array.map`? Wouldn't it be nice if you could just say "hey, I only want this data" and get it back?

That's what GraphQL allows you to do, and it's why so many people are excited about it. GraphQL is not a coding language, or a JavaScript framework. It's a language that allows you to describe the data you want to receive from or send to your database. There are some dynamic aspects to it, and we'll get to those. It also has robust type checking, and we'll get to that too. But for today, just think of it as a way to outline "this is what I want" for your database.

With GraphQL, you don't build endpoints, you build queries (which are the "read" part of CRUD) and mutations (which handle the "create, update, and delete" parts of CRUD). These queries tell your back-end what data to return, or change-and-then-return, or just change. Here's an example GraphQL query that would get just what we want from that movies database:

```
{
  movie {
    id
    title
    worldwideGross
  }
}
```

Your server, which would be built to understand GraphQL queries, would return an array of movie object containing only those three pieces of information. This would result in a smaller dataset, which would be faster and less expensive to transfer and potentially faster to manipulate on the front-end. Everyone wins! Except people who don't like learning new tech because, trust me, one look at the [State of JS survey results for data layers](https://2018.stateofjs.com/data-layer/overview/) will tell you that GraphQL is huge and only going to get huge&hellip;er.

(By the way, don't be fooled by that page - Redux and GraphQL do not necessarily compete with each other. You could very easily use both in a React application)

So, that's the intro to GraphQL! Next week, we're going to talk about putting together a simple GraphQL server in Express and querying it. The week after that is a holiday break week with no newsletter, and the week after *that*, we'll dive back in by talking mutations and some other cool topics.

See you then!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*