/**
 * @file ModelActionMiddleware.js
 */

/**
 * ModelActionMiddleware creater
 * @returns {function({dispatch?: *, getState?: *}): function(*): function(*=): *}
 */
export default function createModelActionMiddleware() {

    // Async actions
    const asyncActions = {};

    /**
     * ModelActionMiddleware
     * @param dispatch {Function}
     * @param getState {Function}
     * @returns {function(*): function(*=): *}
     * @constructor
     */
    function ModelActionMiddleware({dispatch, getState}) {
        return next => action => {

            // match type in asyncActions
            if (asyncActions?.hasOwnProperty(action?.type)) {
                return asyncActions[action.type]?.(action)?.(dispatch, getState);
            }

            return next(action);

        };
    }

    /**
     * Register async actions
     * @param store {Object}
     * @param nameSpace {string}
     * @param actions {Object}
     */
    ModelActionMiddleware.register = (store, nameSpace, actions) => {

        Object.keys(actions).forEach(type =>
            asyncActions[`${nameSpace}/${type}`] = actions[type]
        );

        store.dispatch[nameSpace] = Object.entries(actions).reduce((result, [name, action]) => ({
            ...result,
            [name]: params => action(params)(store.dispatch, store.getState)
        }), {});

    };

    /**
     * Unregister Async Actions
     * @param store {Object}
     * @param nameSpace {string}
     */
    function unregisterAsyncActions(store, nameSpace) {

        Object.keys(asyncActions).forEach(asyncActionsKey => {
            if (asyncActionsKey.startsWith(`${nameSpace}/`)) {
                delete asyncActions[asyncActionsKey];
            }
        });

        delete store.dispatch[nameSpace];

    }

    /**
     * Unregister async actions
     * @param store {Object}
     * @param nameSpaceOrModel {string|Object}
     */
    ModelActionMiddleware.unregister = (store, nameSpaceOrModel) => {
        if (typeof nameSpaceOrModel === 'string') {
            unregisterAsyncActions(store, nameSpaceOrModel);
        } else {
            unregisterAsyncActions(store, nameSpaceOrModel?.nameSpace);
        }
    };

    return ModelActionMiddleware;

}
