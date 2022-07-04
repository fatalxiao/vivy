[npm-image]: https://img.shields.io/npm/v/vivy.svg?style=flat-square

[npm-url]: https://npmjs.org/package/vivy

[license-image]: https://img.shields.io/npm/l/vivy.svg?style=flat-square

[redux-url]: https://github.com/reduxjs/redux

[counter-example-url]: https://github.com/fatalxiao/vivy/tree/main/examples/counter

[calculation-example-url]: https://github.com/fatalxiao/vivy/tree/main/examples/calculation

[global-reducers-example-url]: https://github.com/fatalxiao/vivy/tree/main/examples/globalReducers

[request-api-example-url]: https://github.com/fatalxiao/vivy/tree/main/examples/requestApi

[pyramid-example-url]: https://github.com/fatalxiao/vivy/tree/main/examples/pyramid

[pieb-with-dpe-frontend-url]: https://github.com/fatalxiao/pieb-with-dpe-frontend

[connected-react-router-url]: https://github.com/supasate/connected-react-router

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

Vivy 是一个基于 [redux][redux-url] 开发的 Javascript 状态管理器。为了更便于上手，使用了尽可能贴近 `Redux` 的语法和传参。

在 Vivy 中，`state`、`actions` 和 `reducers` 被组合在一个 `Object` 中，我们称它为 `model`。在 `model` 中的 `actions` 和
`reducers` 都可以使用 `dispatch` 来调用，所以在 Vivy 中无需再定义原生 `Redux` 中的 `action type`。同时由于可以直接使用
`dispatch` 调用到 `reducer`，因此可以免去不必要的 `action`。

Vivy 的设计具有很好的扩展性，可以使用插件来扩展功能。可以使用 [vivy-router][router-plugin-url] 配置路由，使用
[vivy-async-component][async-component-plugin-url] 可以在路由级别懒加载 `component` 和 `model`，
[vivy-api][api-plugin-url] 可以很方便的调用 api，[vivy-subscription][subscription-plugin-url] 可以很方便的检测 `history`
或其他变量，[vivy-i18n][i18n-plugin-url] 可以实现多语言。

* [安装](#安装)
* [例子](#例子)
    * [项目中的例子](#项目中的例子)
    * [一个真实项目的例子](#一个真实项目的例子)
* [插件](#插件)
* [文档](#文档)
    * [基础](#基础)
    * [Vivy model](#vivy-model)
    * [Vivy store dispatcher](#vivy-store-dispatcher)
    * [在 Component 中使用 Vivy](#在-Component-中使用-Vivy)
    * [方法](#方法)

## 安装

使用 `NPM`:

```shell
$ npm install vivy
```

## 例子

### 项目中的例子

```shell
$ cd ./examples/[EXAMPLE_NAME]
$ npm run start
```

**例子的名称**:

* [counter][counter-example-url]
* [calculation][calculation-example-url]
* [globalReducers][global-reducers-example-url]
* [requestApi][request-api-example-url]
* [pyramid][pyramid-example-url]

### 一个真实项目的例子

* [pieb-with-dpe-frontend][pieb-with-dpe-frontend-url]

## 插件

| 插件名称                                               | 版本                                                                                 | 说明                                                                         |
|:---------------------------------------------------|:-----------------------------------------------------------------------------------|:---------------------------------------------------------------------------|
| [vivy-router][router-plugin-url]                   | [![NPM Version][router-plugin-npm-image]][router-plugin-npm-url]                   | 基于 [connected-react-router][connected-react-router-url] 的路由插件.             |
| [vivy-async-component][async-component-plugin-url] | [![NPM Version][async-component-plugin-npm-image]][async-component-plugin-npm-url] | 基于路由级别的 `component` / `model` / `reducer` 懒加载                              |
| [vivy-api][api-plugin-url]                         | [![NPM Version][api-plugin-npm-image]][api-plugin-npm-url]                         | Handle `apis` in Vivy model to make api calling easier.                    |
| [vivy-subscription][subscription-plugin-url]       | [![NPM Version][subscription-plugin-npm-image]][subscription-plugin-npm-url]       | Handle `subscriptions` in Vivy model to watch `history` or something else. |
| [vivy-i18n][i18n-plugin-url]                       | [![NPM Version][i18n-plugin-npm-image]][i18n-plugin-npm-url]                       | Handle `i18ns` in Vivy model to implement i18n.                            |

## 文档

### 基础

```js
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

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

In Vivy, you can use three ways to dispatch an action.

1. Use `store.dispatch` function

```js
dispatch({
    type: 'MODEL_NAME_SPACE/ACTION_OR_REDUCER_NAME',
    OTHER_PROPS
});
```

2. Use `store.dispatch` chain function

```js
dispatch.MODEL_NAME_SPACE.ACTION_OR_REDUCER_NAME({
    OTHER_PROPS
});
```

3. Use `bindModelActionCreators` to create an action dispatcher

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

### 在 Component 中使用 Vivy

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
        });
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
    updateValue: 'yourVivyModel/updateValue' // Create action or reducer dispatcher.
}, dispatch))(App);
```

### 方法

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
