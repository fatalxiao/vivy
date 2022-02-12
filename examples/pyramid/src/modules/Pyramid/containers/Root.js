/**
 * @file Root.js
 */

import React, {useEffect} from 'react';
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

export default connect(null, dispatch => bindModelActionCreators({
    random: 'pyramid/random'
}, dispatch))(Root);
