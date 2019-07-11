**JS Quick Hit: MongoDB and Mongoose - Part 1 - Setup**

Video URL: https://youtu.be/Cp9t9UQHy5A

It's been a while since we've done a multi-part tutorial. Now that we've all had a bit of a breather, I thought it might be interesting to dive into data modeling and database manipulation with Mongoose. This is going to, eventually, lead into another multi-parter where we talk about user authentication, but there's not much point in talking about that until we can store users! So, over the next few weeks, we're going to build a simple web app that allows us to do exactly that.

We're going to start simply this week by talking about installing MongoDB. If you're not familiar with MongoDB, well, it's a document-driven database that works a bit differently from relational databases like MySQL or PostGreSQL. This approach has its pros and cons, but for JavaScript developers, MongoDB can be a pretty great platform because its BSON data structure looks and behaves almost exactly like JSON, and even the database commands themselves look like JavaScript. It makes picking up and working with the tool very easy, which is good, since this series isn't titled "JS Extremely Long and Tedious Hits".

We're not going to cover installing Node.js here. There are too many different ways that people like to do it, depending on their OS and approach to development. I'll just say that there's a direct install path available by going to https://nodejs.org, but there are also ways to do it through the various package managers of your choice. And, in fact, there are even version managers that allow you to switch between versions. I recommend just running the latest Long Term Stable (LTS) version, which as of this tutorial is `10.16.0`.

We're also not going to cover installing MongoDB. There are several reasons why, but two of the best of them are "because it's already well-explained on the MongoDB site" and "because I don't know what OS you're using". If you're a Mac user, [follow these instructions](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/). If you're a Windows user, [follow these instructions](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/). In both cases, it's up to you whether you want to set Mongo up as a service, or manually run it each time you work on your project. We could also talk about using Docker, and perhaps we will someday, but not in this tutorial.

Once you have MongoDB installed and running, you're going to need a basic Express skeleton. We've covered this multiple times before in this series, so we're not going to re-tread that ground, but anyone who's new to the experience should head for [JS Quick Hits 52 ](https://closebrace.com/tutorials/2019-01-23/js-quick-hits-52-intro-to-express) and follow along for a couple of tutorials until you have a basic Express instance scaffolded out. However, once you get to this line:

```
express --view=ejs -c sass --git express-test
```

Change it to this instead:

```
express --view=ejs -c sass --git mongo-test
```

By the way, I strongly recommend continuing with that entire Express tutorial before diving into this one, if you're not familiar with Express yet!

If you _are_ familiar with Express, then you'll know we can't work with MongoDB without installing some modules. Specifically you're going to want to `cd` to the directory into which you just installed your Express files and run the following command in your terminal or command prompt:

```
npm install mongoose@5.5.11
```

We don't need to install the MongoDB package itself because Mongoose installs it as a dependency (you can verify this by looking into the newly-created `node_modules` folder, which now has a bunch of stuff Mongoose requires in it). We're not quite done, as we need to install the stuff that Express requires to run, so just type:

```
npm install
```

Once you're done with that, start your server, either with `npm start` or, better, `nodemon npm start` (we've talked about Nodemon several times in the past, but [here's more info on how to install and use it](https://nodemon.io/)). Assuming your server doesn't throw any errors, you can navigate to `localhost:3000` in your browser to see the basic Welcome to Express page. That's a good place for this tutorial to stop. Not very exciting, I know, but we'll get into the good stuff next week.

See you then!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
