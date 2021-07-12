/**
 * @file apiStatus.js
 */

import ApiStatus from '../statics/ApiStatus';

export default {
    nameSpace: 'apiStatus',
    state: {},
    reducers: {

        request: (state, {nameSpace, apiActionName}) => {
            return {
                ...state,
                [nameSpace]: {
                    ...state.nameSpace,
                    [apiActionName]: ApiStatus.REQUEST
                }
            };
        },

        success: (state, {nameSpace, apiActionName}) => {
            return {
                ...state,
                [nameSpace]: {
                    ...state.nameSpace,
                    [apiActionName]: ApiStatus.SUCCESS
                }
            };
        },

        failure: (state, {nameSpace, apiActionName}) => {
            return {
                ...state,
                [nameSpace]: {
                    ...state.nameSpace,
                    [apiActionName]: ApiStatus.FAILURE
                }
            };
        }

    }
};
