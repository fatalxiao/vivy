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
            }
        })

    },
    reducers: {

        getUserListSuccess: (state, {response}) => {
            return {
                ...state,
                data: response?.data || []
            };
        }

    }
};
