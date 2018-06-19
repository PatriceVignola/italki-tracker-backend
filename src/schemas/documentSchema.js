/**
 * @prettier
 * @flow
 */

import Student from './studentSchema';
import type {StudentGraphql} from './studentSchema';

type DocumentGraphql = {
  id: string,
  checksum: string,
  fileName: string,
  students: StudentGraphql[],
};

const Document = `
  type Document implements Node {
    id: ID!,
    checksum: String!,
    fileName: String!,
    students: [Student],
  }
`;

// Always export dependencies to make sure that all schemas are self-containing
export default () => [Document, Student];
export type {DocumentGraphql};
