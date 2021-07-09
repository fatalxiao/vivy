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
    reducers: {}
};
