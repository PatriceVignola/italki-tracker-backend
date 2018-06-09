/**
 * @prettier
 * @flow
 */

import cors from 'cors';
import express from 'express';
import expressGraphql from 'express-graphql';
import {buildSchema} from 'graphql';
import {fetchUser} from 'italki-api';

const schema = buildSchema(`
  type User {
    id: ID!,
  }

  type Query {
    user: User,
  }
`);

const root = {
  user: async () => {
    const user = await fetchUser(1280555);
    return {
      id: () => user.id,
    };
  },
};

const app = express();

app.use(
  '/graphql',
  cors(),
  expressGraphql({
    schema,
    rootValue: root,
    graphiql: false,
  }),
);

const port = process.env.NODE_ENV === 'development' ? 4000 : 80;
app.listen(port);

console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
