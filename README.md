[npm-image]: https://img.shields.io/npm/v/vivy.svg?style=flat-square

[npm-url]: https://npmjs.org/package/vivy

[license-image]: https://img.shields.io/npm/l/vivy.svg?style=flat-square

[redux-url]: https://github.com/reduxjs/redux

[vivy-url]: https://github.com/fatalxiao/vivy

[counter-example-url]: https://github.com/fatalxiao/vivy/tree/main/examples/counter

[calculation-example-url]: https://github.com/fatalxiao/vivy/tree/main/examples/calculation

[global-reducers-example-url]: https://github.com/fatalxiao/vivy/tree/main/examples/globalReducers

[request-api-example-url]: https://github.com/fatalxiao/vivy/tree/main/examples/requestApi

[pyramid-example-url]: https://github.com/fatalxiao/vivy/tree/main/examples/pyramid

[labor-analgesia-frontend-url]: https://github.com/fatalxiao/labor-analgesia-frontend

[connected-react-router-url]: https://github.com/supasate/connected-react-router

[react-redux-url]: https://github.com/reduxjs/react-redux

[react-vivy-url]: https://github.com/fatalxiao/react-vivy

[react-vivy-npm-image]: https://img.shields.io/npm/v/react-vivy.svg?style=flat-square

[react-vivy-npm-url]: https://npmjs.org/package/react-vivy

[router-plugin-url]: https://github.com/fatalxiao/vivy-router

[router-plugin-npm-image]: https://img.shields.io/npm/v/vivy-router.svg?style=flat-square

[router-plugin-npm-url]: https://npmjs.org/package/vivy-router

[async-component-plugin-url]: https://github.com/fatalxiao/vivy-async-component

[async-component-plugin-npm-image]: https://img.shields.io/npm/v/vivy-async-component.svg?style=flat-square

[async-component-plugin-npm-url]: https://npmjs.org/package/vivy-async-component

[api-plugin-url]: https://github.com/fatalxiao/vivy-api

[api-plugin-npm-image]: https://img.shields.io/npm/v/vivy-api.svg?style=flat-square

[api-plugin-npm-url]: https://npmjs.org/package/vivy-api

[subscription-plugin-url]: https://github.com/fatalxiao/vivy-subscription

[subscription-plugin-npm-image]: https://img.shields.io/npm/v/vivy-subscription.svg?style=flat-square

[subscription-plugin-npm-url]: https://npmjs.org/package/vivy-subscription

[i18n-plugin-url]: https://github.com/fatalxiao/vivy-i18n

[i18n-plugin-npm-image]: https://img.shields.io/npm/v/vivy-i18n.svg?style=flat-square

[i18n-plugin-npm-url]: https://npmjs.org/package/vivy-i18n

# Vivy

[![NPM Version][npm-image]][npm-url]
[![License][license-image]][npm-url]

Vivy is a JavaScript state container built on [redux][redux-url] that simplifies development by adopting a syntax
similar to Redux.

In Vivy, the `state`, `actions`, and `reducers` are combined into a single `Object` called the `model`. Both `actions`
and `reducers` within the `model` can be invoked using the `dispatch` function. Consequently, there's no need to define
specific `action types` in Vivy. Additionally, redundant `actions` become unnecessary as you can directly dispatch
`reducers`.

Vivy is designed with expandability in mind. You can easily handle routing using [vivy-router][router-plugin-url], and
effortlessly load components and models on-demand with [vivy-async-component][async-component-plugin-url].
The [vivy-api][api-plugin-url] facilitates API requests, while [vivy-subscription][subscription-plugin-url] allows you
to observe changes in history or other events and update the state by dispatching a reducer or action.
Furthermore, [vivy-i18n][i18n-plugin-url] assists you in implementing internationalization (i18n) functionality.

* [Installation](#installation)
* [Examples](#examples)
    * [Examples in repository](#examples-in-repository)
    * [Complete and real project example](#complete-and-real-project-example)
* [React bindings](#react-bindings)
* [Plugins](#plugins)
* [Documentation](#documentation)
    * [Basic usage](#basic-usage)
    * [Vivy model](#vivy-model)
    * [Vivy store dispatcher](#vivy-store-dispatcher)
    * [Use Vivy in Component](#use-vivy-in-component)
    * [Methods](#methods)

## Installation

Using `NPM`:

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
* [pyramid][pyramid-example-url]

### Complete and real project example

* [labor-analgesia-frontend][labor-analgesia-frontend-url]

## React bindings

| Plugin                              | Version                                                    | Description                                                                  |
|:------------------------------------|:-----------------------------------------------------------|:-----------------------------------------------------------------------------|
| [react&#x2011;vivy][react-vivy-url] | [![NPM Version][react-vivy-npm-image]][react-vivy-npm-url] | React bindings for [Vivy][vivy-url] based on [react-redux][react-redux-url]. |

## Plugins

| Plugin                                                           | Version                                                                            | Description                                                                                  |
|:-----------------------------------------------------------------|:-----------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------|
| [vivy&#x2011;router][router-plugin-url]                          | [![NPM Version][router-plugin-npm-image]][router-plugin-npm-url]                   | A router plugin based on [connected-react-router][connected-react-router-url].               |
| [vivy&#x2011;async&#x2011;component][async-component-plugin-url] | [![NPM Version][async-component-plugin-npm-image]][async-component-plugin-npm-url] | A plugin which loading async component and async Vivy model to easily split chunks by route. |
| [vivy&#x2011;api][api-plugin-url]                                | [![NPM Version][api-plugin-npm-image]][api-plugin-npm-url]                         | Handle `apis` in Vivy model to make api calling easier.                                      |
| [vivy&#x2011;subscription][subscription-plugin-url]              | [![NPM Version][subscription-plugin-npm-image]][subscription-plugin-npm-url]       | Handle `subscriptions` in Vivy model to watch `history` or something else.                   |
| [vivy&#x2011;i18n][i18n-plugin-url]                              | [![NPM Version][i18n-plugin-npm-image]][i18n-plugin-npm-url]                       | Handle `i18ns` in Vivy model to implement i18n.                                              |

## Documentation

### Basic usage

```js
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-vivy';

// Import Vivy
import Vivy from 'vivy';

// Import Vivy model
import yourVivyModel from 'path_to_your_vivy_model';

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
        //  store.dispatch({
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

### Vivy store dispatcher

In Vivy, you can use 4 ways to dispatch an action.

1. Use hook "useModel" from [react-vivy][react-vivy-url].

```js
import {useModel} from 'react-vivy';

const App = () => {

    // ...

    /**
     * Get state and actions/reducers from model using hook "useModel".
     */
    const [modelState, modelActions] = useModel('MODEL_OR_NAME_SPACE');

    /**
     * Call the action or reducer.
     */
    modelActions.someAction();

    // ...

};

export default App;
```

2. Use `store.dispatch` function.

```js
dispatch({
    type: 'MODEL_NAME_SPACE/ACTION_OR_REDUCER_NAME',
    OTHER_PROPS
});
```

3. Use `store.dispatch` chain function.

```js
dispatch.MODEL_NAME_SPACE.ACTION_OR_REDUCER_NAME({
    OTHER_PROPS
});
```

4. Use `bindModelActionCreators` to create an action dispatcher.

```js
import {bindModelActionCreators} from 'vivy';

const App = () => {

    // ...

    ACTION_OR_REDUCER_NAME({
        OTHER_PROPS
    });

    // ...

}

export default connect(state => ({
    // states
}), dispatch => bindModelActionCreators({
    ACTION_OR_REDUCER_NAME: 'MODEL_NAME_SPACE/ACTION_OR_REDUCER_NAME'
}, dispatch))(App);
```

### Use Vivy in Component

```js
import React from 'react';
import {useModel} from 'react-vivy';

const App = () => {

    /**
     * Get state and actions/reducers from model using hook "useModel".
     */
    const [{value}, {updateValue}] = useModel('MODEL_OR_NAME_SPACE');

    return (
        <input value={value}
               onChange={e => updateValue({
                   value: e.target.value
               })}/>
    );

};

export default App;
```

For more hooks usage documents, please check [react-vivy][react-vivy-url].

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
import {connect} from 'react-vivy';
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
