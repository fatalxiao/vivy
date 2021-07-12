/**
 * @file UserList.js
 */

import React, {useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Statics
import {ApiStatus} from '../../../../../../plugins/vivy-api';

// Styles
import './UserList.scss';

const UserList = ({
    data, message, getUserListStatus,
    dispatch
}) => {

    /**
     * search text
     */
    const [searchText, setSearchText] = useState('');

    /**
     * query user list by search text
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
     * handle search text change
     * @type {(function(*): void)|*}
     */
    const handleChange = useCallback(e => {
        setSearchText(e.target.value);
        getUserList();
    }, [
        getUserList
    ]);

    /**
     * query user list when init
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
                       onChange={handleChange}/>
                {message}
            </div>

            {
                getUserListStatus === ApiStatus.REQUEST ?
                    'loading'
                    :
                    <ul>
                        {
                            data?.map((item, index) =>
                                <li key={index}>
                                    {item}
                                </li>
                            )
                        }
                    </ul>
            }

        </div>
    );

};

UserList.propTypes = {

    data: PropTypes.array,
    message: PropTypes.string,
    getUserListStatus: PropTypes.string,

    dispatch: PropTypes.func

};

export default connect(state => ({
    data: state.userList.data,
    message: state.userList.message,
    getUserListStatus: state.apiStatus.userList?.getUserList
}))(UserList);
