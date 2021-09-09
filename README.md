[npm-image]: https://img.shields.io/npm/v/vivy.svg?style=flat-square

[npm-url]: https://npmjs.org/package/vivy

[license-image]: https://img.shields.io/npm/l/vivy.svg?style=flat-square

[redux-url]: https://github.com/reduxjs/redux

[example-counter-url]: https://github.com/fatalxiao/vivy/tree/main/examples/counter

[example-globalReducers-url]: https://github.com/fatalxiao/vivy/tree/main/examples/globalReducers

[example-requestApi-url]: https://github.com/fatalxiao/vivy/tree/main/examples/requestApi

[example-withApiPlugin-url]: https://github.com/fatalxiao/vivy/tree/main/examples/withApiPlugin

[example-withRouterPlugin-url]: https://github.com/fatalxiao/vivy/tree/main/examples/withRouterPlugin

[example-withAsyncComponentPlugin-url]: https://github.com/fatalxiao/vivy/tree/main/examples/withAsyncComponentPlugin

[example-withSubscriptionPlugin-url]: https://github.com/fatalxiao/vivy/tree/main/examples/withSubscriptionPlugin

[pieb-with-dpe-frontend-url]: https://github.com/fatalxiao/pieb-with-dpe-frontend

[ApiPlugin-url]: https://github.com/fatalxiao/vivy-api

[RouterPlugin-url]: https://github.com/fatalxiao/vivy-router

[AsyncComponentPlugin-url]: https://github.com/fatalxiao/vivy-async-component

[SubscriptionPlugin-url]: https://github.com/fatalxiao/vivy-subscription

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

* [counter][example-counter-url]
* [globalReducers][example-globalReducers-url]
* [requestApi][example-requestApi-url]
* [withApiPlugin][example-withApiPlugin-url]
* [withRouterPlugin][example-withRouterPlugin-url]
* [withAsyncComponentPlugin][example-withAsyncComponentPlugin-url]
* [withSubscriptionPlugin][example-withSubscriptionPlugin-url]

### A complete and real example:

* [pieb-with-dpe-frontend][pieb-with-dpe-frontend-url]

## Documentation

### Usage

```js
// Import Vivy
import Vivy from 'vivy';

// Create Vivy instance
const vivy = Vivy();

// Get Vivy Store
const store = vivy.createStore();
```

### Methods

### registerReducer

`registerReducer(vivyStore, nameSpace, reducer)`

```js
import {registerReducer} from 'vivy';

// Register a Redux reudcer to your Vivy store
registerReducer(YOUR_VIVY_STORE, YOUR_REDUCER_NAME_SAPCE, YOUR_REDUX_REDUCER);
```

### registerReducers

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

### registerModel

`registerModel(vivyStore, model)`

```js
import {registerModel} from 'vivy';

// Register a Vivy model to your Vivy store
registerModel(YOUR_VIVY_STORE, YOUR_VIVY_MODEL);
```

### registerModels

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

### unregisterReducer

`unregisterReducer(vivyStore, nameSpace)`

```js
import {unregisterReducer} from 'vivy';

// Unregister a Redux reducer from your Vivy store
unregisterReducer(YOUR_VIVY_STORE, YOUR_REDUCER_NAME_SAPCE);
```

### unregisterReducers

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

### unregisterModel

`unregisterModel(vivyStore, model)`

```js
import {unregisterModel} from 'vivy';

// Unregister a Vivy model from your Vivy store
unregisterModel(YOUR_VIVY_STORE, YOUR_VIVY_MODEL);
```

### unregisterModels

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

## Model

A model in Vivy is an Object combined state, actions and reducers.

```js
const example_model = {
    nameSpace: 'MODEL_NAME_SPACE',
    state: ANY_VALUE,
    actions: {},
    globalReducers: {},
    reducers: {}
}
```

## Plugins

Name                                             | Description
:----------------------------------------------- | :-------------------------
[vivy-api][ApiPlugin-url]                        | Handle `apis` in Vivy model to make api calling easier.
[vivy-router][RouterPlugin-url]                  | A router plugin based on `connected-react-router`
[vivy-async-component][AsyncComponentPlugin-url] | Load an async component when using `react-router`
[vivy-subscription][SubscriptionPlugin-url]      | Handle `subscriptions` in Vivy model to watch `history` or something else.
