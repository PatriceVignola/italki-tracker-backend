/**
 * @prettier
 * @flow
 */

import mongoose from 'mongoose';
import StudentModel from '../mongoose/StudentModel';
import DocumentModel from '../mongoose/DocumentModel';
import type {User} from '../mongoose/UserModel';
import type {DocumentGraphql} from '../schemas/documentSchema';

const resolver = {
  User: {
    students: async (user: User) => {
      const students = await StudentModel.find({
        _id: {
          $in: user.students.map(studentId =>
            mongoose.Types.ObjectId(studentId),
          ),
        },
      });

      return students.map(student => ({
        id: student._id,
        italkiId: student.italkiId,
        skypeUsername: student.skypeUsername,
        weChatUsername: student.weChatUsername,
        email: student.email,
      }));
    },

    documents: async (user: User): Promise<DocumentGraphql[]> => {
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
