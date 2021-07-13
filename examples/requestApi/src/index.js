/**
 * @file index.js
 */

import React from 'react';
import {render} from 'react-dom';
import {createBrowserHistory} from 'history';
import {Provider} from 'react-redux';

// Import Vivy
import Vivy, {registerModel} from 'vivy';

// Sync component and model
import UserList from './modules/UserList/containers/UserList';
import userListModel from './modules/UserList/models/userList';

// Create browser history
const history = createBrowserHistory();

// Create vivy
const vivy = Vivy(history);

// Create store after configuration
const store = vivy.createStore();

// Register model to store
registerModel(store, userListModel);

render(
    <Provider store={store}>
        <UserList/>
    </Provider>,
    document.getElementById('app-container')
);
