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
