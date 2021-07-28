/**
 * @file VivyReducer.js
 */

// Action Types
import {VIVY_UPDATE} from '../actionTypes/VivyActionType';

/**
 * Vivy Reducer
 * @param state {number}
 * @param action {Object}
 * @returns {number}
 */
export default function (state = 0, action) {

    if (action.type === VIVY_UPDATE) {
        return state + 1;
    }

    return state;

}
