/**
 * @file userList.js
 */

import {getUserList} from '../apis/UserListApi';

export default {
    nameSpace: 'userList',
    state: {
        data: [],
        getUserListActionType: ''
    },
    apis: {

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
        getUserListSuccess: (state, {responseData}) => {
            return {
                ...state,
                getUserListActionType: 'userList/getUserListSuccess',
                data: responseData?.data || []
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
