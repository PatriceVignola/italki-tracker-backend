/**
 * @prettier
 * @flow
 */

import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import UserModel from '../mongoose/UserModel';
import signinToSkype from './signinToSkype';
import type {User} from '../mongoose/UserModel';
import type {Context} from '../context';

type Data = {
  data: {
    email: string,
    password: string,
    skypeUsername?: string,
    skypePassword?: string,
  },
};

const signup = async (root: any, {data}: Data, {jwtSecret}: Context) => {
  const {email, password, skypeUsername, skypePassword} = data;

  let user: User = await UserModel.findOne({email});

  if (user) {
    throw Error('An account with this email already exists.');
  }

  const hashedPassword = await argon2.hash(password);
  user = await UserModel.create({email, password: hashedPassword});

  if (skypeUsername && skypePassword) {
    await signinToSkype({
      username: skypeUsername,
      password: skypePassword,
    });

    console.warn(user.skypeLogin);
    user = await UserModel.findOne({email});
    console.warn(user.skypeLogin);
  }

  return {
    ...user.toObject(),
    id: user._id,
    jwt: jwt.sign({id: user._id}, jwtSecret),
  };
};

export default signup;
