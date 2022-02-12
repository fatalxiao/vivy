/**
 * @file index.js
 */

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

// Import Vivy
import Vivy from 'vivy';

// Component and model
import Pyramid from './modules/Pyramid/containers/Pyramid';
import pyramidModel from './modules/Pyramid/models/pyramid';

// Create vivy
const vivy = Vivy();

// Create store after configuration
const store = vivy.createStore();

// Register model to store
store.registerModel(pyramidModel);

render(
    <Provider store={store}>
        <Pyramid/>
    </Provider>,
    document.getElementById('app-container')
);
