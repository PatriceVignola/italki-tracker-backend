/**
 * @prettier
 * @flow
 */

import SkypeProfile from './skypeProfileSchema';
import User from './userSchema';
import Student from './studentSchema';
import Document from './documentSchema';

const Mutation = `
  input SigninData {
    email: String!
    password: String!
  }

  input SignupData {
    email: String!
    password: String!
  }

  input SigninToSkypeData {
    password: String!
  }

  input AddStudentData {
    italkiId: Int!
    skypeUsername: String
    weChatUsername: String
    email: String
  }

  input SendDocumentData {
    studentId: ID!
    checksum: String!
    fileName: String!
  }

  input LinkSkypeAccountData {
    username: String!
    password: String!
  }

  type SkypeTokens {
    skypeToken: String!
    skypeTokenExpiration: Int52!
    registrationToken: String!
    registrationTokenExpiration: Int52!
  }

  type Mutation {
    signin(data: SigninData!): User
    signup(data: SignupData!): User
    linkSkypeAccount(data: LinkSkypeAccountData!): SkypeTokens
    signinToSkype(data: SigninToSkypeData!): SkypeTokens
    addStudent(data: AddStudentData!): Student
    sendDocument(data: SendDocumentData!): Document
  }
`;

// Always export dependencies to make sure that all schemas are self-containing
export default () => [Mutation, SkypeProfile, User, Student, Document];
