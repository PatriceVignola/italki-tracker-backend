/**
 * @prettier
 * @flow
 */

import {fetchUser} from 'italki-api';

const resolver = {
  Query: {
    user: async (query: any, args: {id: number}) => fetchUser(args.id),
  },
};

export default resolver;
