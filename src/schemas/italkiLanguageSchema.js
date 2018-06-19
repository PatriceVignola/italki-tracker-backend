/**
 * @prettier
 * @flow
 */

const ItalkiLanguage = `
  scalar ItalkiLanguageLevel

  type ItalkiLanguage {
    id: ID!,
    hasCourse: Boolean,
    canTeach: Boolean,
    name: String,
    level: ItalkiLanguageLevel,
    priority: Int,
    teaching: Boolean,
    learning: Boolean,
  }
`;

// Always export dependencies to make sure that all schemas can compile
export default () => [ItalkiLanguage];
