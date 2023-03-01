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
         * @returns {*&{value0}}
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
         * @returns {*&{value1}}
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
         * @returns {*&{value2}}
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
         * @returns {*&{value3}}
         */
        updateValue3: (state, {value}) => {
            return {
                ...state,
                value3: value
            };
        }

    }
};
