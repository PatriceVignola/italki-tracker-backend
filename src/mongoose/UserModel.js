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
  skypeUsername: string,
  students: Student[],
  documents: Document[],
};

export type User = {
  save: () => void,
  toObject: () => UserObject,
} & UserObject;

const userSchema = new mongoose.Schema(
  {
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    skypeUsername: String,
    students: [{type: mongoose.Schema.Types.ObjectId, ref: 'Student'}],
    documents: [{type: mongoose.Schema.Types.ObjectId, ref: 'Document'}],
  },
  {collection: 'Users'},
);

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
