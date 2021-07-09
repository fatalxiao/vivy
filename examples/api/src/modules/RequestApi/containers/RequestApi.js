/**
 * @file RequestApi.js
 */

import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Styles
import './RequestApi.scss';

const RequestApi = ({
    data, getDataActionType,
    dispatch
}) => {

    return (
        <div>


        </div>
    );

};

RequestApi.propTypes = {

    data: PropTypes.array,
    getDataActionType: PropTypes.string,

    dispatch: PropTypes.func

};

export default connect(state => ({
    data: state.requestApi.data,
    getDataActionType: state.requestApi.getDataActionType
}))(RequestApi);
