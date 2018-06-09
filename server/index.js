/**
 * @prettier
 * @flow
 */

import cors from 'cors';
import express from 'express';
import expressGraphql from 'express-graphql';
import {buildSchema} from 'graphql';

const schema = buildSchema(`
  type User {
    id: ID!,
  }

  type Query {
    user: User,
  }
`);

const root = {
  user: () => ({
    id: () => 123456,
  }),
};

const app = express();

app.use(
  '/graphql',
  cors({
    origin: 'http://localhost:3000',
  }),
  expressGraphql({
    schema,
    rootValue: root,
    graphiql: false,
  }),
);

app.listen(4000);

console.log('Running a GraphQL API server at localhost:4000/graphql');
