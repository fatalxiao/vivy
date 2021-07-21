/**
 * @file index.js
 */

import React from 'react';
import {render} from 'react-dom';
import {createBrowserHistory} from 'history';
import {Provider} from 'react-redux';

// Import Vivy
import Vivy, {registerModel} from '../../../src';

// Sync component and model
import Counter from './modules/Counter/containers/Counter';
import counterModel from './modules/Counter/models/counter';

// Create browser history
const history = createBrowserHistory();

// Create vivy
const vivy = Vivy(history);

// Create store after configuration
const store = vivy.createStore();

// Register model to store
registerModel(store, counterModel);

render(
    <Provider store={store}>
        <Counter/>
    </Provider>,
    document.getElementById('app-container')
);
