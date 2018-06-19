/**
 * @prettier
 * @flow
 */

import {GraphQLScalarType} from 'graphql';

const int52Error = new Error(
  'Int52 must be an integer between -(2^53 - 1) and (2^53 - 1)',
);

const int52Max = 9007199254740991;

const resolver = {
  Int52: new GraphQLScalarType({
    name: 'ItalkiLanguageLevel',
    description:
      'An integer between 1 and 7 (inclusive) representing the language level',
    serialize: value => {
      if (
        typeof value === 'number' &&
        value >= -int52Max &&
        value <= int52Max
      ) {
        return value;
      }

      throw int52Error;
    },
    parseValue: value => {
      if (typeof value === 'string') {
        const intValue = parseInt(value, 10);

        if (intValue >= -int52Max && intValue <= int52Max) {
          return intValue;
        }
      }

      throw int52Error;
    },
    parseLiteral: ast => {
      if (ast.kind === 'IntValue') {
        const intValue = parseInt(ast.value, 10);

        if (intValue >= -int52Max && intValue <= int52Max) {
          return intValue;
        }
      }

      throw int52Error;
    },
  }),
};

export default resolver;
