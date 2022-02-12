/**
 * @file pyramid.js
 */

export default {
    nameSpace: 'pyramid',
    state: {

        count: 4,

        data: [],

        errors: []

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
                data,
                errors: []
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

            const {data, errors} = state;

            const nextData = [...data];
            nextData[rowIndex] = [...nextData[rowIndex]];
            nextData[rowIndex][colIndex] = value;

            const nextErrors = [...errors];
            const index = nextErrors.findIndex(item =>
                item.rowIndex === rowIndex && item.colIndex === colIndex
            );
            if (index !== -1) {
                nextErrors.splice(index, 1);
            }

            return {
                ...state,
                data: nextData,
                errors: nextErrors
            };

        },

        /**
         * Check result
         * @param state
         * @returns {*&{errors: *[]}}
         */
        check: state => {

            const {count, data} = state;
            const errors = [];

            for (let i = count - 2; i >= 0; i--) {
                for (let j = 0; j <= i; j++) {
                    if (!data[i][j] || +data[i][j] !== +data[i + 1][j] + +data[i + 1][j + 1]) {
                        errors.push({
                            rowIndex: i,
                            colIndex: j
                        });
                    }
                }
            }

            return {
                ...state,
                errors
            };

        }

    }
};
