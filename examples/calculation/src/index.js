/**
 * @file index.js
 */

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

// Import Vivy
import Vivy from 'vivy';

// Component and model
import Calculation from './modules/Calculation/containers/Calculation';
import calculationModel from './modules/Calculation/models/calculation';

// Create vivy
const vivy = Vivy();

// Create store after configuration
const store = vivy.createStore();

// Register model to store
store.registerModel(calculationModel);

render(
    <Provider store={store}>
        <Calculation/>
    </Provider>,
    document.getElementById('app-container')
);
