**JS Quick Hit: JavaScript Testing Part 1**

Video URL: https://youtu.be/PjEjrf5ciyw

JavaScript testing is a young field that's still growing, but there are a lot of really solid tools out there that you can use right now to help improve your code. Intimidated by testing or worried that it's going to add a bunch of work to your day? No worries! We're going to start simple, and I think you'll see how testing can _reduce_ the amount of time and work it takes to get things up and running, rather than add to it.

Today we're going to be going over the basics of "test-driven development" which is a development approach in which you write failing tests first, then write the code that will make them pass. This is a really interesting approach and it takes a bit to wrap your head around it, but it's valuable in part because tests are written in plain English (or your spoken/written language of choice &hellip; _c'est possible d'utiliser francais, par exemple_), which usually makes it easier to articulate what your code is supposed to do than the actual programming language would. Have you ever written "pseudo-code"? Basically, a bunch of comments explaining the code you're about to write, to help you think it through? Tests are like that, except they actually, well, test the code once it's written!

So, for starters, we need a testing environment. I'm going to use Jest, which is popular in the React world and beyond, but you could use Mocha or Jasmine or several others - each has its pros and cons, and each has its own syntax (though they're all pretty similar). I like Jest because it's simple to set up and use, and the assertion syntax is easy to write. More on that latter in a bit, but first let's do that whole setting up thing. I'm going to assume for this tutorial that you're familiar enough with the Node.js environment for me to not need to explain it too much. If you're not, or you'd like a refresher, check out [JS Quick Hits 31](https://closebrace.com/tutorials/2018-08-22/js-quick-hits-31-node-module-1-node-basics), [JS Quick Hits 32](https://closebrace.com/tutorials/2018-08-29/js-quick-hits-32-node-module-2-building-the-module), and [JS Quick Hits 33](https://closebrace.com/tutorials/2018-09-05/js-quick-hits-33-node-module-3-package-the-module) which should give you more than enough info to proceed.

Right, so, with Node installed and ready to go, head for a terminal window or command prompt, create a new folder in which to store this project, cd into that folder, and type the following:

```
npm init
```

It'll lead you through a series of prompts. Doesn't really matter what you answer for these, since we're not going to be publishing anything. The only two that matter are `index.js` as the entry point (which is the default), and when it asks for the command to run tests. Just put `jest` there. When it's done, it'll create a file called `package.json` that contains all of the info you just provided. You can ignore it for the purposes of this lesson. Just type:

```
npm install jest
```

Let that do its thing, and we're done. Either run `touch index.js` or switch over to your text editor of choice and create `index.js` there. Either way, we need to be editing that file, and another one: `index.test.js`. First, in `index.js`, add this code:

```
const filterUsers = (users, filter) => {
  return true;
}

module.exports = filterUsers;
```

That's obviously not going to do much for us right now, but that's fine. We'll write some failing tests, then write code that makes them pass in `index.js`.

So, to write tests, first we're going to need some data. In `index.test.js`, add this code:

```
const filterUsers = require('./index.js');

const users = [
  { name: 'Bort Thompson', age: 25, email: 'bort@thompsonfamily.org' },
  { name: 'Sarah Ungleford', age: null, email: null },
  { name: null, age: 46, email: 'test@testing.com' },
  { name: 'Theresa Scott', age: null, email: '' },
];
```

Note that we're importing our `filterUsers` function via `require` so that we can run our tests against it. Then we've got a bunch of user data, most of it not terribly robust, but it'll work for this example!

Next up, let's write a failing test:

```
test('giving no filter returns all the data', () => {
  expect(filterUsers(users, '')).toHaveLength(4);
});
```

Do you see how this works? We run a top-level test function, which takes two arguments, a description, and the actual test to run (an inline anonymous function). We then build an _assertion_. Specifically, we are asserting that running `filterUsers` on the users array with a blank string for the `filter` parameter should return the entire user array, which is four users long, so it'll have a length of four. You can get as picky as you want with your assertions. Not convinced that checking for length is enough? That's cool. Add more `expect` lines! Jest supports a _ton_ of assertions, like `stringContaining` or `toBeFalsy`. You can see a whole list at [jest.io/docs](https://jest.io/docs).

Let's run our test. Switch back to the terminal and type:

```
npm test
```

[Sad Trombone](https://sadtrombone.com/)! We get a big bunch of output showing how our test has failed, but these lines are probably the most important:

```
Matcher error: received value must have a length property whose value must be a number
    Received has type:  boolean
    Received has value: true
```

We're expecting something that has a `length` property but our function's only returning `true`. Let's fix that. Now, I'm betting you already have in mind how to build a function that works for a whole bunch of test scenarios, but for this week, we're just going to make our very first test work. Then, next week, we'll do a bunch more testing and refactoring. SO &hellip; switch back to `index.js` and change our function to look like this:

```
const filterUsers = (users, filter) => {
  return users;
}
```

Save that and re-run `npm test` in the terminal and hooray! We get a passing test. I bet you can see the problem, though. This is always going to return all of the users, no matter what we pass to the filter value!

Next week, we're going to fix that, and make our function _and_ our testing a lot more robust. See you then!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
