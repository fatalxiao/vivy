/**
 * @file testModel.js
 */

export default {
    nameSpace: 'testModel',
    state: 0,
    actions: {
        actionUpdateByFunctionalDispatch: ({value}) => (dispatch, getState) => {
            dispatch({
                type: 'testModel/update',
                value
            });
        },
        actionUpdateByChainDispatch: ({value}) => (dispatch, getState) => {
            dispatch.testModel.update({
                value
            });
        }
    },
    globalReducers: {
        globalUpdate: (state, {value}) => {
            return value;
        }
    },
    reducers: {
        update: (state, {value}) => {
            return value;
        }
    }
};
