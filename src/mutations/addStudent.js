/**
 * @prettier
 * @flow
 */

import {fetchUser as fetchItalkiProfile} from 'italki-api';
import {getContacts} from 'skype-web-api';

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

const addStudent = async (root: any, {data}: Data, context: Context) => {
  if (!context.userId) {
    throw Error('You are not logged in.');
  }

  const user = await UserModel.findOne({_id: context.userId})
    .select('students')
    .populate({
      path: 'students',
      select: '_id',
      match: {italkiId: data.italkiId},
    });

  if (user.students.length) {
    throw Error('You have already added this student.');
  }

  let skypeMri = null;

  if (data.skypeUsername !== '') {
    if (!context.skypeToken) {
      throw Error('You must be logged into Skype to add a Skype student.');
    }

    const contacts = await getContacts(context.skypeToken);

    const studentContact = contacts.find(
      contact => contact.profile.username === data.skypeUsername,
    );

    if (!studentContact) {
      throw Error("Couldn't find this Skype username in your contacts.");
    }

    skypeMri = studentContact.mri;
  }

  const italkiProfile = await fetchItalkiProfile(data.italkiId);

  const student = await StudentModel.create({
    ...data,
    skypeMri,
  });
  user.students.push(student);
  await user.save();

  return {
    newStudentEdge: {
      node: {
        id: student._id,
        italkiId: italkiProfile.id,
        skypeUsername: student.skypeUsername,
        skypeMri: student.skypeMri,
        weChatUsername: student.weChatUsername,
        email: student.email,
      },
      cursor: student._id,
    },
  };
};

export default addStudent;
