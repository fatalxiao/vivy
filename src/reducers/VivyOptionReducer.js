/**
 * @file VivyOptionReducer.js
 */

// Action Types
import {VIVY_OPTION_UPDATE} from '../actionTypes/VivyActionType';

/**
 * Vivy Option Reducer
 * @param options
 * @returns {(function(*=, *): (*))|*}
 */
export default function createVivyOptionReducer(options) {
    return function (state = options, action) {

        if (action.type === VIVY_OPTION_UPDATE) {
            return {
                ...state,
                ...action?.options
            };
        }

        return state;

    };
}
