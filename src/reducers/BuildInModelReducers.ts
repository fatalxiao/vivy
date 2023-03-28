/**
 * @file BuildInModelReducers.ts
 * @author Liangxiaojun
 */

/**
 * These reducers will be injected into each model
 */
export default {

    /**
     * Update model state
     * @param state
     * @param nextState
     */
    setState: (state: any, {nextState}: any) => {

        if (typeof nextState === 'function') {
            return nextState(state);
        }

        return nextState;

    }

};
