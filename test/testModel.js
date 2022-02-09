/**
 * @file testModel.js
 */

export default {
    nameSpace: 'testModel',
    state: 0,
    reducers: {
        upgrade: state => {
            return state + 1;
        }
    }
};
