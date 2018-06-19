/**
 * @prettier
 * @flow
 */

import Gender from './genderSchema';

const SkypeProfile = `
  type SkypeProfile {
    username: ID!,
    avatarUrl: String,
    birthday: String,
    city: String,
    countryCode: String,
    emails: [String],
    firstName: String,
    gender: Gender,
    homePage: String,
    jobTitle: String,
    languageCode: String,
    lastName: String,
    namespace: String,
    phoneHome: String,
    phoneMobile: String,
    phoneOffice: String,
    province: String,
    richMood: String
  }
`;

// Always export dependencies to make sure that all schemas are self-containing
export default () => [SkypeProfile, Gender];
