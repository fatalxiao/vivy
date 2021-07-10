/**
 * @file Request.js
 */

/**
 * get
 * @param url
 * @param params
 * @returns {Promise<Response>}
 */
export function get(url, params) {
    return fetch(url, {
        method: 'GET',
        params: JSON.stringify(params)
    });
}
