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
        <h1>
            Module B
        </h1>
        <div>
            {value}
        </div>
    </div>
);

B.propTypes = {
    value: PropTypes.string
};

export default connect(state => ({
    value: state.b
}))(B);
