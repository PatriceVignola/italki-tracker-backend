/**
 * @prettier
 * @flow
 */

import User from './userSchema';

const Query = `
  type Query {
    user(id: ID!): User,
  }
`;

// Always export dependencies to make sure that all schemas can compile
export default () => [Query, User];
