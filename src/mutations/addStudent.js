/**
 * @prettier
 * @flow
 */

import UserModel from '../mongoose/UserModel';
import StudentModel from '../mongoose/StudentModel';
import type {Student} from '../mongoose/StudentModel';
import type {User} from '../mongoose/UserModel';
import type {Context} from '../context';

type Data = {
  data: {
    italkiId: number,
    skypeUsername: string,
    weChatUsername: string,
    email: string,
  },
};

const addStudent = async (root: any, {data}: Data, {userId}: Context) => {
  if (!userId) {
    throw Error('You are not logged in.');
  }

  const user: User = await UserModel.findOne({_id: userId});
  const student: Student = await StudentModel.create(data);
  user.students.push(student);
  await user.save();

  return {
    ...student.toObject(),
    id: student._id,
  };
};

export default addStudent;
