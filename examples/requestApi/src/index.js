/**
 * @file index.js
 */

import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-vivy';

// Import Vivy
import Vivy from 'vivy';

// Sync component and model
import UserList from './components/UserList';
import userListModel from './models/userList';

// Create vivy
const vivy = Vivy();

// Create store after configuration
const store = vivy.createStore();

// Register model to store
store.registerModel(userListModel);

createRoot(document.getElementById('app-container')).render(
    <Provider store={store}>
        <UserList/>
    </Provider>
);
