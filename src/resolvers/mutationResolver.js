/**
 * @prettier
 * @flow
 */

import signin from '../mutations/signin';
import signup from '../mutations/signup';
import linkSkypeAccount from '../mutations/linkSkypeAccount';
import signinToSkype from '../mutations/signinToSkype';
import addStudent from '../mutations/addStudent';
import sendDocument from '../mutations/sendDocument';

const resolver = {
  Mutation: {
    signin,
    signup,
    linkSkypeAccount,
    signinToSkype,
    addStudent,
    sendDocument,
  },
};

export default resolver;
