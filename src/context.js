/**
 * @prettier
 * @flow
 */

export type Context = {
  userId: ?string,
  jwtSecret: string,
  skypeToken?: string,
  registrationToken?: string,
  files?: {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    buffer: Buffer,
    size: number,
  }[],
};
