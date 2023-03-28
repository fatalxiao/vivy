/**
 * @file testModel.ts
 */

import {VivyModel} from 'src/types';

export default <VivyModel<number>>{
    nameSpace: 'testModel',
    state: 0,
    actions: {
        actionUpdateByFunctionalDispatch: ({value}) => dispatch => {
            dispatch({
                type: 'testModel/update',
                value
            });
        },
        actionUpdateByChainDispatch: ({value}) => dispatch => {
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
            return !isNaN(value) && value != null ?
                value
                :
                state;
        }
    }
};
