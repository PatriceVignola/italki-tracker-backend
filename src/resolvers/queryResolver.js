/**
 * @prettier
 * @flow
 */

import {fetchUser as fetchItalkiProfile} from 'italki-api';
import UserModel from '../mongoose/UserModel';

const resolver = {
  Query: {
    user: async (query: any, args: any, {userId}: {userId: string}) => {
      if (!userId) {
        throw Error('You are not logged in.');
      }

      const user = await UserModel.findOne(
        {_id: userId},
        'email skypeUsername',
      );

      if (!user) {
        throw Error("This account doesn't exist anymore.");
      }

      return {
        id: user._id,
        email: user.email,
        skypeUsername: user.skypeUsername,
      };
    },

    italkiProfile: async (user: any, args: {id: number}) =>
      fetchItalkiProfile(args.id),
  },
};

export default resolver;
