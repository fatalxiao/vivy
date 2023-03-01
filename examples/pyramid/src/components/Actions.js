/**
 * @file Actions.js
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-vivy';
import {bindModelActionCreators} from 'vivy';

const Actions = ({
    random, check
}) => (
    <>
        <button style={{
            marginRight: 16
        }}
                onClick={random}>
            Reset
        </button>
        <button onClick={check}>
            Check
        </button>
    </>
);

Actions.propTypes = {
    random: PropTypes.func,
    check: PropTypes.func
};

export default connect(null, dispatch => bindModelActionCreators({
    random: 'pyramid/random',
    check: 'pyramid/check'
}, dispatch))(Actions);
