/**
 * @file index.js
 */

import React from 'react';
import {render} from 'react-dom';
import {createHashHistory} from 'history';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';

// import Vivy
import Vivy, {registerModel} from '../../../src';

import Counter from './modules/Counter/containers/Counter';
import counterModel from './modules/Counter/models/counter';

// prepare vivy store
const history = createHashHistory();
const vivy = Vivy(history);
const store = vivy.createStore();

registerModel(store, counterModel);

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Counter/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app-container')
);
