/**
 * @file VivyStore.js
 */

import {createStore, applyMiddleware} from 'redux';

// Middlewares
import thunk from 'redux-thunk';
import {routerMiddleware} from 'connected-react-router';
import AsyncComponentLoadingMiddleware from '../middlewares/AsyncComponentLoadingMiddleware';
import createApiMiddleware from '../middlewares/ApiMiddleware';
import createModelActionMiddleware from '../middlewares/ModelActionMiddleware';
import createModelApiActionMiddleware from '../middlewares/ModelApiActionMiddleware';
import createRequestMiddleware from '../middlewares/RequestMiddleware';

// Reducers
import createRootReducer from '../reducers/RootReducer';

/**
 * create Vivy store
 * @param history
 * @param options
 * @returns {{}}
 */
export default function createVivyStore(history, options) {

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
                AsyncComponentLoadingMiddleware,
                ModelActionMiddleware,
                ModelApiActionMiddleware,
                // createApiMiddleware(),
                createRequestMiddleware(options),
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
        registerApiActions: ModelApiActionMiddleware.register

    };

}
