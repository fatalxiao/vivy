/**
 * @file Util.ts
 * @author Liangxiaojun
 */

/**
 * Whether an object is empty.
 * @param obj
 */
export function isEmptyObject(obj: object): boolean {
    return Object.keys(obj)?.length < 1;
}

export default {
    isEmptyObject
};
