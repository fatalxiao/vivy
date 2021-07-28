/**
 * @file index.js
 */

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

// Import Vivy
import Vivy from 'vivy';

// Sync component and model
import Root from './modules/Root/containers/Root';
import rootModel from './modules/Root/models/root';
import aModel from './modules/A/models/a';
import bModel from './modules/B/models/b';
import cModel from './modules/C/models/c';

// Create vivy
const vivy = Vivy();

// Create store after configuration
const store = vivy.createStore();

// Register model to store
store.registerModels([
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
