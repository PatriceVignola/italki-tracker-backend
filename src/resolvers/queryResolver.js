/**
 * @prettier
 * @flow
 */

import {fetchUser as fetchItalkiProfile} from 'italki-api';
import UserModel from '../mongoose/UserModel';
import type {User} from '../mongoose/UserModel';

const resolver = {
  Query: {
    user: async (query: any, args: any, {userId}: {userId: string}) => {
      if (!userId) {
        throw Error('You are not logged in.');
      }

      const user: User = await UserModel.findOne({_id: userId});

      if (!user) {
        throw Error("This account doesn't exist anymore.");
      }

      return {
        ...user.toObject(),
        id: user._id,
      };
    },

    italkiProfile: async (user: any, args: {id: number}) =>
      fetchItalkiProfile(args.id),
  },
};

export default resolver;
