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
import './Root.scss';

const Root = ({
    route,
    menu, activatedMenu
}) => (
    <div className="root">

        <div className="menu">
            <h2>Module Root</h2>
            <h3>Menu:</h3>
            <ul>
                {
                    menu?.map((item, index) =>
                        <li key={index}>
                            <NavLink className={item === activatedMenu ? 'activated' : null}
                                     to={item?.route}>
                                {item?.name}
                            </NavLink>
                        </li>
                    )
                }
            </ul>
        </div>

        <div className="content">
            {renderRoutes(route.routes)}
        </div>

    </div>
);

Root.propTypes = {

    route: PropTypes.object,

    menu: PropTypes.array,
    activatedMenu: PropTypes.object

};

export default connect(state => ({

    // Get menu config from root model
    menu: state.root.menu,

    // Get activated menu from root model
    activatedMenu: state.root.activatedMenu

}))(Root);
