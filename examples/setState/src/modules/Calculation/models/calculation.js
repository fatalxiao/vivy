/**
 * @file calculation.js
 */

export default {
    nameSpace: 'calculation',
    state: {
        leftValue: 1,
        middleValue: 1,
        rightValue: 1
    },
    reducers: {

        /**
         * Update left value
         * @param state
         * @param value
         * @returns {*&{leftValue}}
         */
        updateLeftValue: (state, {value}) => {
            return {
                ...state,
                leftValue: +value || 1
            };
        },

        /**
         * Update middle value
         * @param state
         * @param value
         * @returns {*&{middleValue}}
         */
        updateMiddleValueValue: (state, {value}) => {
            return {
                ...state,
                middleValue: +value || 1
            };
        },

        /**
         * Update right value
         * @param state
         * @param value
         * @returns {*&{rightValue}}
         */
        updateRightValue: (state, {value}) => {
            return {
                ...state,
                rightValue: +value || 1
            };
        }

    }
};