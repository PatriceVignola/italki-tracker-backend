/**
 * @prettier
 * @flow
 */

import SkypeProfile from './skypeProfileSchema';
import User from './userSchema';
import StudentEdge from './studentEdgeSchema';
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

  input DeleteStudentData {
    id: ID!
  }

  input SendDocumentData {
    studentId: ID!
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

  type AddStudentResult {
    newStudentEdge: StudentEdge!
  }

  type DeleteStudentResult {
    deletedStudentId: String
  }

  type SendDocumentResult {
    document: Document!
  }

  type Mutation {
    signin(data: SigninData!): User
    signup(data: SignupData!): User
    linkSkypeAccount(data: LinkSkypeAccountData!): SkypeTokens
    signinToSkype(data: SigninToSkypeData!): SkypeTokens
    addStudent(data: AddStudentData!): AddStudentResult!
    deleteStudent(data: DeleteStudentData): DeleteStudentResult!
    sendDocument(data: SendDocumentData!): SendDocumentResult!
  }
`;

// Always export dependencies to make sure that all schemas are self-containing
export default () => [Mutation, SkypeProfile, User, StudentEdge, Document];
