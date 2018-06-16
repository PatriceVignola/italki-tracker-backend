/**
 * @prettier
 * @flow
 */

import cors from 'cors';
import express from 'express';
import expressGraphql from 'express-graphql';
import mongoose from 'mongoose';

import schema from './schema';

const app = express();

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on('error', error => {
  console.error(error);
});

db.once('open', () => {
  console.log('Connected to mongoose');
});

app.use(
  '/graphql',
  cors(),
  expressGraphql({
    schema,
    graphiql: true,
  }),
);

const port = process.env.NODE_ENV === 'development' ? 4000 : 80;
app.listen(port);

console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
