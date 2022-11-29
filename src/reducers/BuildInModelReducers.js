/**
 * @file BuildInModelReducers.js
 */

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
    setState: (state, {nextState}) => {

        if (typeof nextState === 'function') {
            return nextState(state);
        }

        return nextState;

    }

};
