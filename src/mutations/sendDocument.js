/**
 * @prettier
 * @flow
 */

import StudentModel from '../mongoose/StudentModel';
import DocumentModel from '../mongoose/DocumentModel';
import type {Student} from '../mongoose/StudentModel';
import type {Document} from '../mongoose/DocumentModel';

type Data = {
  data: {
    studentId: string,
    checksum: string,
    fileName: string,
  },
};

// TODO: Replace checksum with buffer
const sendDocument = async (_: any, {data}: Data) => {
  const {studentId, checksum, fileName} = data;

  const student: Student = await StudentModel.findOne({
    _id: studentId,
  }).populate({
    path: 'documents',
    match: {checksum},
    select: '_id',
  });

  if (student.documents.length > 0) {
    throw Error('The document has already been sent to this student.');
  }

  let document: Document = await DocumentModel.findOne({checksum});

  // If the document has never been sent to any student, we create a new one
  if (!document) {
    document = new DocumentModel({checksum, fileName});
  }

  document.students.push(student);
  student.documents.push(document);

  document.save();
  student.save();

  return document._id;
};

export default sendDocument;
