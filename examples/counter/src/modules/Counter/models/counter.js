/**
 * @file counter.js
 */

export default {
    nameSpace: 'counter',
    state: 0,
    reducers: {

        /**
         * plus 1
         * @param state
         * @returns {*}
         */
        plus: state => {
            return state + 1;
        },

        /**
         * minus 1
         * @param state
         * @returns {number}
         */
        minus: state => {
            return state - 1;
        },

        /**
         * update new value
         * @param state
         * @param nextValue
         * @returns {*}
         */
        update: (state, {nextValue}) => {
            return nextValue;
        }

    }
};
