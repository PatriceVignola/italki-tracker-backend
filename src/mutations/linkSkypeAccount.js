/**
 * @prettier
 * @flow
 */

import {login} from 'skype-web-api';
import UserModel from '../mongoose/UserModel';
import type {User} from '../mongoose/UserModel';
import type {Context} from '../context';

type Data = {
  data: {
    username: string,
    password: string,
  },
};

const linkSkypeAccount = async (root: any, {data}: Data, {userId}: Context) => {
  const {username, password} = data;

  try {
    const {skypeToken, registrationToken} = await login(username, password);
    const user: User = await UserModel.findOne({_id: userId});
    user.skypeUsername = username;
    user.save();

    return {
      skypeToken: skypeToken.value,
      skypeTokenExpiration: skypeToken.epochMillisecondsExpiration,
      registrationToken: registrationToken.value,
      registrationTokenExpiration:
        registrationToken.epochMillisecondsExpiration,
    };
  } catch (error) {
    throw Error('Invalid Skype credentials.');
  }
};

export default linkSkypeAccount;
