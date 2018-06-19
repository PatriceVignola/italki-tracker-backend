/**
 * @prettier
 * @flow
 */

import mongoose from 'mongoose';
import type {Student} from './StudentModel';

// TODO: Create a libdef for Mongoose instead
type Document = {
  _id: string,
  checksum: string,
  fileName: string,
  students: Student[],
  save: () => void,
};

const documentSchema = new mongoose.Schema(
  {
    checksum: {type: String, unique: true, required: true},
    fileName: {type: String, required: true},
    students: [{type: mongoose.Schema.Types.ObjectId, ref: 'Student'}],
  },
  {collection: 'Documents'},
);

const DocumentModel = mongoose.model('Document', documentSchema);

export default DocumentModel;
export type {Document};