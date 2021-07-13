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

// Import Vivy
import Vivy from 'vivy';
import VivyAsyncComponent from 'vivy-async-component';

// Create browser history
const history = createBrowserHistory();

// Create vivy
const vivy = Vivy(history);

// Apply async component plugin
vivy.use(VivyAsyncComponent({
    // Customized AsyncComponentLoading model nameSpace
    modelNameSpace: 'customizedAsyncComponentLoading'
}));

// Create store after configuration
const store = vivy.createStore();

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            {renderRoutes(configureRoutes(store))}
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app-container')
);
