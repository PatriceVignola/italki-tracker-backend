/**
 * @prettier
 * @flow
 */

import mongoose from 'mongoose';
import UserModel from '../mongoose/UserModel';
import DocumentModel from '../mongoose/DocumentModel';

type StudentConnectionArgs = {
  first: number,
  last: number,
};

const resolver = {
  User: {
    students: async (user: any, {first, last}: StudentConnectionArgs) => {
      if (first < 1) {
        throw Error('Argument "first" must be greater than  0.');
      }

      if (last < first) {
        throw Error('Argument "last" cannot be smaller than argument "first".');
      }

      const {students} = await UserModel.findOne({_id: user.id}, 'students', {
        skip: first - 1,
        limit: last - first + 1,
      }).populate('students');

      const startCursor = students.length ? students[0]._id : null;
      const endCursor = students.length
        ? students[students.length - 1]._id
        : null;

      return {
        pageInfo: {
          hasNextPage: first + last <= students.length,
          hasPreviousPage: first > 1,
          startCursor,
          endCursor,
        },
        edges: students.map(student => ({
          node: {
            id: student._id,
            italkiId: student.italkiId,
            skypeUsername: student.skypeUsername,
            weChatUsername: student.weChatUsername,
            email: student.email,
          },
          cursor: student._id,
        })),
      };
    },

    documents: async (user: any) => {
      const documents = await DocumentModel.find({
        _id: {
          $in: user.documents.map(documentId =>
            mongoose.Types.ObjectId(documentId),
          ),
        },
      });

      return documents.map(document => ({
        ...document.toObject(),
        id: document._id,
      }));
    },
  },
};

export default resolver;
