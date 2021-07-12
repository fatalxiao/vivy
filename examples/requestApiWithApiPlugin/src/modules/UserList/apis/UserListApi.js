/**
 * @file UserListApi.js
 */

// Vendors
import axios from 'axios';

let source;

/**
 * Get user list
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
