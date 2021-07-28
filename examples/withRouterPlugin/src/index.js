/**
 * @file index.js
 */

import React from 'react';
import {render} from 'react-dom';
import {createBrowserHistory} from 'history';
import {renderRoutes} from 'react-router-config';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {configureRoutes} from './routes';

// Models
import root from './modules/Root/models/root';
import a from './modules/A/models/a';
import b from './modules/B/models/b';
import c from './modules/C/models/c';

// Import Vivy
import Vivy from 'vivy';
import VivyRouter from 'vivy-router';

// Create browser history
const history = createBrowserHistory();

// Create vivy
const vivy = Vivy();

// Apply router plugin
vivy.use(VivyRouter({
    history
}));

// Create store after configuration
const store = vivy.createStore();

// Register vivy models
store.registerModels([
    root,
    a,
    b,
    c
]);

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            {renderRoutes(configureRoutes())}
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app-container')
);
