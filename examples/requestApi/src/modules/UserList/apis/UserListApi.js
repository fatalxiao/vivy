/**
 * @file UserListApi.js
 */

import {get} from '../../../utils/Request';

/**
 * get user list
 * @param params
 * @returns {Promise<Response>}
 */
export function getUserList(params) {
    return get('/getUserList', params);
}
