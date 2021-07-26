/**
 * @file Root.js
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Component
import {NavLink} from 'react-router-dom';
import PageLoading from 'alcedo-ui/PageLoading';

// Vendors
import {renderRoutes} from 'react-router-config';

// Styles
import './Root.scss';

const Root = ({
    route,
    menu, customizedAsyncComponentLoading
}) => (
    <div className="root">

        <PageLoading visible={customizedAsyncComponentLoading}
                     showStripes={false}/>

        <div className="menu">
            <h2>Module Root</h2>
            <h3>Menu:</h3>
            <ul>
                {
                    menu?.map((item, index) =>
                        <li key={index}>
                            <NavLink to={item?.route}>
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
    customizedAsyncComponentLoading: PropTypes.bool

};

export default connect(state => ({

    // Get menu config from root model
    menu: state.root.menu,

    // Get async component loading from customized name space model
    // ( default vivy-async-component model name space is "asyncComponentLoading" )
    customizedAsyncComponentLoading: state.customizedAsyncComponentLoading

}))(Root);
