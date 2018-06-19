/**
 * @prettier
 * @flow
 */

import {GraphQLScalarType} from 'graphql';

const italkiLanguageLevelError = new Error(
  'The language level must be an integer between 1 and 7 (inclusive)',
);

const resolver = {
  ItalkiLanguageLevel: new GraphQLScalarType({
    name: 'ItalkiLanguageLevel',
    description:
      'An integer between 1 and 7 (inclusive) representing the language level',
    serialize: value => {
      /*
        Ran when the user wants the field to appear in its results, e.g.:
        {
          query {
            italkiProfile {
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

      throw italkiLanguageLevelError;
    },
    parseValue: value => {
      /*
        Ran when the user wants to filter the results with a variable, e.g.:
        {
          query($italkiLanguageLevel: ItalkiLanguageLevel) {
            italkiProfile {
              languages(level: $italkiLanguageLevel) {
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

      throw italkiLanguageLevelError;
    },
    parseLiteral: ast => {
      /*
        Ran when the user wants to filter the results with a constant, e.g.:
        {
          query {
            italkiProfile {
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

      throw italkiLanguageLevelError;
    },
  }),
};

export default resolver;
