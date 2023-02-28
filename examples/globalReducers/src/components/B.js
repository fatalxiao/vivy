/**
 * @file B.js
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-vivy';

const B = ({
    value
}) => (
    <div>
        <h2>
            Module B
        </h2>
        <h3>
            {value}
        </h3>
    </div>
);

B.propTypes = {
    value: PropTypes.string
};

export default connect(state => ({
    value: state.b
}))(B);
