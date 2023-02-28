/**
 * @file index.js
 */

import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-vivy';

// Import Vivy
import Vivy from 'vivy';

// Sync component and model
import Root from './components/Root';
import rootModel from './models/rootModel';
import aModel from './models/aModel';
import bModel from './models/bModel';
import cModel from './models/cModel';

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

createRoot(document.getElementById('app-container')).render(
    <Provider store={store}>
        <Root/>
    </Provider>
);
