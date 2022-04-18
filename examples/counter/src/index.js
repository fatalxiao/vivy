/**
 * @file index.js
 */

import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';

// Import Vivy
import Vivy from 'vivy';

// Component and model
import Counter from './modules/Counter/containers/Counter';
import counterModel from './modules/Counter/models/counter';

// Create vivy
const vivy = Vivy();

// Create store after configuration
const store = vivy.createStore();

// Register model to store
store.registerModel(counterModel);

createRoot(document.getElementById('app-container')).render(
    <Provider store={store}>
        <Counter/>
    </Provider>
);
