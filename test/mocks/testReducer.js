/**
 * @file testReducer.js
 */

export default (state = 0, action) => {
    switch (action.type) {

        case 'UPGRADE': {
            return state + 1;
        }

        default:
            return state;

    }
};
