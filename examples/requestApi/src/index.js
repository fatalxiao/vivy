/**
 * @file index.js
 */

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

// Import Vivy
import Vivy from 'vivy';

// Sync component and model
import UserList from './modules/UserList/containers/UserList';
import userListModel from './modules/UserList/models/userList';

// Create vivy
const vivy = Vivy();

// Create store after configuration
const store = vivy.createStore();

// Register model to store
store.registerModel(userListModel);

render(
    <Provider store={store}>
        <UserList/>
    </Provider>,
    document.getElementById('app-container')
);
