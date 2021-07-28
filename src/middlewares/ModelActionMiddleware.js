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
     */
    ModelActionMiddleware.register = (nameSpace, actions) => Object.keys(actions).forEach(type =>
        asyncActions[`${nameSpace}/${type}`] = actions[type]
    );

    return ModelActionMiddleware;

}
