/**
 * @file A.js
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Vendors
import {renderRoutes} from 'react-router-config';

const A = ({
    route, modelAState
}) => (
    <>
        <h2>Module A</h2>
        <div>{modelAState}</div>
        <div>{renderRoutes(route.routes)}</div>
    </>
);

A.propTypes = {
    route: PropTypes.object,
    modelAState: PropTypes.string
};

export default connect(state => ({
    modelAState: state.a
}))(A);
