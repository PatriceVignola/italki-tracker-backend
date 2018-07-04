/**
 * @prettier
 * @flow
 */

import Student from './studentSchema';

const StudentEdge = `
  type StudentEdge {
    node: Student
    cursor: String!
  }
`;

export default () => [StudentEdge, Student];
