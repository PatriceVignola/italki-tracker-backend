/**
 * @prettier
 * @flow
 */

const Gender = `
  enum Gender {
    Unspecified, Female, Male
  }
`;

// Always export dependencies to make sure that all schemas are self-containing
export default () => [Gender];
