/**
 * @file Pyramid.js
 */

import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindModelActionCreators} from 'vivy';

// Components
import Pyramid from '../../Pyramid/containers/Pyramid';

// Styles
import './Root.scss';

const Root = ({
    data,
    random, update
}) => {

    useEffect(() => {
        random?.();
    }, [
        random
    ]);

    return (
        <div className="root">
            <Pyramid/>
        </div>
    );

};

Root.propTypes = {

    data: PropTypes.array,

    random: PropTypes.func,
    update: PropTypes.func

};

export default connect(state => ({
    data: state.pyramid.data
}), dispatch => bindModelActionCreators({
    random: 'pyramid/random',
    update: 'pyramid/update'
}, dispatch))(Root);
