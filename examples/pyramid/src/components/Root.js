/**
 * @file Root.js
 */

import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindModelActionCreators} from 'vivy';

// Components
import Pyramid from './Pyramid';
import Actions from './Actions';

// Styles
import './Root.scss';

const Root = ({
    random
}) => {

    /**
     * Init value
     */
    useEffect(() => {
        random?.();
    }, [
        random
    ]);

    return (
        <div className="root">
            <Pyramid/>
            <Actions/>
        </div>
    );

};

Root.propTypes = {
    random: PropTypes.func
};

export default connect(null, dispatch => bindModelActionCreators({
    random: 'pyramid/random'
}, dispatch))(Root);
