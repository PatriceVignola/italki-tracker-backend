/**
 * @prettier
 * @flow
 */

import mongoose from 'mongoose';
import {fetchUser} from 'italki-api';
import {getUserProfile} from 'skype-web-api';

import UserModel from '../mongoose/UserModel';
import DocumentModel from '../mongoose/DocumentModel';
import type {Context} from '../context';

const resolver = {
  Student: {
    italkiProfile: async ({italkiId}: {italkiId: number}) =>
      fetchUser(italkiId),

    skypeProfile: async (
      {skypeUsername}: {skypeUsername: string},
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

    documents: async (student: {documents: any[]}) => {
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
