/**
 * @prettier
 * @flow
 */

import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    italkiId: {type: Number, required: true},
    skypeUsername: {
      type: String,
      index: {
        partialFilterExpression: {skypeUsername: {$type: 'string'}},
      },
    },
    weChatUsername: {
      type: String,
      index: {
        partialFilterExpression: {weChatUsername: {$type: 'string'}},
      },
    },
    email: {
      type: String,
      index: {
        partialFilterExpression: {email: {$type: 'string'}},
      },
    },
    documents: [{type: mongoose.Schema.Types.ObjectId, ref: 'Document'}],
  },
  {collection: 'Students'},
);

export default mongoose.model('Student', studentSchema);
