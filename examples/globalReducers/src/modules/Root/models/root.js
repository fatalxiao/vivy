/**
 * @file root.js
 */

export default {
    nameSpace: 'root',
    state: 'Init text.',
    globalReducers: {
        sync: (state, {value}) => {
            return value;
        }
    },
    reducers: {
        update: (state, {value}) => {
            return value;
        }
    }
};
