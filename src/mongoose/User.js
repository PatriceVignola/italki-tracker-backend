/**
 * @prettier
 * @flow
 */

import mongoose from 'mongoose';

const skypeLoginSchema = new mongoose.Schema({
  skypeToken: String,
  skypeTokenExpiration: Number,
  registrationToken: String,
  registrationTokenExpiration: Number,
});

const userSchema = new mongoose.Schema(
  {
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    skypeLogin: skypeLoginSchema,
  },
  {collection: 'Users'},
);

const User = mongoose.model('User', userSchema);

export default User;
