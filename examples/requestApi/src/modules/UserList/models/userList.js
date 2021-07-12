/**
 * @file userList.js
 */

// Apis
import {getUserList} from '../apis/UserListApi';

export default {
    nameSpace: 'userList',
    state: {

        /**
         * User list data
         */
        data: [],

        /**
         * Action type for getting user list
         */
        getUserListActionType: ''

    },
    actions: {

        /**
         * Get user list by api
         * @returns {(function(*): Promise<void>)|*}
         */
        getUserList: ({searchText}) => async dispatch => {

            dispatch({
                type: 'userList/getUserListRequest'
            });

            const response = await getUserList({
                searchText
            });

            if (response.status === 200) {
                dispatch({
                    type: 'userList/getUserListSuccess',
                    response
                });
            } else {
                dispatch({
                    type: 'userList/getUserListFailure'
                });
            }

        }

    },
    reducers: {

        /**
         * Handle get user list request status
         * @param state
         * @returns {*&{getUserListActionType: string}}
         */
        getUserListRequest: state => {
            return {
                ...state,
                getUserListActionType: 'userList/getUserListRequest'
            };
        },

        /**
         * Handle get user list success status
         * @param state
         * @param response
         * @returns {*&{data: (*|*[]), getUserListActionType: string}}
         */
        getUserListSuccess: (state, {response}) => {
            return {
                ...state,
                getUserListActionType: 'userList/getUserListSuccess',
                data: response?.data || []
            };
        },

        /**
         * Handle get user list failure status
         * @param state
         * @returns {*&{data: *[], getUserListActionType: string}}
         */
        getUserListFailure: state => {
            return {
                ...state,
                getUserListActionType: 'userList/getUserListFailure',
                data: []
            };
        }

    }
};
