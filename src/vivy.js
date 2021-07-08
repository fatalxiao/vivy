/**
 * @file vivy.js
 */

import {createStore, applyMiddleware} from 'redux';

// Reducers Root
import createRootReducer from 'reduxes/reducers';

// Middlewares
import thunk from 'redux-thunk';
import {routerMiddleware} from 'connected-react-router';
import ComponentLoadingMiddleware from 'reduxes/middlewares/ComponentLoadingMiddleware';
import ApiMiddleware from 'reduxes/middlewares/ApiMiddleware';
import createModelActionMiddleware from './middlewares/ModelActionMiddleware';
import createModelApiActionMiddleware from './middlewares/ModelApiActionMiddleware';

/**
 * 注入异步的 reducer
 * @param store
 * @param nameSpace
 * @param asyncReducer
 */
export function injectAsyncReducer(store, nameSpace, asyncReducer) {
    store.asyncReducers[nameSpace] = asyncReducer;
    store.replaceReducer(createRootReducer(store.history, store.asyncReducers));
}

/**
 * 默认的 reducer
 * @param value
 * @returns {*}
 */
function identify(value) {
    return value;
}

/**
 * 生成 Reducer
 * @param actionType
 * @param reducer
 * @returns {(function(*=, *=): (*))|*}
 */
function handleReducer(actionType, reducer = identify) {
    return (state, action) => {

        const {type} = action;

        if (actionType === type) {
            return reducer(state, action);
        }

        return state;

    };
}

/**
 * reduce reducers
 * @param reducers
 * @returns {function(*=, *=): *}
 */
function reduceReducers(...reducers) {
    return (previous, current) => reducers.reduce((p, r) => r(p, current), previous);
}

/**
 * 生成 actions
 * @param store
 * @param nameSpace
 * @param initialState
 * @param globalReducers
 * @param reducers
 * @returns {function(*=, *=): *}
 */
function getReducer(store, nameSpace, initialState, globalReducers, reducers) {

    const globalReducerHandlers = globalReducers ?
        Object.keys(globalReducers).map(type =>
            handleReducer(type, globalReducers[type])
        )
        :
        [];

    const reducerHandlers = reducers ?
        Object.keys(reducers).map(type =>
            handleReducer(`${nameSpace}/${type}`, reducers[type])
        )
        :
        [];

    const reducer = reduceReducers(...globalReducerHandlers, ...reducerHandlers);

    return (state = initialState, action) => reducer(state, action);

}

/**
 * 注册 model
 * @param store
 * @param model
 */
export function registerModel(store, model) {

    if (!store || !model?.nameSpace) {
        return;
    }

    const {nameSpace, state, actions, apis, globalReducers, reducers} = model;

    if (store.asyncReducers.hasOwnProperty(nameSpace)) {
        console.error(`nameSpace: ${nameSpace} has been registered.`);
    }

    // 注册 reducers
    store.asyncReducers[nameSpace] = getReducer(
        store, nameSpace, state, globalReducers || {}, reducers || {}
    );
    store.replaceReducer(createRootReducer(store.history, store.asyncReducers));

    // 注册 actions
    if (actions) {
        store.registerActions(nameSpace, actions || {});
    }

    // 注册 apis
    if (apis) {
        store.registerApis(nameSpace, apis || {});
    }

}

/**
 * 注册 models
 * @param store
 * @param models
 */
export function registerModels(store, models) {
    models.forEach(model => registerModel(store, model));
}

export default history => {

    // 用于加载和调用异步 actions 的 ModelActionMiddleware
    const ModelActionMiddleware = createModelActionMiddleware();

    // 用于加载和调用异步 api 的 ModelApiActionMiddleware
    const ModelApiActionMiddleware = createModelApiActionMiddleware();

    return {

        // 创建的默认 store
        ...createStore(
            createRootReducer(history),
            applyMiddleware(
                thunk,
                ComponentLoadingMiddleware,
                ModelActionMiddleware,
                ModelApiActionMiddleware,
                ApiMiddleware,
                routerMiddleware(history)
            )
        ),

        // history 实例
        history,

        // 异步的 reducers
        asyncReducers: {},

        // 暴露给 store 的注册异步 actions 的方法
        registerActions: ModelActionMiddleware.register,

        // 暴露给 store 的注册异步 apis 的方法
        registerApis: ModelApiActionMiddleware.register

    };

};
