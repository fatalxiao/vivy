/**
 * @file ModelActionMiddleware.ts
 * @author Liangxiaojun
 */

// Types
import {Middleware} from "redux";

/**
 * ModelActionMiddleware creater
 * @param modelActions
 */
export default function createModelActionMiddleware(modelActions = {}): Middleware {
    return function ModelActionMiddleware() {
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
