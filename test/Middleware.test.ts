'use strict';

import Vivy from 'src';

// Middlewares
import testMiddleware from './mocks/testMiddleware';

// Models
import testModel from './mocks/testModel';

test('Register middleware', () => {

    const vivy = Vivy({
        extraMiddlewares: [
            testMiddleware
        ]
    });

    const store = vivy.createStore();
    store.registerModel(testModel);

    expect(
        store.getState().testModel
    ).toEqual(
        0
    );

});

test('Dispatch action through middleware', () => {

    const vivy = Vivy({
        extraMiddlewares: [
            testMiddleware
        ]
    });

    const store = vivy.createStore();
    store.registerModel(testModel);

    store.dispatch({
        type: 'updateTestModelValue',
        value: 1
    });

    expect(
        store.getState().testModel
    ).toEqual(
        1
    );

});

test('Dispatch no matched action through middleware', () => {

    const vivy = Vivy({
        extraMiddlewares: [
            testMiddleware
        ]
    });

    const store = vivy.createStore();
    store.registerModel(testModel);

    store.dispatch({
        type: 'xxxxx',
        value: 1
    });

    expect(
        store.getState().testModel
    ).toEqual(
        0
    );

});
