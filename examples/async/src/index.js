/**
 * @file index.js
 */

import React from 'react';
import {render} from 'react-dom';
import {createHashHistory} from 'history';
import {renderRoutes} from 'react-router-config';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {configureRoutes} from './routes';

// import Vivy
import Vivy from 'vivy';

// prepare vivy store
const history = createHashHistory();
const vivy = Vivy(history);
const store = vivy.createStore();

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            {renderRoutes(configureRoutes(store))}
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app-container')
);
