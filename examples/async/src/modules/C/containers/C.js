/**
 * @file C.js
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Vendors
import {renderRoutes} from 'react-router-config';

const C = ({
    route, modelCState
}) => (
    <>
        <div>Component C</div>
        <div>{modelCState}</div>
        <div>{renderRoutes(route.routes)}</div>
    </>
);

C.propTypes = {
    route: PropTypes.object,
    modelCState: PropTypes.string
};

export default connect(state => ({
    modelCState: state.c
}))(C);
