/**
 * @file VivyStore.js
 */

import {createStore, applyMiddleware} from 'redux';

// Middlewares
import thunk from 'redux-thunk';
import {routerMiddleware} from 'connected-react-router';
import createModelActionMiddleware from '../middlewares/ModelActionMiddleware';

// Reducers
import createRootReducer from '../reducers/RootReducer';

/**
 * create Vivy store
 * @param history
 * @param plugins
 * @param options
 * @returns {{}}
 */
export default function createVivyStore(history, plugins, options) {

    // 用于加载和调用异步 actions 的 ModelActionMiddleware
    const ModelActionMiddleware = createModelActionMiddleware();

    const originStore = createStore(
        createRootReducer(history),
        applyMiddleware(
            thunk,
            ModelActionMiddleware,
            ...plugins?.reduce((extraMiddlewares, plugin) => [...extraMiddlewares, ...plugin.extraMiddlewares], []),
            routerMiddleware(history)
        )
    );

    return {

        // 创建的默认 store
        ...originStore,

        originStore,

        // history 实例
        history,

        // 异步的 reducers
        asyncReducers: {},

        // 暴露给 store 的注册异步 actions 的方法
        registerActions: ModelActionMiddleware.register,

        plugins

    };

}
