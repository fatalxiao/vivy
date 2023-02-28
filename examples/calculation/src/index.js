/**
 * @file index.js
 */

import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-vivy';

// Import Vivy
import Vivy from 'vivy';

// Component and model
import Calculation from './Calculation';
import calculationModel from './calculationModel';

// Create vivy
const vivy = Vivy();

// Create store after configuration
const store = vivy.createStore();

// Register model to store
store.registerModel(calculationModel);

createRoot(document.getElementById('app-container')).render(
    <Provider store={store}>
        <Calculation/>
    </Provider>
);
