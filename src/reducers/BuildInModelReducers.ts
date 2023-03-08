/**
 * @file BuildInModelReducers.ts
 * @author Liangxiaojun
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
     */
    setState: (state: any, {nextState}: AnyAction) => {

        if (typeof nextState === 'function') {
            return nextState(state);
        }

        return nextState;

    }

};
