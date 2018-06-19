/**
 * @prettier
 * @flow
 */

import type {User as ItalkiProfile} from 'italki-api';

type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7;

const resolver = {
  ItalkiProfile: {
    languages: (
      italkiProfile: ItalkiProfile,
      args: {level: Level, learning: Boolean, teaching: Boolean},
    ) =>
      italkiProfile.languages.filter(language => {
        const matchesLevel =
          args.level === undefined ||
          args.level === null ||
          language.level === args.level;

        const matchesLearning =
          args.learning === undefined ||
          args.learning === null ||
          language.learning === args.learning;

        const matchesTeaching =
          args.teaching === undefined ||
          args.teaching === null ||
          language.teaching === args.teaching;

        return matchesLevel && matchesLearning && matchesTeaching;
      }),
  },
};

export default resolver;
