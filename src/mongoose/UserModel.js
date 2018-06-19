/**
 * @prettier
 * @flow
 */

import mongoose from 'mongoose';
import type {Student} from './StudentModel';
import type {Document} from './DocumentModel';

// TODO: Create a libdef for Mongoose instead
type UserObject = {
  _id: string,
  email: string,
  password: string,
  skypeLogin: {
    skypeToken: string,
    skypeTokenExpiration: number,
    registrationToken: string,
    registrationTokenExpiration: number,
  },
  students: Student[],
  documents: Document[],
};

export type User = {
  save: () => void,
  toObject: () => UserObject,
} & UserObject;

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
    students: [{type: mongoose.Schema.Types.ObjectId, ref: 'Student'}],
    documents: [{type: mongoose.Schema.Types.ObjectId, ref: 'Document'}],
  },
  {collection: 'Users'},
);

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
