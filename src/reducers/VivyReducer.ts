/**
 * @file VivyReducer.ts
 */

// Action Types
import {VIVY_UPDATE} from '../actionTypes/VivyActionType';

// Types
import {AnyAction} from "redux";

/**
 * Vivy Reducer
 * @param state
 * @param action
 */
export default function (state = 0, action: AnyAction): number {

    if (action.type === VIVY_UPDATE) {
        return state + 1;
    }

    return state;

}
