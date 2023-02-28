/**
 * @file cModel.js
 */

export default {
    nameSpace: 'c',
    state: 'Module C init text.',
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
