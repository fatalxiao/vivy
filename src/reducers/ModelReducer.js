/**
 * @file ModelReducer.js
 */

/**
 * Default reducer
 * @param value
 * @returns {*}
 */
function identify(value) {
    return value;
}

/**
 * Generate reducer
 * @param actionType
 * @param reducer
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
 * @param reducers
 * @returns {function(*=, *=): *}
 */
function reduceReducers(...reducers) {
    return (previous, current) => reducers.reduce((p, r) => r(p, current), previous);
}

/**
 * Create an async reducer
 * @param store
 * @param nameSpace
 * @param initialState
 * @param globalReducers
 * @param reducers
 * @returns {function(*=, *=): *}
 */
export default function createAsyncReducer(store, nameSpace, initialState, globalReducers, reducers) {

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

    // Return reducer
    return (state = initialState, action) => reducer(state, action);

}
