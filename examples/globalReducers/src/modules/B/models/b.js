/**
 * @file b.js
 */

export default {
    nameSpace: 'b',
    state: 'Module B init text.',
    globalReducers: {

        /**
         * sync state value
         * @param state
         * @param value
         * @returns {*}
         */
        sync: (state, {value}) => {
            return value;
        }

    }
};
