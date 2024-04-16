/**
 * @author: Anthony D'Alesandro
 *
 * middleware function that handles errors outside an endpoint.
 * Helps simplify code that is all.
 * Otherwise, expect lots of try catch blocks.
 */

/**
 * Wraps async/await functions with error handling middleware.
 *
 * @param {function} fn - The async/await function to be wrapped.
 * @returns {function} - The endpoint function with error handling built in.
 */
exports.catchErrors = fn => (req, res, next) => fn(req, res).catch(next)
