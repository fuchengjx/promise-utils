/**
 * Inverts the given promise - i.e. throws an error if it completes successfully and returns the
 * error if it throws one.
 *
//  * @param {Promise} promise - the promise to invert
//  * @param {string} message - the message to throw if the promise resolves
//  * @returns the error thrown by the promise
 */
// tslint:disable-next-line:no-any (returns the rejection which is untyped)
// export async function invert(promise, message) {
//   message = message || 'Expected promise to reject';
//   return promise.then(res => {
//     throw new Error(message);
//   }, err => err);
// }

export function invert(promise, message) {
  message = message || 'Expected promise to reject';
  return promise.then(res => {
    throw new Error(message);
  }, err => err);
}