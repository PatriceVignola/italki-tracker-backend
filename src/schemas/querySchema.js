/**
 * @prettier
 * @flow
 */

import User from './userSchema';

const Query = `
  type Query {
    user: User
    italkiProfile(id: ID!): ItalkiProfile
    node(id: ID!): Node
  }

  interface Node {
    id: ID!
  }
`;

// Always export dependencies to make sure that all schemas are self-containing
export default () => [Query, User];
