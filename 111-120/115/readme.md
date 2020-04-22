**JS Quick Hit: JavaScript Testing Part 2**

Video URL: https://youtu.be/RqMI2n6dBfA

Last week we talked about testing JavaScript with Jest. We made an extremely simple function, and an extremely simple test. That test failed, so we modified our function to make the test pass. If you followed along, congratulations, you've begun your journey into two things: unit tests and test-driven development.

When we test a particular function or contained piece of software behavior, that is to say, a "unit" of our overall program, we're engaged in unit testing. There are other typse of testing, for example snapshot testing, integration testing, and more. We can and probably will cover those in future tutorials, but for now let's just stick with the basics: testing individual units, usually functions, to make sure they behave consistently.

If you haven't done last week's tutorial, now's a good time to [jump back and look at it](https://closebrace.com/tutorials/2020-04-15/js-quick-hits-114-javascript-testing-part-1), because this one builds directly off of the code we've already put together. By the way, I _strongly_ recommend watching the video this week, as I actually have a bug in my code there that wasn't in last week's newsletter, and unit testing catches it for us!

As a quick reminder, though, here's our function:

```
const filterUsers = (users, filter) => {
  return users;
}
```

And here's our test:

```
const users = [
  { name: 'Bort Thompson', age: 25, email: 'bort@thompsonfamily.org' },
  { name: 'Sarah Ungleford', age: null, email: null },
  { name: null, age: 46, email: 'test@testing.com' },
  { name: 'Theresa Scott', age: null, email: '' },
];

test('giving no filter returns all the data', () => {
  expect(filterUsers(users, '')).toHaveLength(4);
});
```

You should have a simple function in `index.js` and then some data and a simple test in `index.test.js`. We're going to start by writing some new tests in `index.test.js`. Like the first one, originally, these are gonna fail and fail hard. Ready? Here they are!

```
test('name filter returns all users who have a name', () => {
  expect(filterUsers(users, 'name')).toHaveLength(3);
});

test('age filter retuns all users who have an age', () => {
  expect(filterUsers(users, 'age')).toHaveLength(2);
});

test('email filter returns all users who have an email', () => {
  expect(filterUsers(users, 'email')).toHaveLength(2);
});
```

If you run those tests, they're going to fail, because we're currently always returning the full `users` array, which has a length of `4`. We're not effectively filtering our users, even when we're sending a filter value as the second parameter, because our function isn't using it. Let's fix that. Head over to `index.js` and adjust the function there to look like this:

```
const filterUsers = (users, filter) => {
  const filteredUsers = users.filter(user => {
    switch (filter) {
      case 'name':
        return user.name;
      case 'age':
        return user.age;
      case 'email':
        return user.email;
      default:
        return true;
    }
  });
  return filteredUsers;
}
```

Save that and re-run your tests, and you'll see that all four of them are now working. This is because we're now actually filtering our Array, using Array.filter, which we covered way back in [JS Quick Hits 2](https://closebrace.com/tutorials/2018-02-07/js-quick-hits-2-array-filter). It's important to note that this is working even on values that are empty strings, correctly interpreting that even though the value's not `null` or `undefined`, it still needs filtering. This is because an empty string is considered "falsy" in JavaScript, meaning that if you're doing an evaluation like `if` or `switch`, JavaScript will consider it false. So, for example, when using `email` as a filter, it's noting that Sarah Ungleford has a `null` email address, and Theresa Scott has an empty string as an email address, and is correctly removing both from the array, leaving us with a returned value that has a length of `2`, as our test expects.

This is test-driven development in a nutshell. You build ever more complex sets of tests, which will start as failing, and then you modify your functionality until they pass. We could make this process even more robust by creating more user data, possibly randomized (or, even better, direct from your actual DB full of users) and making our tests more specific. The benefit here is that you can be sure, as you build out your application, that each of the core pieces of functionality are behaving in an expected manner. You'll feel more confident throwing ten thousand users at `filterUsers` in production, especially if that function's gotten bigger and more complex, if you've _already done so_ in a testing environment and seen that the tests all pass.

I'm not expecting your to convert to TDD today. Honestly, most of the clients I work with still aren't using it &ndash; even the ones who write unit tests frequently write them _after_ the code, to confirm it works, rather than writing the tests first. That's still better than not testing at all. Like &hellip; a _lot_ better! But true test-driven development, and the rigorous approach it requires, can really help bulletproof your code. By testing early, testing often, and testing _first_, you can proceed with confidence even as your application scales.

See you next week!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
