/**
 * @prettier
 * @flow
 */

import {fetchUser} from 'italki-api';
import {getUserProfile} from 'skype-web-api';

import UserModel from '../mongoose/UserModel';
import StudentModel from '../mongoose/StudentModel';
import type {Student} from '../mongoose/StudentModel';
import type {StudentGraphql} from '../schemas/studentSchema';

// TODO: Change the email for the real user's email when login is implemented
const testEmail = 'vignola.patrice@gmail.com';

const resolver = {
  Student: {
    italkiProfile: async ({italkiId}: StudentGraphql) => fetchUser(italkiId),

    skypeProfile: async ({skypeUsername}: StudentGraphql) => {
      if (!skypeUsername) return null;

      const {skypeLogin} = await UserModel.findOne({email: testEmail});

      if (!skypeLogin || skypeLogin.skypeTokenExpiration <= Date.now()) {
        throw Error(
          'Cannot retrieve the Skype profile because you are not logged into skype',
        );
      }

      const skypeProfile = await getUserProfile(
        skypeLogin.skypeToken,
        skypeUsername,
      );

      return skypeProfile;
    },

    documents: async ({id}: StudentGraphql) => {
      const {documents}: Student = await StudentModel.findOne({
        _id: id,
      }).populate('documents');

      return documents;
    },
  },
};

export default resolver;
