/**
 * @file Root.js
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Component
import {NavLink} from 'react-router-dom';

// Vendors
import {renderRoutes} from 'react-router-config';

// Styles
import './Counter.scss';

const Counter = ({
    route, menu
}) => (
    <div className="root">

        <div className="menu">
            <h2>Module Root</h2>
            <ul>
                {
                    menu.map((item, index) =>
                        <NavLink key={index}
                                 to={item.route}>
                            <li>
                                {item.name}
                            </li>
                        </NavLink>
                    )
                }
            </ul>
        </div>

        <div className="content">
            {renderRoutes(route.routes)}
        </div>

    </div>
);

Counter.propTypes = {
    route: PropTypes.object,
    menu: PropTypes.array
};

export default connect(state => ({
    menu: state.root
}))(Counter);
