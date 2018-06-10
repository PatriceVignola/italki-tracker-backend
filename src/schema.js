/**
 * @prettier
 * @flow
 */

import {makeExecutableSchema} from 'graphql-tools';

import queryResolver from './resolvers/queryResolver';
import userResolver from './resolvers/userResolver';
import userLanguageLevelResolver from './resolvers/userLanguageLevelResolver';
import Query from './schemas/querySchema';

const typeDefs = [Query];
const resolvers = [queryResolver, userResolver, userLanguageLevelResolver];

const schema = makeExecutableSchema({typeDefs, resolvers});

export default schema;
