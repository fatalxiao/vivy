/**
 * @file UserList.js
 */

import React, {useState, useCallback, useEffect} from 'react';
import {useModel} from 'react-vivy';

const UserList = () => {

    /**
     * Get state and reducer from model using hook "useModel".
     */
    const [{data, getUserListActionType}, {getUserList}] = useModel('userList');

    /**
     * Search text state
     */
    const [searchText, setSearchText] = useState('');

    /**
     * Query user list by search text
     * @type {(function(): void)|*}
     */
    const handleGetUserList = useCallback(() => {
        getUserList?.({
            searchText
        });
    }, [
        searchText,
        getUserList
    ]);

    /**
     * Handle search text change
     * @type {(function(*): void)|*}
     */
    const handleChange = useCallback(e => {
        setSearchText(e.target.value);
        handleGetUserList();
    }, [
        handleGetUserList
    ]);

    /**
     * Query user list when init
     */
    useEffect(() => {
        handleGetUserList();
    }, [
        handleGetUserList
    ]);

    return (
        <div className="user-list">

            <div className="search">
                Search:&nbsp;
                <input value={searchText}
                       disabled={getUserListActionType === 'userList/getUserListRequest'}
                       onChange={handleChange}/>
            </div>

            <div className="result">
                {
                    getUserListActionType === 'userList/getUserListRequest' ?
                        'loading'
                        :
                        data?.length > 0 ?
                            <ul>
                                {
                                    data?.map((item, index) =>
                                        <li key={index}>
                                            {item}
                                        </li>
                                    )
                                }
                            </ul>
                            :
                            'No matched data'
                }
            </div>

        </div>
    );

};

export default UserList;
