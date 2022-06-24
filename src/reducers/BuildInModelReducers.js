/**
 * @file BuildInModelReducers.js
 */

export default {

    setState: (state, {nextState}) => {

        if (typeof nextState === 'function') {
            return nextState(state);
        }

        return nextState;

    }

};
