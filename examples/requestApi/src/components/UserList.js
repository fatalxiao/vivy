/**
 * @file UserList.js
 */

import React, {useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-vivy';

// Styles
import './UserList.scss';

const UserList = ({
    data, getUserListActionType,
    dispatch
}) => {

    /**
     * Search text state
     */
    const [searchText, setSearchText] = useState('');

    /**
     * Query user list by search text
     * @type {(function(): void)|*}
     */
    const getUserList = useCallback(() => {
        dispatch?.({
            type: 'userList/getUserList',
            searchText
        });
    }, [
        searchText,
        dispatch
    ]);

    /**
     * Handle search text change
     * @type {(function(*): void)|*}
     */
    const handleChange = useCallback(e => {
        setSearchText(e.target.value);
        getUserList();
    }, [
        getUserList
    ]);

    /**
     * Query user list when init
     */
    useEffect(() => {
        getUserList();
    }, [
        getUserList
    ]);

    return (
        <div className="user-list">

            <div className="search">
                Search:
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

UserList.propTypes = {

    data: PropTypes.array,
    getUserListActionType: PropTypes.string,

    dispatch: PropTypes.func

};

export default connect(state => ({
    data: state.userList.data,
    getUserListActionType: state.userList.getUserListActionType
}))(UserList);
