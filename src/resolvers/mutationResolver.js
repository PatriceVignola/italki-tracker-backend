/**
 * @prettier
 * @flow
 */

import login from '../mutations/login';
import signup from '../mutations/signup';
import loginToSkype from '../mutations/loginToSkype';
import addStudent from '../mutations/addStudent';
import sendDocument from '../mutations/sendDocument';

const resolver = {
  Mutation: {
    login,
    signup,
    loginToSkype,
    addStudent,
    sendDocument,
  },
};

export default resolver;
