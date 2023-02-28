/**
 * @file C.js
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const C = ({
    value
}) => (
    <div>
        <h2>
            Module C
        </h2>
        <h3>
            {value}
        </h3>
    </div>
);

C.propTypes = {
    value: PropTypes.string
};

export default connect(state => ({
    value: state.c
}))(C);
