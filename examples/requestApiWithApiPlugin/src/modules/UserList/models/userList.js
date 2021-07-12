/**
 * @file userList.js
 */

// Apis
import {getUserList} from '../apis/UserListApi';

export default {
    nameSpace: 'userList',
    state: {

        /**
         * user list data
         */
        data: []

    },
    apis: {

        /**
         * call api to get user list
         * @param searchText
         * @returns {function(*): *}
         */
        getUserList: ({searchText}) => dispatchApi => dispatchApi({
            api: getUserList,
            params: {
                searchText
            },
            successCallback: response => {
                console.log('Get user list successfully.');
            },
            failureCallback: response => {
                console.log('Get user list failure.');
            }
        })

    },
    reducers: {

        getUserListSuccess: (state, {responseData}) => {
            return {
                ...state,
                data: responseData || []
            };
        }

    }
};
