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
        data: [],

        /**
         * action type for getting user list
         */
        getUserListActionType: ''

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
            }
        })

    },
    reducers: {

        getUserListRequest: state => {
            return {
                ...state,
                getUserListActionType: 'userList/getUserListRequest'
            };
        },
        getUserListSuccess: (state, {response}) => {
            return {
                ...state,
                getUserListActionType: 'userList/getUserListSuccess',
                data: response?.data || []
            };
        },
        getUserListFailure: state => {
            return {
                ...state,
                getUserListActionType: 'userList/getUserListFailure'
            };
        }

    }
};
