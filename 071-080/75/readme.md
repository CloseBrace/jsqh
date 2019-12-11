**JS Quick Hit: MongoDB and Mongoose - Part 2 - Data Models**

Video URL: https://youtu.be/AeH83t09v-M

Before we get into the meat of today's lesson, let's talk terminology for a second. For the purpose of this and the following tutorials MongoDB is our _database server_, not our database. Within MongoDB, you will find one or more databases. For example, I might have a `closebrace` database that contains all of the data that closebrace.com uses (tutorials, users, etc). On the same MongoDB server, I might also have other databases in which I keep data unrelated to CloseBrace, such as the data for my current freelance clients' applications. Additionally, MongoDB typically generates the `admin` and `test` databases by default when you install it. We're going to ignore those for now, though I'm happy to cover MongoDB administration/authentication if people want it.

Anyway, inside a given database such as `closebrace` you will find "collections" of data, which are roughly analagous to tables in SQL. A lot of people use these collections to form pseudo-relational structures. For example, you might have a `users` collection which contains your user objects, and those user objects might refer to ID numbers from a `books` collection, indicating what books those users own. You don't _have_ to use MongoDB like this, as its document-driven nature allows for nesting objects, just like JavaScript, but we're going to use it in this manner because it's convenient.

So &hellip; Database Server holds multiple databases, each of which contain one or more collections of objects. Cool? We're going to create a `jsqh` database and in it, a `users` collection. An important thing to understand about how MongoDB works is that, unlike SQL databases, it's unstructured. This is oversimplifying things somewhat, but you can essentially feed it any valid JSON, and it'll store the data. So, here are two possible user objects:

```
{
  age: 55,
  email: 'johnw@iluvdogs.com',
  name: 'John Wick',
  username: 'MustangGuy',
}
```

and

```
{
  age: 'fifty-five',
  email: {
    work: 'johnw@thecontinentalhotel.biz',
    personal: 'johnw@iluvdogs.com',
  }
  firstName: 'John',
  lastName: 'Wick',
}
```

If we tell MongoDB to add each of those objects to our `user` collection, its response will be, "OK!" That's sometimes very useful, but it can also easily lead to Castatrophic Atrocious Data Spaghetti Syndrome (or CADSS, and acronym I definitely did not just make up). This is one of several reasons why data modeling is a really good idea. With Mongoose, we can control our data, normalizing what we put into our database, and throwing errors if our application tries to stray from those bounds. This helps keep our data clean _and_ helps protect against any hoodlums trying to do nefarious things to our database.

So, we've got a node application up and running, and we added Mongoose to our node modules. Let's wire it up. `cd` to wherever you're keeping your app, which if you followed the instructions last week will be in a `mongo-test` directory. Start it up with `nodemon npm start` and then flip over to your text editor of choice. Add that directory to your project, and open up `app.js`. You'll see here a bunch of the initial Express scaffolding stuff, which we've described before. Up at the top is a list of required modules. This list is not alphabetized, which fills me with rage, so I like to alphabetize it. Then I add the following line in an appropriately alphabetical spot:

```
var mongoose = require('mongoose');
```

Then I drop down a few lines and below this one:

```
var app = express();
```

I add the following two:

```
mongoose.connect('mongodb://localhost/jsqh', {useNewUrlParser: true});
var db = mongoose.connection;
```

That all looks pretty great. We've connected and assigned a variable to our connection that we can pass around our app and re-use. Now let's add a couple of functions that Mongoose recommends for testing and error-catching. Add a padding line if you so choose, and then this code:

```
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDB Connection Established.')
});
```

If you check your terminal, you'll see that Nodemon has restarted your server, and we're getting a successful connection message. If you're getting a connection error instead, first off, make sure your MongoDB server is running. If it is running, then &hellip; well, we can't turn this into a tech support article, so let's just hope it's running!

The next thing we need to talk about is creating a schema. Schemas tell Mongoose what properties a data object will have, and the variable type or types those properties should contain. They're not quite "models", which are a separate thing in Mongoose that use schemas in their construction, but they're close enough for now. We're going to keep things very simple for now. First, open up `/routes/users.js`. After the two `require` lines, add this one:

```
var mongoose = require('mongoose');
```

Below those require lines but above everything else, add this code:

```
var Schema = mongoose.Schema;
var userSchema = new Schema({
  age: Number,
  email: String,
  name: String,
  userName: String,
});
```

There we go. We're now telling Mongoose that the incoming data for creating a user, for the purposes of this tutorial, will include four variables, one of which is a number and the other three of which are strings. This means if we pass data that doesn't fit this model, Mongoose won't allow it to be added to the database &hellip; although it may still create the entry with whatever data _does_ fit the Schema.

Note that we're not passing an ID here. MongoDB will create a unique one of those for us, which is all kinds of handy.

All right, I know everyone's excited to actually create some data, but unfortunately this tutorial's getting too long. Next week we'll create a quick form, wire it up, and show you how to check your DB to see whether it's working. See you then!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
