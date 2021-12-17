[npm-image]: https://img.shields.io/npm/v/vivy.svg?style=flat-square

[npm-url]: https://npmjs.org/package/vivy

[license-image]: https://img.shields.io/npm/l/vivy.svg?style=flat-square

[redux-url]: https://github.com/reduxjs/redux

[counter-example-url]: https://github.com/fatalxiao/vivy/tree/main/examples/counter

[calculation-example-url]: https://github.com/fatalxiao/vivy/tree/main/examples/calculation

[global-reducers-example-url]: https://github.com/fatalxiao/vivy/tree/main/examples/globalReducers

[request-api-example-url]: https://github.com/fatalxiao/vivy/tree/main/examples/requestApi

[pieb-with-dpe-frontend-url]: https://github.com/fatalxiao/pieb-with-dpe-frontend

[router-plugin-url]: https://github.com/fatalxiao/vivy-router

[async-component-plugin-url]: https://github.com/fatalxiao/vivy-async-component

[api-plugin-url]: https://github.com/fatalxiao/vivy-api

[subscription-plugin-url]: https://github.com/fatalxiao/vivy-subscription

[i18n-plugin-url]: https://github.com/fatalxiao/vivy-i18n

# Vivy

[![NPM Version][npm-image]][npm-url]
[![License][license-image]][npm-url]

Vivy is a state container for JavaScript apps based on [redux][redux-url]. You can get started easily as syntax is
designed closing to Redux.

In Vivy, state, actions and reducers are combined in one object called `model`. Actions and reducers in model all can be
called by `dispatch`. So `action type` is no need to be defined in Vivy. Also, redundant actions are unnecessary as you
can dispatch reducers directly.

Vivy is designed with high expansibility. You can easily route by using [vivy-router][router-plugin-url], and lazy load
components and models by [vivy-async-component][async-component-plugin-url]. [vivy-api][api-plugin-url] can help to
request apis. [vivy-subscription][subscription-plugin-url] can easily watch history or something else to update state by
dispatching a reducer or action. [vivy-i18n][i18n-plugin-url] help you implement i18n.

* [Installation](#installation)
* [Examples](#examples)
    * [Examples in repository](#examples-in-repository)
    * [Complete and real project example](#complete-and-real-project-example)
* [Plugins](#plugins)
* [Documentation](#documentation)
    * [Basic usage](#basic-usage)
    * [Vivy model](#vivy-model)
    * [Use Vivy in Component](#use-vivy-in-component)
    * [Methods](#methods)

## Installation

Using npm:

```shell
$ npm install vivy
```

## Examples

### Examples in repository

```shell
$ cd ./examples/[EXAMPLE_NAME]
$ npm run start
```

**Example names**:

* [counter][counter-example-url]
* [calculation][calculation-example-url]
* [globalReducers][global-reducers-example-url]
* [requestApi][request-api-example-url]

### Complete and real project example

* [pieb-with-dpe-frontend][pieb-with-dpe-frontend-url]

## Plugins

| Name                                               | Description                                                                                                            |
|:---------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------|
| [vivy-router][router-plugin-url]                   | A router plugin based on `connected-react-router`.                                                                     |
| [vivy-async-component][async-component-plugin-url] | A plugin which loading async component and async Vivy model to easily split chunks according to `react-router` config. |
| [vivy-api][api-plugin-url]                         | Handle `apis` in Vivy model to make api calling easier.                                                                |
| [vivy-subscription][subscription-plugin-url]       | Handle `subscriptions` in Vivy model to watch `history` or something else.                                             |
| [vivy-i18n][i18n-plugin-url]                       | Handle `i18ns` in Vivy model to implement i18n.                                                                        |

## Documentation

### Basic usage

```js
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

// Import Vivy
import Vivy from 'vivy';

// Import Vivy model
import yourVivyModel from './path_to_your_vivy_model';

// Create Vivy instance
const vivy = Vivy();

// Get Vivy Store
const store = vivy.createStore();

// Register  Vivy model
store.registerModel(yourVivyModel);

// Render
render(
    <Provider store={store}>
        <Root/>
    </Provider>,
    document.getElementById('app-container')
);
```

### Vivy model

A Vivy model is an `Object` combined `state`, `actions`, `globalReducers` and `reducers`.

```js
const yourVivyModel = {

    // An unique key registered to store.
    nameSpace: 'yourVivyModel',

    // Any type of redux state value.
    state: STATE_VALUE,

    // Vivy model action.
    actions: {

        // Define a model action. Payload here is an object passing by dispatch
        ACTION_NAME: payload => (dispatch, getState) => {

            // Get state value by getState.
            const state = getState();
            const STATE_VALUE = state.MODEL_NAME_SPACE

            // Dispatch an action
            dispatch({
                type: 'MODEL_NAME_SPACE/OTHER_ACTION_NAME',
                // payload ...
            });

            // Dispatch a global reducer.
            dispatch({
                type: 'GLOBAL_REDUCER_NAME',
                // payload ...
            });

            // Dispatch a reducer
            dispatch({
                type: 'MODEL_NAME_SPACE/REDUCER_NAME',
                // payload ...
            });

        },

        // Register another model action.
        OTHER_ACTION_NAME: payload => (dispatch, getState) => {
            // dispatch some actions or reducers.
        }

        // Other actions ...

    },

    // Vivy model global reducer.
    globalReducers: {

        // Register a global reducer.
        // The reducer will be registered to global without current model namespace.
        // 
        // Example:
        //  dispatch({
        //      type: 'GLOBAL_REDUCER_NAME',
        //      // payloads ...
        //  });
        GLOBAL_REDUCER_NAME: (state, payload) => {
            return {
                ...state,
                // Do something by payload.
            };
        },

        // Other global reducers ...

    },

    // Vivy model reducer.
    reducers: {

        // Register a reducer.
        //
        // Example:
        //  dispatch({
        //      type: 'MODEL_NAME_SPACE/GLOBAL_REDUCER_NAME',
        //      // payloads ...
        //  });
        REDUCER_NAME: (state, payload) => {
            return {
                ...state,
                // Do something by payload.
            };
        },

        // Other reducers ...

    }

}
```

### Use Vivy in Component

```js
import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindModelActionCreators} from 'vivy';

const App = ({
    value, updateValue
}) => {

    /**
     * Update value to state.
     */
    const handleChange = useCallback(e => {
        updateValue({
            value: e.target.value
        })
    }, [
        updateValue
    ]);

    return (
        <input value={value}
               onChange={handleChange}/>
    );

}

App.propTypes = {
    value: PropTypes.string,
    updateValue: PropTypes.func
};

export default connect(state => ({
    value: state.yourVivyModel.value // Get value from state.
}), dispatch => bindModelActionCreators({
    updateValue: 'yourVivyModel/updateValue' // Define action or reducer.
}, dispatch))(App);
```

### Methods

#### registerReducer

`registerReducer(vivyStore, nameSpace, reducer)`

Example:

```js
import {registerReducer} from 'vivy';

// Register a Redux reudcer to your Vivy store
registerReducer(YOUR_VIVY_STORE, YOUR_REDUCER_NAME_SAPCE, YOUR_REDUX_REDUCER);
```

#### registerReducers

`registerReducers(vivyStore, reducers)`

Example:

```js
import {registerReducers} from 'vivy';

// Register Redux reudcers to your Vivy store
registerReducers(YOUR_VIVY_STORE, {
    YOUR_REDUCER_NAME_SAPCE_1: YOUR_REDUX_REDUCER_1,
    YOUR_REDUCER_NAME_SAPCE_2: YOUR_REDUX_REDUCER_2,
    // other reducers...
});
```

#### registerModel

`registerModel(vivyStore, model)`

Example:

```js
import {registerModel} from 'vivy';

// Register a Vivy model to your Vivy store
registerModel(YOUR_VIVY_STORE, YOUR_VIVY_MODEL);
```

#### registerModels

`registerModels(vivyStore, models)`

Example:

```js
import {registerModels} from 'vivy';

// Register Vivy models to your Vivy store
registerModels(YOUR_VIVY_STORE, [
    YOUR_VIVY_MODEL_1,
    YOUR_VIVY_MODEL_2,
    // other models...
]);
```

#### unregisterReducer

`unregisterReducer(vivyStore, nameSpace)`

Example:

```js
import {unregisterReducer} from 'vivy';

// Unregister a Redux reducer from your Vivy store
unregisterReducer(YOUR_VIVY_STORE, YOUR_REDUCER_NAME_SAPCE);
```

#### unregisterReducers

`unregisterReducers(vivyStore, nameSpaces)`

Example:

```js
import {unregisterReducers} from 'vivy';

// Unregister Redux reducers from your Vivy store
unregisterReducers(YOUR_VIVY_STORE, [
    YOUR_REDUCER_NAME_SAPCE_1,
    YOUR_REDUCER_NAME_SAPCE_2,
    // other reducers name space...
]);
```

#### unregisterModel

`unregisterModel(vivyStore, model)`

Example:

```js
import {unregisterModel} from 'vivy';

// Unregister a Vivy model from your Vivy store
unregisterModel(YOUR_VIVY_STORE, YOUR_VIVY_MODEL);
```

#### unregisterModels

`unregisterModels(vivyStore, models)`

Example:

```js
import {unregisterModels} from 'vivy';

// Unregister Vivy models from your Vivy store
unregisterModels(YOUR_VIVY_STORE, [
    YOUR_VIVY_MODEL_1,
    YOUR_VIVY_MODEL_2,
    // other models...
]);
```

#### bindModelActionCreators

`bindModelActionCreators(modelActionCreators, dispatch)`

Example:

```js
import React from 'react';
import {connect} from 'react-redux';
import {bindModelActionCreators} from 'vivy';

const App = ({
    MODEL_STATE, MODEL_ACTION
}) => (
    <div>App</div>
);

export default connect(state => ({
    MODEL_STATE: state.MODEL_NAMESPACE,
}), dispatch => bindModelActionCreators({
    MODEL_ACTION: 'MODEL_NAMESPACE/MODEL_ACTION_KEY',
}, dispatch))(App);
```
