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
        <h2>
            Module A
        </h2>
        <h3>
            {value}
        </h3>
    </div>
);

A.propTypes = {
    value: PropTypes.string
};

export default connect(state => ({
    value: state.a
}))(A);
