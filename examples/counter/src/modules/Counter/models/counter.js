/**
 * @file counter.js
 */

export default {
    nameSpace: 'counter',
    state: 0,
    reducers: {

        plus: state => {
            return state + 1;
        },

        minus: state => {
            return state - 1;
        },

        update: (state, {nextValue}) => {
            return nextValue;
        }

    }
};
