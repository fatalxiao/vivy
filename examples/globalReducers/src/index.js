/**
 * @file index.js
 */

import React from 'react';
import {render} from 'react-dom';
import {createBrowserHistory} from 'history';
import {Provider} from 'react-redux';

// Import Vivy
import Vivy, {registerModels} from '../../../src';

// Sync component and model
import Root from './modules/Root/containers/Root';
import rootModel from './modules/Root/models/root';
import aModel from './modules/A/models/a';
import bModel from './modules/B/models/b';
import cModel from './modules/C/models/c';

// Create browser history
const history = createBrowserHistory();

// Create vivy
const vivy = Vivy(history);

// Create store after configuration
const store = vivy.createStore();

// Register model to store
registerModels(store, [
    rootModel,
    aModel,
    bModel,
    cModel
]);

render(
    <Provider store={store}>
        <Root/>
    </Provider>,
    document.getElementById('app-container')
);
