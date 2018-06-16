/**
 * @prettier
 * @flow
 */

import {login, getMyUserProfile} from 'skype-web-api';

import User from '../mongoose/User';

type SkypeCredentials = {
  username: string,
  password: string,
};

// TODO: Change the email for the real user's email when login is implemented
const testEmail = 'vignola.patrice@gmail.com';

const resolver = {
  Mutation: {
    loginToSkype: async (_: any, {username, password}: SkypeCredentials) => {
      const user = await User.findOne({email: testEmail});
      const {skypeLogin} = user;

      if (!skypeLogin || skypeLogin.skypeTokenExpiration <= Date.now()) {
        const {skypeToken, registrationToken} = await login(username, password);

        user.skypeLogin = {
          skypeToken: skypeToken.value,
          skypeTokenExpiration: skypeToken.epochMillisecondsExpiration,
          registrationToken: registrationToken.value,
          registrationTokenExpiration:
            registrationToken.epochMillisecondsExpiration,
        };

        user.save();
      }

      const userProfile = await getMyUserProfile(user.skypeLogin.skypeToken);

      return userProfile;
    },
  },
};

export default resolver;
