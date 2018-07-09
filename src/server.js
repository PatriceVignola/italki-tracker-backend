/**
 * @prettier
 * @flow
 */

import cors from 'cors';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import jwt from 'express-jwt';
import multer from 'multer';

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
  jwt({secret: process.env.JWT_SECRET, credentialsRequired: false}),
  multer().any(),
  graphqlHTTP(async (req: any) => ({
    schema,
    graphiql: true,
    context: {
      // Header key: "Authorization"
      // Header value: "Bearer ${JWT_TOKEN}"
      jwtSecret: process.env.JWT_SECRET,
      userId: req.user ? req.user.id : null,
      skypeToken: req.get('SkypeToken'),
      registrationToken: req.get('RegistrationToken'),
      files: req.files,
    },
  })),
);

const port = process.env.NODE_ENV === 'development' ? 4000 : 80;
app.listen(port);

console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
