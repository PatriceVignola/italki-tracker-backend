/**
 * @prettier
 * @flow
 */

import type {User} from 'italki-api';

const resolver = {
  User: {
    languages: (user: User, args: {level: 1 | 2 | 3 | 4 | 5 | 6 | 7}) => {
      if (args.level === undefined || args.level === null) {
        return user.languages;
      }

      return user.languages.filter(language => language.level === args.level);
    },
  },
};

export default resolver;
