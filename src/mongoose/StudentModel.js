/**
 * @prettier
 * @flow
 */

import mongoose from 'mongoose';
import type {Document} from './DocumentModel';

// TODO: Create a libdef for Mongoose instead
type StudentObject = {
  _id: string,
  italkiId: number,
  skypeUsername: string,
  weChatUsername: string,
  email: string,
  documents: Document[],
};

type Student = {
  save: () => void,
  toObject: () => StudentObject,
} & StudentObject;

const studentSchema = new mongoose.Schema(
  {
    italkiId: {type: Number, required: true},
    skypeUsername: {
      type: String,
      index: {
        unique: true,
        partialFilterExpression: {skypeUsername: {$type: 'string'}},
      },
    },
    weChatUsername: {
      type: String,
      index: {
        unique: true,
        partialFilterExpression: {weChatUsername: {$type: 'string'}},
      },
    },
    email: {
      type: String,
      index: {
        unique: true,
        partialFilterExpression: {email: {$type: 'string'}},
      },
    },
    documents: [{type: mongoose.Schema.Types.ObjectId, ref: 'Document'}],
  },
  {collection: 'Students'},
);

const StudentModel = mongoose.model('Student', studentSchema);

export default StudentModel;
export type {Student};
