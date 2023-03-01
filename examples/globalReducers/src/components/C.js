/**
 * @file C.js
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-vivy';

const C = ({
    value
}) => (
    <div>
        <h1>
            Module C
        </h1>
        <div>
            {value}
        </div>
    </div>
);

C.propTypes = {
    value: PropTypes.string
};

export default connect(state => ({
    value: state.c
}))(C);
