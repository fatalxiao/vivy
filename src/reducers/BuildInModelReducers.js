/**
 * @file BuildInModelReducers.js
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
