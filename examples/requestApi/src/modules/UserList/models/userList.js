/**
 * @file requestApi.js
 */

import {getUserList} from '../apis/UserListApi';

export default {
    nameSpace: 'requestApi',
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
