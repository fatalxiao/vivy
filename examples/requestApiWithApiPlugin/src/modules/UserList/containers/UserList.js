/**
 * @file UserList.js
 */

import React, {useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Statics
import {ApiStatus} from 'vivy-api';

// Styles
import './UserList.scss';

const UserList = ({
    data, message, getUserListStatus,
    dispatch
}) => {

    /**
     * Search text
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
                       onChange={handleChange}/>
                {message}
            </div>

            <div className="result">
                {
                    getUserListStatus === ApiStatus.REQUEST ?
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
    message: PropTypes.string,
    getUserListStatus: PropTypes.string,

    dispatch: PropTypes.func

};

export default connect(state => ({

    // get data from userList model
    data: state.userList.data,
    message: state.userList.message,

    // get "getUserList" api status from vivy-api model ( default model name space is "apiStatus" )
    getUserListStatus: state.customizedApiStatus.userList?.getUserList

}))(UserList);
