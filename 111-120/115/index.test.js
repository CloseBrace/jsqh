const filterUsers = require('./index.js');

const users = [
  { name: 'Bort Thompson', age: 25, email: 'bort@thompsonfamily.org' },
  { name: 'Sarah Ungleford', age: null, email: null },
  { name: null, age: 46, email: 'test@testing.com' },
  { name: 'Theresa Scott', age: null, email: '' },
];

test('giving no filter returns all the data', () => {
  expect(filterUsers(users, '')).toHaveLength(4);
});


test('name filter returns all users who have a name', () => {
  expect(filterUsers(users, 'name')).toHaveLength(3);
});

test('age filter retuns all users who have an age', () => {
  expect(filterUsers(users, 'age')).toHaveLength(2);
});

test('email filter returns all users who have an email', () => {
  expect(filterUsers(users, 'email')).toHaveLength(2);
});
