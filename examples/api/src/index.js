/**
 * @file index.js
 */

import React from 'react';
import {render} from 'react-dom';
import {createBrowserHistory} from 'history';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';

// import Vivy
import Vivy, {registerModel} from '../../../src';

import RequestApi from './modules/RequestApi/containers/RequestApi';
import requestApiModel from './modules/RequestApi/models/requestApi';

// prepare vivy store
const history = createBrowserHistory();
const vivy = Vivy(history);
const store = vivy.createStore();

registerModel(store, requestApiModel);

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <RequestApi/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app-container')
);
