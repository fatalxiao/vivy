/**
 * @file Root.js
 */

import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-vivy';
import {bindModelActionCreators} from 'vivy';

// Components
import Pyramid from './Pyramid';
import Actions from './Actions';

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
            <Actions/>
            <Pyramid/>
        </div>
    );

};

Root.propTypes = {
    random: PropTypes.func
};

export default connect(null, dispatch => bindModelActionCreators({
    random: 'pyramid/random'
}, dispatch))(Root);
