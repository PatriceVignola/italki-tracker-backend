/**
 * @prettier
 * @flow
 */

import mongoose from 'mongoose';
import {fetchUser} from 'italki-api';
import {getUserProfile} from 'skype-web-api';

import UserModel from '../mongoose/UserModel';
import DocumentModel from '../mongoose/DocumentModel';
import type {Document} from '../mongoose/DocumentModel';
import type {StudentGraphql} from '../schemas/studentSchema';
import type {Context} from '../context';

const resolver = {
  Student: {
    italkiProfile: async ({italkiId}: StudentGraphql) => fetchUser(italkiId),

    skypeProfile: async (
      {skypeUsername}: StudentGraphql,
      _: any,
      {userId}: Context,
    ) => {
      if (!skypeUsername) return null;

      const {skypeLogin} = await UserModel.findOne({_id: userId});

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

    documents: async (student: StudentGraphql) => {
      const documents: Document[] = await DocumentModel.findOne({
        _id: {
          $in: student.documents.map(documentId =>
            mongoose.Types.ObjectID(documentId),
          ),
        },
      });

      return documents;
    },
  },
};

export default resolver;
