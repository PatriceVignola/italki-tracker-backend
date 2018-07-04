/**
 * @prettier
 * @flow
 */

import {login} from 'skype-web-api';
import UserModel from '../mongoose/UserModel';
import type {Context} from '../context';

type Data = {
  data: {
    password: string,
  },
};

const signinToSkype = async (root: any, {data}: Data, {userId}: Context) => {
  const {password} = data;
  const user = await UserModel.findOne({_id: userId});
  const {skypeUsername} = user;

  if (!skypeUsername) {
    throw Error('No Skype account has been linked.');
  }

  try {
    const {skypeToken, registrationToken} = await login(
      skypeUsername,
      password,
    );

    return {
      skypeToken,
      skypeTokenExpiration: skypeToken.epochMillisecondsExpiration,
      registrationToken,
      registrationTokenExpiration:
        registrationToken.epochMillisecondsExpiration,
    };
  } catch (error) {
    throw Error('Invalid Skype credentials.');
  }
};

export default signinToSkype;
