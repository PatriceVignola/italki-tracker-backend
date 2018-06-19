/**
 * @prettier
 * @flow
 */

import StudentModel from '../mongoose/StudentModel';
import DocumentModel from '../mongoose/DocumentModel';
import type {Student} from '../mongoose/StudentModel';
import type {StudentGraphql} from '../schemas/studentSchema';
import type {Document} from '../mongoose/DocumentModel';
import type {DocumentGraphql} from '../schemas/documentSchema';

const resolver = {
  User: {
    student: async (_: any, id: string) => {
      const student: Student = await StudentModel.findOne({_id: id});

      return {
        id: student._id,
        italkiId: student.italkiId,
        skypeUsername: student.skypeUsername,
        weChatUsername: student.weChatUsername,
        email: student.email,
      };
    },

    students: async (): Promise<StudentGraphql[]> => {
      const students: Student[] = await StudentModel.find();

      return students.map(student => ({
        id: student._id,
        italkiId: student.italkiId,
        skypeUsername: student.skypeUsername,
        weChatUsername: student.weChatUsername,
        email: student.email,
      }));
    },

    documents: async (): Promise<DocumentGraphql[]> => {
      const documents: Document[] = await DocumentModel.find().populate(
        'students',
      );

      return documents.map(document => ({
        id: document._id,
        checksum: document.checksum,
        fileName: document.fileName,
        students: document.students.map(student => ({
          id: student._id,
          italkiId: student.italkiId,
          skypeUsername: student.skypeUsername,
          weChatUsername: student.weChatUsername,
          email: student.email,
        })),
      }));
    },
  },
};

export default resolver;
