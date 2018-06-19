/**
 * @prettier
 * @flow
 */

import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import UserModel from '../mongoose/UserModel';
import type {Context} from '../context';

type Data = {
  email: string,
  password: string,
};

const login = async (
  root: any,
  {email, password}: Data,
  {jwtSecret}: Context,
) => {
  const user = await UserModel.findOne({email});

  if (!user) {
    throw Error('Email not found.');
  }

  const passwordsMatch = await argon2.verify(user.password, password);

  if (!passwordsMatch) {
    throw Error('Wrong password.');
  }

  return {
    ...user,
    id: user._id,
    jwt: jwt.sign({id: user._id}, jwtSecret),
  };
};

export default login;
