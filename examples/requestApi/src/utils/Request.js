/**
 * @file Request.js
 */

/**
 * post
 * @param url
 * @param params
 * @returns {Promise<Response>}
 */
export function post(url, params) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(params)
    });
}
