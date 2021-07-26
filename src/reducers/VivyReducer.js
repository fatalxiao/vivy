/**
 * @file VivyReducer.js
 */

import {VIVY_UPDATE} from '../actionTypes/VivyActionType';

/**
 * Vivy Reducer
 * @param state
 * @param action
 * @returns {null}
 */
export default function (state = 0, action) {

    if (action.type === VIVY_UPDATE) {
        return state + 1;
    }

    return state;

}
