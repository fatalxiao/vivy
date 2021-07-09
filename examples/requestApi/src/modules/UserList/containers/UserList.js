/**
 * @file UserList.js
 */

import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Styles
import './UserList.scss';

const UserList = ({
    data, getDataActionType,
    dispatch
}) => {

    return (
        <div>


        </div>
    );

};

UserList.propTypes = {

    data: PropTypes.array,
    getDataActionType: PropTypes.string,

    dispatch: PropTypes.func

};

export default connect(state => ({
    data: state.requestApi.data,
    getDataActionType: state.requestApi.getDataActionType
}))(UserList);
