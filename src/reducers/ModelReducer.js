/**
 * @file ModelReducer.js
 */

/**
 * 默认的 reducer
 * @param value
 * @returns {*}
 */
function identify(value) {
    return value;
}

/**
 * 生成 Reducer
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
 * reduce reducers
 * @param reducers
 * @returns {function(*=, *=): *}
 */
function reduceReducers(...reducers) {
    return (previous, current) => reducers.reduce((p, r) => r(p, current), previous);
}

/**
 * 生成 actions
 * @param store
 * @param nameSpace
 * @param initialState
 * @param globalReducers
 * @param reducers
 * @returns {function(*=, *=): *}
 */
export default function createAsyncReducer(store, nameSpace, initialState, globalReducers, reducers) {

    const globalReducerHandlers = globalReducers ?
        Object.keys(globalReducers).map(type =>
            handleReducer(type, globalReducers[type])
        )
        :
        [];

    const reducerHandlers = reducers ?
        Object.keys(reducers).map(type =>
            handleReducer(`${nameSpace}/${type}`, reducers[type])
        )
        :
        [];

    const reducer = reduceReducers(...globalReducerHandlers, ...reducerHandlers);

    return (state = initialState, action) => reducer(state, action);

}
