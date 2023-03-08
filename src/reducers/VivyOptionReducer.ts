/**
 * @file VivyOptionReducer.ts
 * @author Liangxiaojun
 */

// Action Types
import {VIVY_OPTION_UPDATE} from '../actionTypes/VivyOptionActionType';

// Types
import {VivyOption} from "src/types";
import {AnyAction} from "redux";

/**
 * Vivy Option Reducer
 * @param options
 */
export default function createVivyOptionReducer(options: VivyOption) {
    return function (state = options, action: AnyAction): VivyOption {

        if (action.type === VIVY_OPTION_UPDATE) {
            return {
                ...state,
                ...action?.options
            };
        }

        return state;

    };
}
