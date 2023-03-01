/**
 * @file A.js
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-vivy';

const A = ({
    value
}) => (
    <div>
        <h1>
            Module A
        </h1>
        <div>
            {value}
        </div>
    </div>
);

A.propTypes = {
    value: PropTypes.string
};

export default connect(state => ({
    value: state.a
}))(A);
