/**
 * @file ModelReducer.js
 */

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
 * @param store {Object}
 * @param nameSpace {string}
 * @param initialState {any}
 * @param globalReducers {Object}
 * @param reducers {Object}
 * @returns {function(*=, *=): *}
 */
export default function createModelReducer(
    store, nameSpace, initialState, globalReducers, reducers
) {

    // Handle global reducers
    const globalReducerHandlers = globalReducers ?
        Object.keys(globalReducers).map(type =>
            handleReducer(type, globalReducers[type])
        )
        :
        [];

    // Handle reducers
    const reducerHandlers = reducers ?
        Object.keys(reducers).map(type =>
            handleReducer(`${nameSpace}/${type}`, reducers[type])
        )
        :
        [];

    // Reduce reducers
    const reducer = reduceReducers(...globalReducerHandlers, ...reducerHandlers);

    // Bind reducers to store.dispatch to implement "dispatch.nameSpace.reducerName()"
    store.dispatch[nameSpace] = Object.entries(reducers).reduce((result, [name, reducer]) => ({
        ...result,
        [name]: params => store.dispatch({
            ...params,
            type: `${nameSpace}/${name}`
        })
    }), {});

    // Return reducer
    return (state = initialState, action) => reducer(state, action);

}
