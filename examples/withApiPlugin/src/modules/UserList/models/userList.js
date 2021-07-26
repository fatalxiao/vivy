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
         * Customized api message
         */
        message: ''

    },
    apis: {

        /**
         * Call api to get user list
         * @param searchText
         * @returns {function(*, *): *}
         */
        getUserList: ({searchText}) => (dispatchApi, dispatch) => {

            dispatch({
                type: 'userList/updateMessage',
                message: ''
            });

            dispatchApi({
                api: getUserList,
                params: {
                    searchText
                },
                successCallback: response => {
                    dispatch({
                        type: 'userList/updateMessage',
                        message: 'Get user list successfully.'
                    });
                },
                failureCallback: response => {
                    dispatch({
                        type: 'userList/updateMessage',
                        message: 'Get user list failure.'
                    });
                }
            });

        }

    },
    reducers: {

        /**
         * Update customized api message
         * @param state
         * @param message
         * @returns {*&{message}}
         */
        updateMessage: (state, {message}) => {
            return {
                ...state,
                message
            };
        },

        /**
         * Handle getting user list successfully
         * @param state
         * @param responseData
         * @returns {*&{data: *[]}}
         */
        getUserListSuccess: (state, {responseData}) => {
            return {
                ...state,
                data: responseData || []
            };
        }

    }
};
