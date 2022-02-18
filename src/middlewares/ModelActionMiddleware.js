/**
 * @file ModelActionMiddleware.js
 */

/**
 * ModelActionMiddleware creater
 * @param modelActions
 * @returns {function({dispatch: Function, getState: Function}): function(*): function(*): (*)}
 */
export default function createModelActionMiddleware(modelActions = {}) {

    /**
     * ModelActionMiddleware
     * @param dispatch {Function}
     * @param getState {Function}
     * @returns {function(*): function(*=): *}
     * @constructor
     */
    return function ModelActionMiddleware({dispatch, getState}) {
        return next => action => {

            if (!action?.type) {
                return next(action);
            }

            // Match action type in modelActions
            const [nameSpace, name] = action.type.split('/');
            if (modelActions[nameSpace]?.[name]) {
                modelActions[nameSpace]?.[name]?.(action);
            }

            return next(action);

        };
    };

}
