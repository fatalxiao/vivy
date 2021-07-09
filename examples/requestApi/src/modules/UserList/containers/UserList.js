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

    const getUserList = useCallback(() => {
        dispatch?.({
            type: 'userList/getUserList'
        });
    }, [
        dispatch
    ]);

    useEffect(() => {
        getUserList();
    }, [
        getUserList
    ]);

    return (
        <div>

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
