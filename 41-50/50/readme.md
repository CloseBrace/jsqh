**JS Quick Hit: Enhanced GraphQL Queries**

Video URL: https://youtu.be/w9D9av4QuU0

In our last tutorial, we got a GraphQL server spun up and responding to the simplest of queries. Today we're going to continue working with queries, but we're going to show how they can be more advanced, and how they can work with data on the server end.

You'll need the entire Node.js app (all one file of it) from the [previous tutorial](https://closebrace.com/tutorials/2018-12-26/js-quick-hits-49-querying-graphql) to continue, so make sure you have that set up. Once you do, open `index.js` and let's get started.

First we need to simulate some data. We don't have the time or space here to go into setting up a MongoDB or MySQL instance and then querying it with Express (want to learn how to do that? I have a free tutorial that goes through all of it, [which you can find right here](https://closebrace.com/tutorials/2017-03-02/the-dead-simple-step-by-step-guide-for-front-end-developers-to-getting-up-and-running-with-nodejs-express-and-mongodb)). Instead, let's create some fake data and pretend we got it from the DB. Ready? Below the three `require`s at the top, add this code:

```
const data = {
  users: [
    {
      age: 25,
      id: 1,
      name: 'Leslie Smith',
    },
    {
      age: 32,
      id: 2,
      name: 'Cory Jacobs',
    },
    {
      age: 54,
      id: 3,
      name: 'Sam Johnson',
    },
    {
      age: 22,
      id: 4,
      name: 'Chris Roberts',
    }
  ],
}
```

That's a simple set of users, nothing special, but we're going to be able to query it in multiple different ways with GraphQL. To do that, we're going to need to add to our schema and then establish some new resolvers. Start with the Schema, and make it look like this:

```
const schema = buildSchema(`
  type User {
    age: Int
    id: ID
    name: String
  }
  type Query {
    getUser(id: Int!): User
    getUsers(userIds: [Int]!): [User]
    getWelcome: String
  }
`);
```

Do you see what we've added? Where once there was only the `Query` definition with the `getWelcome` resolver, we've now added two new resolver definitions. `getUser` will take an integer for its `id` parameter (the exclamation point means it's required), and return a `User` object, which we've defined just above. The `getUsers` resolver will take an array of integers (again, required) and return an array of `User` objects.

You'll note there are no commas or semi-colons anywhere, here. Also, when forming GraphQL queries (which we'll be doing later), you can only use double quotes, not single. This is because Facebook decided to design the language to annoy the crap out of me, specifically.

Anyway, we have our schema, so let's add our resolvers. Change your `root` variable to look like this:

```
const root = {
  getUser: (args) => {
    const { id } = args;
    return data.users.find(user => user.id === id);
  },
  getUsers: (args) => {
    const { userIds } = args;
    const foundUsers = data.users.filter(user => {
      return userIds.some(id => id === user.id);
    });
    return foundUsers;
  },
  getWelcome: () => {
    return 'Welcome to GraphQL';
  },
};
```

As you can see, we've built two new resolvers. GraphQL sends parameters as objects, which we're calling `args` in our functions. We destructure what we need from those args, and then run some functionality to return the data that the schema tells us we should receive &mdash; specifically, a `User` object for `getUser` and an array of `User` objects for `getUsers`.

We don't need to write any more code. Since we added these resolvers as part of the `root` object, it's already being sent to Express and they should be ready to go. Save this file and fire up your node server with `nodemon npm start` if you haven't already, then head to `http://localhost:4000/graphql` to use the GUI to do some testing.

Let's start like we did last time:

```
{
  getWelcome
}
```

That still works as expected, returning a data object with the name of the resolver and the string it returns. Excellent. Now, to that, let's add `getUser`, but let's start out by causing an error (btw if you're not getting auto-complete on your new resolvers, refresh the page). Here's the code:

```
{
  getWelcome
  getUser
}
```

That's going to cause GraphQL to complain because it's expecting an id parameter, but not receiving one. So let's change that:

```
{
  getWelcome
  getUser(id:1) {
  }
}
```

Womp-womp! Still an error. Why? Because GraphQL needs to know what data with which to populate our `User` object. We're not telling it what fields we want. Remember how we talked about this being one of the best aspects of GraphQL? Well it's also a mandatory aspect of GraphQL. Let's just get the user's name, shall we? Try this:

```
{
  getWelcome
  getUser(id:1) {
    name
  }
}
```

Here's the output:

```
{
  "data": {
    "getWelcome": "Welcome to GraphQL",
    "getUser": {
      "name": "Leslie Smith"
    }
  }
}
```

there we go. Now we can see that our `User` object contains just the name "Leslie Smith". We could add `id` and `age` in there if we want, and I encourage you to experiment with doing so. Just remember: don't use any commas. In the meantime, let's roll forth with `getUsers`, like this:

```
{
  getWelcome
  getUser(id:1) {
    name
  }
  getUsers(userIds:[1,3,4]) {
    id
    name
    age
  }
}
```

and here's the output:

```
{
  "data": {
    "getWelcome": "Welcome to GraphQL",
    "getUser": {
      "name": "Leslie Smith"
    },
    "getUsers": [
      {
        "id": "1",
        "name": "Leslie Smith",
        "age": 25
      },
      {
        "id": "3",
        "name": "Sam Johnson",
        "age": 54
      },
      {
        "id": "4",
        "name": "Chris Roberts",
        "age": 22
      }
    ]
  }
}
```

Yeah, that's the good stuff. We're getting the data we want, in the order we want, without having to do a filter on the front-end once it's returned. Nice!

Next time, we're going to take a quick look at sending data via mutations. Catch you then!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*