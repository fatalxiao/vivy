/**
 * @file B.js
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Vendors
import {renderRoutes} from 'react-router-config';

const B = ({
    route, modelBState
}) => (
    <>
        <h2>Module B</h2>
        <div>{modelBState}</div>
        <div>{renderRoutes(route.routes)}</div>
    </>
);

B.propTypes = {
    route: PropTypes.object,
    modelBState: PropTypes.string
};

export default connect(state => ({
    modelBState: state.b
}))(B);
