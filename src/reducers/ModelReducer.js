/**
 * @file ModelReducer.js
 */

// Statics
import BuildInModelReducers from './BuildInModelReducers';

// Vendors
import {isEmptyObject} from '../util/Util';

/**
 * Default reducer
 * @param value {any}
 * @returns {*}
 */
function identify(value) {
    return value;
}

/**
 * Generate reducer
 * @param actionType {string}
 * @param reducer {Function}
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
 * Reduce reducers
 * @param reducers {Array}
 * @returns {function(*=, *=): *}
 */
function reduceReducers(...reducers) {
    return (previous, current) => reducers.reduce((p, r) => r(p, current), previous);
}

/**
 * Create an async reducer
 * @param vivyStore {Object}
 * @param nameSpace {string}
 * @param initialState {any}
 * @param globalReducers {Object}
 * @param reducers {Object}
 * @returns {function(*=, *=): *}
 */
export default function createModelReducer(
    vivyStore, nameSpace, initialState, globalReducers, reducers
) {

    // Handle global reducers
    const globalReducerHandlers = !isEmptyObject(globalReducers) ?
        Object.entries(globalReducers).map(([type, globalReducer]) =>
            handleReducer(type, globalReducer)
        )
        :
        [];

    // Handle build-in model reducers
    const buildInReducerHandlers = !isEmptyObject(BuildInModelReducers) ?
        Object.entries(BuildInModelReducers).map(([type, bildInModelReducer]) =>
            handleReducer(`${nameSpace}/${type}`, bildInModelReducer)
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
        ...buildInReducerHandlers,
        ...reducerHandlers
    );

    // Return reducer
    return (state = initialState, action) => reducer(state, action);

}
