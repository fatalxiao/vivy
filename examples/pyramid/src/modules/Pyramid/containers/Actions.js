/**
 * @file Actions.js
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Styles
import './Actions.scss';

const Actions = ({
    data
}) => {

    return (
        <div className="actions">

        </div>
    );

};

Actions.propTypes = {
    data: PropTypes.array
};

export default connect(state => ({
    data: state.pyramid.data
}))(Actions);
