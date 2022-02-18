/**
 * @file testMiddleware.js
 */

export default ({dispatch, getState}) => next => action => {

    const {type, value} = action;

    if (type === 'updateTestModelValue') {
        dispatch({
            type: 'testModel/update',
            value
        });
    }

    return next(action);

};
