/**
 * @prettier
 * @flow
 */

import UserLanguage from './userLanguageSchema';

const User = `
  enum Gender {
    Unspecified, Female, Male
  }
  
  type User {
    id: ID!,
    locale: String,
    localTime: String,
    avatarUrl: String,
    premium: Boolean,
    shortIntroduction: String,
    interest: String,
    allowContent: Boolean,
    livingCountryCode: String,
    originCountryCode: String,
    livingCityCode: String,
    originCityCode: String,
    originCityName: String,
    livingCityName: String,
    timezone: String,
    timezoneUtc: String,
    timezoneLocation: String,
    timezoneIana: String,
    languages(level: UserLanguageLevel): [UserLanguage],
    lastLoginTime: String,
    firstPurchaseTime: String,
    registerTime: String,
    twitterUrl: String,
    facebookUrl: String,
    linkedinUrl: String,
    activityPoints: Int,
    allowMessage: Boolean,
    notebookCount: Int,
    friendCount: Int,
    discussionCount: Int,
    hasSkype: Boolean,
    online: Boolean,
    nickname: String,
    isTutor: Boolean,
    questionCount: Int,
    gender: Gender,
    sessionCount: Int,
    professional: Boolean,
    friendListPublic: Boolean
  }
`;

// Always export dependencies to make sure that all schemas are self-containing
export default () => [User, UserLanguage];
