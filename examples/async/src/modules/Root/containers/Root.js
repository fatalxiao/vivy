/**
 * @file Root.js
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Vendors
import {renderRoutes} from 'react-router-config';

const Root = ({
    route, modelRootState
}) => (
    <>
        <div>Module Root</div>
        <div>{modelRootState}</div>
        <div>{renderRoutes(route.routes)}</div>
    </>
);

Root.propTypes = {
    route: PropTypes.object,
    modelRootState: PropTypes.string
};

export default connect(state => ({
    modelRootState: state.root
}))(Root);
