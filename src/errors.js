/**
 * Rather than just blanket propagating errors, allows you to specify an error handler that can
 * transform it to something useful or throw a wrapped error.
 *
 * @param {Function} fn - An async function to wrap
 * @param {Function} errorHandler
 *     - a function that will process any errors produced by the original function
 * @returns A wrapped version of function that uses error handler
 */
export function transformErrors(fn, errorHandler) {
  // tslint:disable-next-line:no-any (casting as any to preserve original function type)
  // return (async (...args) => {
  //   try {
  //     return await fn(...args);
  //   }
  //   catch (err) {
  //     return errorHandler(err);
  //   }
  //   // tslint:disable-next-line:no-any (casting as any to preserve original function type)
  // });
  return (...args) => {
    new Promise(fn(...args)).catch(err => {
      return errorHandler(err)
    })
  }
}