const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

// Normally we'd be getting this data from a database
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

// Construct a schema, using GraphQL schema language
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

// Each method in root is a "resolver" - aka, an API endpoint
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

// Instantiate Express
const app = express();

// Create and Express route for /graphql
app.use('/graphql', graphqlHTTP({
  schema: schema, // use our schema
  rootValue: root, // use our resolver(s)
  graphiql: true, // use GraphQL's built in GUI
}));
app.listen(4000);

console.log('Running a GraphQL API server at localhost:4000/graphql');
