/**
 * @file index.js
 */

import React from 'react';
import {render} from 'react-dom';
import {createBrowserHistory} from 'history';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';

// import Vivy
import Vivy, {registerModel} from '../../../src';

import UserList from './modules/UserList/containers/UserList';
import userListModel from './modules/UserList/models/userList';

// prepare vivy store
const history = createBrowserHistory();
const vivy = Vivy(history);
const store = vivy.createStore();

registerModel(store, userListModel);

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <UserList/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app-container')
);
