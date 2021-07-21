/**
 * @file UserListApi.js
 */

// Vendors
import axios from 'axios';

let source;

/**
 * Get user list
 * @param options
 * @returns {Promise<Response>}
 */
export function getUserList(options) {

    if (source) {
        source.cancel();
    }

    source = axios.CancelToken.source();

    return axios.get('/getUserList', {
        ...options,
        cancelToken: source.token
    });

}
