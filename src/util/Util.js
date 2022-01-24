/**
 * @file Util.js
 */

/**
 * Whether an object is empty.
 * @param obj
 * @returns {boolean}
 */
export function isEmptyObject(obj) {
    return Object.keys(obj)?.length < 1;
}

export default {
    isEmptyObject
};
