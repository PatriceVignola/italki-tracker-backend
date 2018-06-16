/**
 * @prettier
 * @flow
 */

import SkypeUserProfile from './skypeUserProfileSchema';

const Mutation = `
  type Mutation {
    loginToSkype(
      username: String,
      password: String
    ): SkypeUserProfile
  }
`;

// Always export dependencies to make sure that all schemas can compile
export default () => [Mutation, SkypeUserProfile];
