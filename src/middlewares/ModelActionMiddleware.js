/**
 * @file ModelActionMiddleware.js
 */

/**
 * ModelActionMiddleware creater
 * @returns {function({dispatch?: *, getState?: *}): function(*): function(*=): *}
 */
export default function createModelActionMiddleware() {

    // async actions
    const asyncActions = {};

    /**
     * ModelActionMiddleware
     * @param dispatch
     * @param getState
     * @returns {function(*): function(*=): *}
     * @constructor
     */
    function ModelActionMiddleware({dispatch, getState}) {
        return next => action => {

            // match type in asyncActions
            if (asyncActions?.hasOwnProperty(action?.type)) {
                asyncActions[action.type]?.(action)?.(dispatch, getState);
            }

            return next(action);

        };
    }

    /**
     * register async actions
     * @param nameSpace
     * @param actions
     */
    ModelActionMiddleware.register = (nameSpace, actions) => Object.keys(actions).forEach(type =>
        asyncActions[`${nameSpace}/${type}`] = actions[type]
    );

    return ModelActionMiddleware;

}
