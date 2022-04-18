/**
 * @file index.js
 */

import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';

// Import Vivy
import Vivy from 'vivy';

// Component and model
import Root from './modules/Pyramid/containers/Root';
import pyramidModel from './modules/Pyramid/models/pyramid';

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
