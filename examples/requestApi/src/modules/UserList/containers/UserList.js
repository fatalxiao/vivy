/**
 * @file UserList.js
 */

import React, {useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Styles
import './UserList.scss';

const UserList = ({
    data, getUserListActionType,
    dispatch
}) => {

    const [searchText, setSearchText] = useState('');

    const getUserList = useCallback(() => {
        dispatch?.({
            type: 'userList/getUserList',
            searchText
        });
    }, [
        dispatch
    ]);

    const handleChange = useCallback(e => {
        setSearchText(e.target.value);
        getUserList();
    }, [
        getUserList
    ]);

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
            </div>

            {
                getUserListActionType === 'userList/getUserListRequest' ?
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
    getUserListActionType: PropTypes.string,

    dispatch: PropTypes.func

};

export default connect(state => ({
    data: state.userList.data,
    getUserListActionType: state.userList.getUserListActionType
}))(UserList);
