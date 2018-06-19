/**
 * @prettier
 * @flow
 */

import type {User as ItalkiUserProfile} from 'italki-api';
import type {UserProfile as SkypeUserProfile} from 'skype-web-api';

import ItalkiProfile from './italkiProfileSchema';
import SkypeProfile from './skypeProfileSchema';
import Document from './documentSchema';
import type {DocumentGraphql} from './documentSchema';

type StudentGraphql = {
  id: string,
  italkiId: number,
  skypeUsername: ?string,
  weChatUsername: ?string,
  email: ?string,
  italkiProfile?: ItalkiUserProfile,
  skypeProfile?: SkypeUserProfile,
  documents?: DocumentGraphql[],
};

const Student = `
  type Student implements Node {
    id: ID!,
    italkiId: Int!,
    skypeUsername: String,
    weChatUsername: String,
    email: String,
    italkiProfile: ItalkiProfile,
    skypeProfile: SkypeProfile,
    documents: [Document],
  }
`;

// Always export dependencies to make sure that all schemas are self-containing
export default () => [Student, ItalkiProfile, SkypeProfile, Document];
export type {StudentGraphql};
