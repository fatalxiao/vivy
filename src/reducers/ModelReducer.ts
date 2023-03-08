/**
 * @file ModelReducer.ts
 * @author Liangxiaojun
 */

// Vendors
import {isEmptyObject} from '../util/Util';
import {AnyAction, Reducer, ReducersMapObject} from "redux";
import {VivyStore} from "src/types";

/**
 * Default reducer
 * @param value
 */
function identify(value: any): any {
    return value;
}

/**
 * Generate reducer
 * @param actionType
 * @param reducer
 */
function handleReducer(actionType: string, reducer: Reducer = identify) {
    return (state: any, action: AnyAction): any => {

        const {type} = action;

        if (actionType === type) {
            return reducer(state, action);
        }

        return state;

    };
}

/**
 * Reduce reducers
 * @param reducers
 */
function reduceReducers(...reducers: Reducer[]): Reducer {
    return (state: any, action: AnyAction) =>
        reducers.reduce((p, r) => r(p, action), state);
}

/**
 * Create an async reducer
 * @param vivyStore
 * @param nameSpace
 * @param initialState
 * @param globalReducers
 * @param reducers
 */
export default function createModelReducer(
    vivyStore: VivyStore, nameSpace: string, initialState: any,
    globalReducers: ReducersMapObject, reducers: ReducersMapObject
): Reducer {

    // Handle global reducers
    const globalReducerHandlers = !isEmptyObject(globalReducers) ?
        Object.entries(globalReducers).map(([type, globalReducer]) =>
            handleReducer(type, globalReducer)
        )
        :
        [];

    // Handle reducers
    const reducerHandlers = !isEmptyObject(reducers) ?
        Object.entries(reducers).map(([type, reducer]) =>
            handleReducer(`${nameSpace}/${type}`, reducer)
        )
        :
        [];

    // Reduce reducers
    const reducer = reduceReducers(
        ...globalReducerHandlers,
        ...reducerHandlers
    );

    // Return reducer
    return (state = initialState, action: AnyAction) => reducer(state, action);

}
