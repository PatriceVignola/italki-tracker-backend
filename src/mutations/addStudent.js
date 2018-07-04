/**
 * @prettier
 * @flow
 */

import {fetchUser as fetchItalkiProfile} from 'italki-api';

import UserModel from '../mongoose/UserModel';
import StudentModel from '../mongoose/StudentModel';
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

  const user = await UserModel.findOne({_id: userId})
    .select('students')
    .populate({
      path: 'students',
      select: '_id',
      match: {italkiId: data.italkiId},
    });

  if (user.students.length) {
    throw Error('You have already added this student.');
  }

  const italkiProfile = await fetchItalkiProfile(data.italkiId);

  const student = await StudentModel.create(data);
  user.students.push(student);
  await user.save();

  return {
    newStudentEdge: {
      node: {
        id: student._id,
        italkiId: italkiProfile.id,
        skypeUsername: student.skypeUsername,
        weChatUsername: student.weChatUsername,
        email: student.email,
      },
      cursor: student._id,
    },
  };
};

export default addStudent;
