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
import Root from './modules/Root/containers/Root';
import rootModel from './modules/Root/models/root';

// Prepare vivy store
const history = createBrowserHistory();

// Create vivy
const vivy = Vivy(history);

// Create store after configuration
const store = vivy.createStore();

// Register model to store
registerModel(store, rootModel);

render(
    <Provider store={store}>
        <Root/>
    </Provider>,
    document.getElementById('app-container')
);
