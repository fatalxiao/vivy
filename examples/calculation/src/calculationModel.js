/**
 * @file calculationModel.js
 */

export default {
    nameSpace: 'calculation',
    state: {
        value0: 1,
        value1: 1,
        value2: 1,
        value3: 1,
        value4: 1
    },
    reducers: {

        /**
         * Update value0
         * @param state
         * @param value
         */
        updateValue0: (state, {value}) => {
            return {
                ...state,
                value0: value
            };
        },

        /**
         * Update value1
         * @param state
         * @param value
         */
        updateValue1: (state, {value}) => {
            return {
                ...state,
                value1: value
            };
        },

        /**
         * Update value2
         * @param state
         * @param value
         */
        updateValue2: (state, {value}) => {
            return {
                ...state,
                value2: value
            };
        },

        /**
         * Update value3
         * @param state
         * @param value
         */
        updateValue3: (state, {value}) => {
            return {
                ...state,
                value3: value
            };
        }

    }
};
