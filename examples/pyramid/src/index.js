/**
 * @file index.js
 */

import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-vivy';

// Import Vivy
import Vivy from 'vivy';

// Component and model
import Root from './components/Root';
import pyramidModel from './models/pyramidModel';

// Create vivy
const vivy = Vivy();

// Create store after configuration
const store = vivy.createStore();

// Register model to store
store.registerModel(pyramidModel);

createRoot(document.getElementById('app-container')).render(
    <Provider store={store}>
        <Root/>
    </Provider>
);
