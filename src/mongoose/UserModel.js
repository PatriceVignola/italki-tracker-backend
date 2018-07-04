/**
 * @prettier
 * @flow
 */

import mongoose from 'mongoose';

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

export default mongoose.model('User', userSchema);
