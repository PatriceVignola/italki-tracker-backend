/**
 * @prettier
 * @flow
 */

import SkypeProfile from './skypeProfileSchema';
import User from './userSchema';
import Student from './studentSchema';
import Document from './documentSchema';

const Mutation = `
  input AddStudentData {
    italkiId: Int!
    skypeUsername: String
    weChatUsername: String
    email: String
  }

  input SignupData {
    email: String!
    password: String!
    skypeUsername: String
    skypePassword: String
  }

  type Mutation {
    login(
      email: String!
      password: String!
    ): User

    signup(data: SignupData!): User

    loginToSkype(
      username: String
      password: String
    ): User

    addStudent(data: AddStudentData!): Student

    sendDocument(
      studentId: ID!
      checksum: String
      fileName: String
    ): Document
  }
`;

// Always export dependencies to make sure that all schemas are self-containing
export default () => [Mutation, SkypeProfile, User, Student, Document];
