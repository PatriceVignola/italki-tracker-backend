/**
 * @prettier
 * @flow
 */

import PageInfo from './pageInfoSchema';
import StudentEdge from './studentEdgeSchema';

const StudentConnection = `
  type StudentConnection {
    pageInfo: PageInfo!
    edges: [StudentEdge]
  }
`;

export default () => [StudentConnection, PageInfo, StudentEdge];
