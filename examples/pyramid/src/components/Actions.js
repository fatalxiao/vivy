/**
 * @file Actions.js
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindModelActionCreators} from 'vivy';

// Styles
import './Actions.scss';

const Actions = ({
    random, check
}) => (
    <div className="actions">
        <button onClick={random}>
            Reset
        </button>
        <button onClick={check}>
            Check
        </button>
    </div>
);

Actions.propTypes = {
    random: PropTypes.func,
    check: PropTypes.func
};

export default connect(null, dispatch => bindModelActionCreators({
    random: 'pyramid/random',
    check: 'pyramid/check'
}, dispatch))(Actions);
