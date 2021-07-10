/**
 * @file Request.js
 */

/**
 * fetch get
 * @param url
 * @param params
 * @returns {Promise<Response>}
 */
export function get(url, params) {
    return fetch(`${url}?${params}`, {
        method: 'GET'
    });
}
