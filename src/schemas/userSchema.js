/**
 * @prettier
 * @flow
 */

import ItalkiProfile from './italkiProfileSchema';
import StudentConnection from './studentConnectionSchema';
import Document from './documentSchema';
import Int52 from './int52Schema';

const User = `
  type User implements Node {
    id: ID!
    jwt: String
    email: String
    skypeUsername: String
    students(first: Int!, last: Int!): StudentConnection
    documents: [Document]
  }
`;

// Always export dependencies to make sure that all schemas are self-containing
export default () => [User, ItalkiProfile, StudentConnection, Document, Int52];
