/**
 * @prettier
 * @flow
 */

const PageInfo = `
  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }
 `;

export default () => [PageInfo];
