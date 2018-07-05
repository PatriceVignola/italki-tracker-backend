/**
 * @prettier
 * @flow
 */

import UserModel from '../mongoose/UserModel';
import StudentModel from '../mongoose/StudentModel';
import type {Context} from '../context';

type Data = {
  data: {
    id: string,
  },
};

const deleteStudent = async (root: any, {data}: Data, {userId}: Context) => {
  if (!userId) {
    throw Error('You are not logged in.');
  }

  const user = await UserModel.findOne({_id: userId}).select('students');
  const student = user.students.find(
    studentId => studentId.toString() === data.id,
  );

  if (!student) {
    throw Error("The student doesn't exist or has already been deleted.");
  }

  await StudentModel.deleteOne({_id: data.id});

  return {
    deletedStudentId: data.id,
  };
};

export default deleteStudent;
