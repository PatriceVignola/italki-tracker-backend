/**
 * @prettier
 * @flow
 */

import {makeExecutableSchema} from 'graphql-tools';

import queryResolver from './resolvers/queryResolver';
import mutationResolver from './resolvers/mutationResolver';
import userResolver from './resolvers/userResolver';
import userLanguageLevelResolver from './resolvers/userLanguageLevelResolver';
import Query from './schemas/querySchema';
import Mutation from './schemas/mutationSchema';

const typeDefs = [Query, Mutation];
const resolvers = [
  queryResolver,
  mutationResolver,
  userResolver,
  userLanguageLevelResolver,
];

const schema = makeExecutableSchema({typeDefs, resolvers});

export default schema;
