/**
 * @prettier
 * @flow
 */

import ItalkiLanguage from './italkiLanguageSchema';
import Gender from './genderSchema';

const ItalkiProfile = `
  type ItalkiProfile implements Node {
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
    languages(
      level: ItalkiLanguageLevel,
      learning: Boolean,
      teaching: Boolean
    ): [ItalkiLanguage],
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
export default () => [ItalkiProfile, ItalkiLanguage, Gender];
