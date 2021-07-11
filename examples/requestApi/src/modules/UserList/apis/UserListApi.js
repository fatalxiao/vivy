/**
 * @file UserListApi.js
 */

import axios from 'axios';

let source;

/**
 * get user list
 * @param params
 * @returns {Promise<Response>}
 */
export function getUserList(params) {

    if (source) {
        source.cancel();
    }

    source = axios.CancelToken.source();

    return axios.get('/getUserList', {
        cancelToken: source.token,
        params
    });

}
