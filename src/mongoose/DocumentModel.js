/**
 * @prettier
 * @flow
 */

import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
  {
    checksum: {type: String, unique: true, required: true},
    fileName: {type: String, required: true},
    students: [{type: mongoose.Schema.Types.ObjectId, ref: 'Student'}],
  },
  {collection: 'Documents'},
);

export default mongoose.model('Document', documentSchema);
