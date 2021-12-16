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

## What is Vivy?

Vivy is a state container based on [redux][redux-url].

## Installation

Using npm:

```shell
$ npm install vivy
```

## Examples

### Run examples in repository.

```shell
$ npm run example:[EXAMPLE_NAME]
```

**Example names**:

* [counter][counter-example-url]
* [calculation][calculation-example-url]
* [globalReducers][global-reducers-example-url]
* [requestApi][request-api-example-url]

### A complete and real project example:

* [pieb-with-dpe-frontend][pieb-with-dpe-frontend-url]

## Documentation

### Basic usage

```js
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

// Import Vivy
import Vivy from 'vivy';

// Create Vivy instance
const vivy = Vivy();

// Get Vivy Store
const store = vivy.createStore();

// Register  Vivy model
store.registerModel(VIVY_MODEL);

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
const EXAMPLE_MODEL = {

    // An unique key registered to store.
    nameSpace: 'MODEL_NAME_SPACE',

    // Any type of value.
    state: STATE_VALUE,

    // Vivy model actions just like redux actions.
    actions: {

        // Register a model action.
        ACTION_NAME: payload => (dispatch, getState) => {

            // Get state value by getState.
            const state = getState();
            const STATE_VALUE = state.MODEL_NAME_SPACE

            // Dispatch an action
            dispatch({
                type: 'MODEL_NAME_SPACE/OTHER_ACTION_NAME',
                // payloads ...
            });

            // Dispatch a global reducer.
            dispatch({
                type: 'GLOBAL_REDUCER_NAME',
                // payloads ...
            });

            // Dispatch a reducer
            dispatch({
                type: 'MODEL_NAME_SPACE/REDUCER_NAME',
                // payloads ...
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

    reducers: {

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

### Methods

#### registerReducer

`registerReducer(vivyStore, nameSpace, reducer)`

```js
import {registerReducer} from 'vivy';

// Register a Redux reudcer to your Vivy store
registerReducer(YOUR_VIVY_STORE, YOUR_REDUCER_NAME_SAPCE, YOUR_REDUX_REDUCER);
```

#### registerReducers

`registerReducers(vivyStore, reducers)`

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

```js
import {registerModel} from 'vivy';

// Register a Vivy model to your Vivy store
registerModel(YOUR_VIVY_STORE, YOUR_VIVY_MODEL);
```

#### registerModels

`registerModels(vivyStore, models)`

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

```js
import {unregisterReducer} from 'vivy';

// Unregister a Redux reducer from your Vivy store
unregisterReducer(YOUR_VIVY_STORE, YOUR_REDUCER_NAME_SAPCE);
```

#### unregisterReducers

`unregisterReducers(vivyStore, nameSpaces)`

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

```js
import {unregisterModel} from 'vivy';

// Unregister a Vivy model from your Vivy store
unregisterModel(YOUR_VIVY_STORE, YOUR_VIVY_MODEL);
```

#### unregisterModels

`unregisterModels(vivyStore, models)`

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

```js
import {connect} from 'react-redux';
import {bindModelActionCreators} from 'vivy';

const App = ({
    MODEL_STATE, MODEL_ACTION
}) => <div>App</div>

export default connect(state => ({
    MODEL_STATE: state.MODEL_NAMESPACE,
}), dispatch => bindModelActionCreators({
    MODEL_ACTION: 'MODEL_NAMESPACE/MODEL_ACTION_KEY',
}, dispatch))(App);
```

## Plugins

| Name                                               | Description                                                                |
|:---------------------------------------------------|:---------------------------------------------------------------------------|
| [vivy-router][router-plugin-url]                   | A router plugin based on `connected-react-router`                          |
| [vivy-async-component][async-component-plugin-url] | Load an async component when using `react-router`                          |
| [vivy-api][api-plugin-url]                         | Handle `apis` in Vivy model to make api calling easier.                    |
| [vivy-subscription][subscription-plugin-url]       | Handle `subscriptions` in Vivy model to watch `history` or something else. |
| [vivy-i18n][i18n-plugin-url]                       | Handle `i18ns` in Vivy model to implement i18n.                            |
