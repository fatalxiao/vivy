/**
 * @file testMiddleware.ts
 */

export default ({dispatch}) => next => action => {

    const {type, value} = action;

    if (type === 'updateTestModelValue') {
        dispatch({
            type: 'testModel/update',
            value
        });
    }

    return next(action);

};
