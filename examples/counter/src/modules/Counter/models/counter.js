/**
 * @file counter.js
 */

export default {
    nameSpace: 'counter',
    state: 0,
    reducers: {

        /**
         * Plus 1
         * @param state
         * @returns {*}
         */
        plus: state => {
            return state + 1;
        },

        /**
         * Minus 1
         * @param state
         * @returns {number}
         */
        minus: state => {
            return state - 1;
        },

        /**
         * Update new value
         * @param state
         * @param nextValue
         * @returns {*}
         */
        update: (state, {nextValue}) => {
            return nextValue;
        }

    }
};
