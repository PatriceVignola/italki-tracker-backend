/**
 * @prettier
 * @flow
 */

import crypto from 'crypto';
import {sendFile} from 'skype-web-api';

import StudentModel from '../mongoose/StudentModel';
import DocumentModel from '../mongoose/DocumentModel';
import type {Context} from '../context';

type Data = {
  data: {
    studentId: string,
    checksum: string,
    fileName: string,
  },
};

const sendDocument = async (_: any, {data}: Data, context: Context) => {
  const {skypeToken, registrationToken, files} = context;

  if (!files) {
    throw Error('No file was sent.');
  }

  // TODO: Generalize for emails
  if (!skypeToken || !registrationToken) {
    throw Error('You must be logged in Skype to send files.');
  }

  // TODO: Generalize for multiple files
  const file = files[0];

  const hash = crypto.createHash('md5');
  hash.update(file.buffer);
  const checksum = hash.digest('hex');

  const {studentId} = data;

  const student = await StudentModel.findOne({
    _id: studentId,
  }).populate({
    path: 'documents',
    match: {checksum},
    select: '_id',
  });

  console.warn(student.documents);

  if (student.documents.length > 0) {
    throw Error('The document has already been sent to this student.');
  }

  await sendFile(
    file.buffer,
    file.originalname,
    student.skypeMri,
    skypeToken,
    registrationToken,
  );

  let document = await DocumentModel.findOne({checksum});

  // If the document has never been sent to any student, we create a new one
  if (!document) {
    document = new DocumentModel({checksum, fileName: file.originalname});
  }

  document.students.push(student);
  student.documents.push(document);

  document.save();
  student.save();

  return {
    document: {
      id: document._id,
      checksum: document.checksum,
      fileName: document.fileName,
    },
  };
};

export default sendDocument;
