/**
 * @file index.js
 */

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import axios from 'axios';

// Import Vivy
import Vivy, {registerModel} from 'vivy';
import VivyApi from 'vivy-api';

// Sync component and model
import UserList from './modules/UserList/containers/UserList';
import userListModel from './modules/UserList/models/userList';

// Create vivy
const vivy = Vivy();

// Apply api plugin
vivy.use(VivyApi({

    // Customized api status model name space ( default is "apiStatus" )
    apiStatusModelNameSpace: 'customizedApiStatus',

    // Customized check response status callback
    // to tell whether response is successful
    checkResponseStatus: response => response?.data?.code === 2000,

    // A middleware like callback to handle the success response
    successResponseHandler: ({dispatch, getState}) => next => action => {

        const {response, successCallback} = action;

        successCallback?.(response);

        next({
            ...action,
            responseData: response.data.data
        });

    },

    // A middleware like callback to handle the failure response
    failureResponseHandler: ({dispatch, getState}) => next => action => {

        const {response, error, failureCallback} = action;

        // Ignore cancelled request
        if (axios.isCancel(error)) {
            return;
        }

        failureCallback?.(response);

    }

}));

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
