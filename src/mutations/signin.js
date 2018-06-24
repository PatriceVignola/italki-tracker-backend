/**
 * @prettier
 * @flow
 */

import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import UserModel from '../mongoose/UserModel';
import type {Context} from '../context';

type Data = {
  data: {
    email: string,
    password: string,
  },
};

const signin = async (root: any, {data}: Data, {jwtSecret}: Context) => {
  const user = await UserModel.findOne({email: data.email});

  if (!user) {
    throw Error('Email not found.');
  }

  const passwordsMatch = await argon2.verify(user.password, data.password);

  if (!passwordsMatch) {
    throw Error('Wrong password.');
  }

  return {
    ...user,
    id: user._id,
    jwt: jwt.sign({id: user._id}, jwtSecret),
  };
};

export default signin;
