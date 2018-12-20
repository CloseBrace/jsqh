const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    getWelcome: String
  }
`);

// Each method in root is a "resolver" - aka, an API endpoint
const root = {
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
