/**
 * @prettier
 * @flow
 */

import {GraphQLScalarType} from 'graphql';

const userLanguageLevelError = new Error(
  'The language level of a user must be an integer between 1 and 7 (inclusive)',
);

const resolver = {
  UserLanguageLevel: new GraphQLScalarType({
    name: 'UserLanguageLevel',
    description:
      'An integer between 1 and 7 (inclusive) representing the language level of a user',
    serialize: value => {
      /*
        Ran when the user wants the field to appear in its results, e.g.:
        {
          query {
            user {
              languages {
                level,
              }
            }
          }
        }
        */
      if (typeof value === 'number' && value >= 1 && value <= 7) {
        return value;
      }

      throw userLanguageLevelError;
    },
    parseValue: value => {
      /*
        Ran when the user wants to filter the results with a variable, e.g.:
        {
          query($userLanguageLevel: UserLanguageLevel) {
            user {
              languages(level: $userLanguageLevel) {
                id,
              }
            }
          }
        }
        */
      if (typeof value === 'string') {
        const intValue = parseInt(value, 10);

        if (intValue >= 1 && intValue <= 7) {
          return intValue;
        }
      }

      throw userLanguageLevelError;
    },
    parseLiteral: ast => {
      /*
        Ran when the user wants to filter the results with a constant, e.g.:
        {
          query {
            user {
              languages(level: 1) {
                id,
              }
            }
          }
        }
        */
      if (ast.kind === 'IntValue') {
        const intValue = parseInt(ast.value, 10);

        if (intValue >= 1 && intValue <= 7) {
          return intValue;
        }
      }

      throw userLanguageLevelError;
    },
  }),
};

export default resolver;
