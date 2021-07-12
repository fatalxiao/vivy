/**
 * @file a.js
 */

export default {
    nameSpace: 'a',
    state: 'Module A init text.',
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
