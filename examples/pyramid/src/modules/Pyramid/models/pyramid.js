/**
 * @file pyramid.js
 */

export default {
    nameSpace: 'pyramid',
    state: {

        count: 4,

        data: []

    },
    reducers: {

        /**
         * Init random data
         * @param state
         * @returns {*&{data: any[]}}
         */
        random: state => {

            const data = new Array(state.count);
            for (let i = 0; i < state.count; i++) {
                data[i] = new Array(i + 1).fill('');
            }
            for (let i = 0; i < state.count; i++) {
                data[state.count - 1][i] = Math.floor(Math.random() * 9 + 1);
            }

            return {
                ...state,
                data
            };

        },

        /**
         * Update value
         * @param state
         * @param rowIndex
         * @param colIndex
         * @param value
         * @returns {*&{data: *[]}}
         */
        update: (state, {rowIndex, colIndex, value}) => {

            const nextData = [...state.data];
            nextData[rowIndex] = [...nextData[rowIndex]];
            nextData[rowIndex][colIndex] = value;

            return {
                ...state,
                data: nextData
            };

        }

    }
};
