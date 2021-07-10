/**
 * @file UserListApi.js
 */

import {post} from '../../../utils/Request';

/**
 * get user list
 * @param params
 * @returns {Promise<Response>}
 */
export function getUserList(params) {
    return post('/getUserList', params);
}
