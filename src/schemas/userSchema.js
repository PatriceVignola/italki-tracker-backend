/**
 * @prettier
 * @flow
 */

import type {User as ItalkiProfileGraphql} from 'italki-api';

import ItalkiProfile from './italkiProfileSchema';
import Student from './studentSchema';
import Document from './documentSchema';
import Int52 from './int52Schema';
import type {StudentGraphql} from './studentSchema';
import type {DocumentGraphql} from './documentSchema';

type UserGraphql = {
  id: string,
  jwt: string,
  italkiProfile: ItalkiProfileGraphql,
  student: StudentGraphql,
  students: StudentGraphql[],
  documents: DocumentGraphql[],
};

const User = `
  type SkypeLogin {
    skypeToken: String
    skypeTokenExpiration: Int52
    registrationToken: String
    registrationTokenExpiration: Int52
  }

  type User implements Node {
    id: ID!
    jwt: String
    email: String!
    skypeLogin: SkypeLogin
    students: [Student]
    documents: [Document]
  }
`;

// Always export dependencies to make sure that all schemas are self-containing
export default () => [User, ItalkiProfile, Student, Document, Int52];
export type {UserGraphql};
