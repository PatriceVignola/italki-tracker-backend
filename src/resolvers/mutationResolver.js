/**
 * @prettier
 * @flow
 */

import signin from '../mutations/signin';
import signup from '../mutations/signup';
import linkSkypeAccount from '../mutations/linkSkypeAccount';
import signinToSkype from '../mutations/signinToSkype';
import addStudent from '../mutations/addStudent';
import deleteStudent from '../mutations/deleteStudent';
import sendDocument from '../mutations/sendDocument';

const resolver = {
  Mutation: {
    signin,
    signup,
    linkSkypeAccount,
    signinToSkype,
    addStudent,
    deleteStudent,
    sendDocument,
  },
};

export default resolver;
