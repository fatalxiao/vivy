/**
 * @file rootModel.js
 */

export default {
    nameSpace: 'root',
    state: 'Init text.',
    reducers: {

        /**
         * update state value
         * @param state
         * @param value
         * @returns {*}
         */
        update: (state, {value}) => {
            return value;
        }

    }
};
