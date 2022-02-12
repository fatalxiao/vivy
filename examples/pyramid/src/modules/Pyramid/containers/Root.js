/**
 * @file Root.js
 */

import React from 'react';
import {connect} from 'react-redux';

// Components
import Pyramid from './Pyramid';
import Actions from './Actions';

// Styles
import './Root.scss';

const Root = () => (
    <div className="root">
        <Pyramid/>
        <Actions/>
    </div>
);

export default connect()(Root);
