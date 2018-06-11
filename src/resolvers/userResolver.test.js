/**
 * @prettier
 * @flow
 */

import userResolver from './userResolver';

const expectedLanguages = [
  {
    id: 2,
    hasCourse: true,
    canTeach: false,
    name: 'Spanish',
    level: 3,
    priority: 1,
    teaching: true,
    learning: false,
  },
  {
    id: 3,
    hasCourse: true,
    canTeach: false,
    name: 'Chinese (Mandarin)',
    level: 3,
    priority: 1,
    teaching: true,
    learning: false,
  },
  {
    id: 5,
    hasCourse: false,
    canTeach: true,
    name: 'German',
    level: 3,
    priority: 1,
    teaching: false,
    learning: false,
  },
];

const mockUser = {
  languages: [
    {
      id: 1,
      hasCourse: true,
      canTeach: false,
      name: 'English',
      level: 1,
      priority: 1,
      teaching: true,
      learning: false,
    },
    {
      id: 4,
      hasCourse: true,
      canTeach: true,
      name: 'Korean',
      level: 5,
      priority: 1,
      teaching: true,
      learning: true,
    },
    ...expectedLanguages,
  ],
};

describe('userResolverTest', () => {
  it('resolves languages with a specified level', () => {
    const languages = userResolver.User.languages(mockUser, {level: 3});
    expect(languages).toEqual(expectedLanguages);
  });

  it('returns all languages if no level is specified', () => {
    const languages = userResolver.User.languages(mockUser, {});
    expect(languages).toEqual(mockUser.languages);
  });
});
