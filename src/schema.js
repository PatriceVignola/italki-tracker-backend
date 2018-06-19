/**
 * @prettier
 * @flow
 */

import {makeExecutableSchema} from 'graphql-tools';

import userResolver from './resolvers/userResolver';
import queryResolver from './resolvers/queryResolver';
import mutationResolver from './resolvers/mutationResolver';
import studentResolver from './resolvers/studentResolver';
import italkiLanguageLevelResolver from './resolvers/italkiLanguageLevelResolver';
import italkiProfileResolver from './resolvers/italkiProfileResolver';
import Query from './schemas/querySchema';
import Mutation from './schemas/mutationSchema';

const typeDefs = [Query, Mutation];
const resolvers = [
  queryResolver,
  userResolver,
  mutationResolver,
  studentResolver,
  italkiLanguageLevelResolver,
  italkiProfileResolver,
];

const schema = makeExecutableSchema({typeDefs, resolvers});

export default schema;
