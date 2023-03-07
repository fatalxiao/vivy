/**
 * @file BuildInModelReducers.js
 */

// Types
import {AnyAction} from "redux";

/**
 * These reducers will be injected into each model
 */
export default {

    /**
     * Update model state
     * @param state
     * @param nextState
     * @returns {*}
     */
    setState: (state: never, {nextState}: AnyAction) => {

        if (typeof nextState === 'function') {
            return nextState(state);
        }

        return nextState;

    }

};
