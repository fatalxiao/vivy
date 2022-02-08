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
     * @param nameSpace {string}
     * @param actions {Object}
     * @param store {Object}
     */
    ModelActionMiddleware.register = (nameSpace, actions, store) => {

        Object.keys(actions).forEach(type =>
            asyncActions[`${nameSpace}/${type}`] = actions[type]
        );

        store.dispatch[nameSpace] = Object.entries(actions).reduce((result, [name, action]) => ({
            ...result,
            [name]: params => action(params)(store.dispatch, store.getState)
        }), {});

    };

    return ModelActionMiddleware;

}
