/**
 * @prettier
 * @flow
 */

import {login, getMyUserProfile} from 'skype-web-api';

type SkypeCredentials = {
  username: string,
  password: string,
};

const resolver = {
  Mutation: {
    loginToSkype: async (_: any, {username, password}: SkypeCredentials) => {
      const {skypeToken} = await login(username, password);
      const userProfile = await getMyUserProfile(skypeToken.value);

      return userProfile;
    },
  },
};

export default resolver;
