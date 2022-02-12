/**
 * @file pyramid.js
 */

export default {
    nameSpace: 'pyramid',
    state: [2, 1, 3, 5],
    reducers: {

        /**
         * Update state
         * @param state
         * @param value
         * @returns {*}
         */
        update: (state, {value}) => {
            return value;
        }

    }
};
