/**
 * @prettier
 * @flow
 */

import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import {validate as validateEmail} from 'email-validator';

import UserModel from '../mongoose/UserModel';
import type {Context} from '../context';

type Data = {
  data: {
    email: string,
    password: string,
  },
};

const signup = async (root: any, {data}: Data, {jwtSecret}: Context) => {
  const {email, password} = data;

  if (!validateEmail(email)) {
    throw Error('The email is invalid.');
  }

  if (password.length < 8) {
    throw Error('Your password must be at least 8 characters.');
  }

  let user = await UserModel.findOne({email});

  if (user) {
    throw Error('An account with this email already exists.');
  }

  const hashedPassword = await argon2.hash(password);
  user = await UserModel.create({email, password: hashedPassword});

  return {
    ...user.toObject(),
    id: user._id,
    jwt: jwt.sign({id: user._id}, jwtSecret),
  };
};

export default signup;
