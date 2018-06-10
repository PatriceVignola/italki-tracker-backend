/**
 * @prettier
 * @flow
 */

const UserLanguage = `
  scalar UserLanguageLevel

  type UserLanguage {
    id: ID!,
    hasCourse: Boolean,
    canTeach: Boolean,
    name: String,
    level: UserLanguageLevel,
    priority: Int,
    teaching: Boolean,
    learning: Boolean,
  }
`;

// Always export dependencies to make sure that all schemas can compile
export default () => [UserLanguage];
