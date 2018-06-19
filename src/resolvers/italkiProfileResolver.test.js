/**
 * @prettier
 * @flow
 */

import resolver from './italkiProfileResolver';

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

const mockItalkiProfile = {
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

describe('italkiProfileResolver', () => {
  it('resolves languages with a specified level', () => {
    const languages = resolver.ItalkiProfile.languages(mockItalkiProfile, {
      level: 3,
    });
    expect(languages).toEqual(expectedLanguages);
  });

  it('returns all languages if no level is specified', () => {
    const languages = resolver.ItalkiProfile.languages(mockItalkiProfile, {});
    expect(languages).toEqual(mockItalkiProfile.languages);
  });
});
