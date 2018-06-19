/**
 * @prettier
 * @flow
 */

import {login} from 'skype-web-api';
import UserModel from '../mongoose/UserModel';
import type {User} from '../mongoose/UserModel';
import type {Context} from '../context';

type Data = {
  username: string,
  password: string,
};

const loginToSkype = async (root: any, data: Data, {userId}: Context) => {
  const {username, password} = data;

  const user: User = await UserModel.findOne({_id: userId});
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

  return {
    ...user.toObject(),
    id: user._id,
  };
};

export default loginToSkype;
