**JS Quick Hit: Querying GraphQL**

Video URL: https://youtu.be/5yceNkYSRSE

Last week we went over the basics of how GraphQL works. This week we're going to spin up a very simple Node.js-based server that will allow us to query a GraphQL endpoint and get some data back. We're going to do this using Express, a Node.js-based web-server which I cover much more extensively in *[Five Minute React](https://fiveminutereact.com)*. For the purposes of this tutorial, we're not going to talk much about how Express works. We're just going to get it up and running, and focus on the GraphQL stuff. We're also not going to be working with a database. Instead we're going to simulate a DB with JavaScript. It'll be fine, trust me!

You'll need Node.js installed. If you don't already have it, you can find complete instructions in [Tutorial 31](https://closebrace.com/tutorials/2018-08-22/js-quick-hits-31-node-module-1-node-basics). As always, I recommend the latest long-term stable (LTS) version. As of this writing, that's `v10.14.2`. If you want to go bleeding edge, I won't stop you, but generally that's only necessary for people who're really pushing Node's boundaries. This tutorial, uh &hellip; won't.

So, very quickly, create a new directory named, I dunno, `graphqltest` and in it, place the following package.json file:

```
{
  "name": "graphql-test",
  "version": "0.1.0",
  "description": "a simple graphql server",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "CloseBrace User",
  "license": "UNLICENSED"
}
```

Then run the following command in your terminal or command prompt:

```
npm install --save express graphql express-graphql
```

I also recommend installing Nodemon globally if you don't already have it, like this:

```
npm install -g nodemon
```

All right, we have everything we need to build this thing. What we're going to do in this particular tutorial is extremely simple. We'll follow it up in a couple of weeks (reminder: no newsletter next week due to the holidays) by getting more in-depth. For today, we're just going to make a simple graphQL query and return something when we do it.

So, for starters, we need to import those modules we installed. Create a file called `index.js` and at the top, add this code:

```
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
```

As you can see, we're grabbing the Express module which we'll use to instantiate our server, the express-graphql module which we'll use to handle our GraphQL endpoints, and the `buildSchema` method from the graphql module, which we'll use to &hellip; wait for it &hellip; build the schema for our GraphQL model. Unfamiliar with schemas? No worries! Real quick, a schema describes the layout of your data, frequently including types. So you might say something like:

```
{
    username: String,
    age: Int,
}
```

And when you make a GraphQL query, the system will make sure that any data passed in or out matches the expected schema. If you tried to pass, say, a firstName parameter, it'd be ignored, because it's not in the schema.

Speaking of schemas, that's the next thing we're going to build. So, below your imports, add this code:

```
const schema = buildSchema(`
  type Query {
    getWelcome: String
  }
`);
```

Here we're telling GraphQL that a user can query our endpoint and request the `getWelcome` resolver, and the value returned should be a string. That's the only resolver we're going to build in this tutorial. So let's build it! We're going to add it to a variable called `root` which will eventually contain all of our resolvers, each of which functions sort of like an endpoint in a traditional REST API. Here's the code:

```
const root = {
  getWelcome: () => {
    return 'Welcome to GraphQL';
  },
};
```

As you can see, the `getWelcome` resolver returns a string, which is what our Schema is expecting. Cool! Next up, we need to wire all of this together so that we can access it. That's easy to do, and as an added bonus, GraphQL comes with a handy GUI for testing queries that we can enable with a single line. Here's all the code we'll need:

```
// Instantiate Express
const app = express();

// Create an Express route for /graphql
app.use('/graphql', graphqlHTTP({
  schema: schema, // use our schema
  rootValue: root, // use our resolver(s)
  graphiql: true, // use GraphQL's built-in GUI
}));
app.listen(4000);

console.log('Running a GraphQL API server at localhost:4000/graphql');
```

This should be pretty clear, especially since I commented all the code. We get Express running, then set up a `/graphql` route and pass it our schema, our `root` variable that contains our resolver, and tell it to turn on the GUI.

We're set from a code standpoint. Save this file and head for a terminal window or command prompt. In the same directory where all of this code is living, type:

```
nodemon npm start
```

The benefit of Nodemon is that it'll automatically restart your Node app if you make any changes. We won't be doing that in this tutorial, but we _will_ be doing it next time, so it's good to have. Anyway, you should see that last line, the `console.log`, show up in your console. Time to head for `http://localhost:4000/graphql` and check out our pretty testing GUI. It should show right up, along with a bunch of comments. You can nuke those if you want, or just work underneath them. Either way, in the left panel, add this GraphQL query:

```
{
  getWelcome
}
```

And click the little arrow icon. You'll get the following response:

```
{
  "data": {
    "getWelcome": "Welcome to GraphQL"
  }
}
```

This is a standard format for GraphQL query responses. A `data` object with the name of the resolver and its returned value or values.

All right, we're serving GraphQL. In the next tutorial (which, sorry to keep beating a dead horse, is not coming until Friday, January 4th), we'll build a couple more resolvers. These ones will be a bit more complex, and will be able to both take arguments and return more complicated data. See you in the new year!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*