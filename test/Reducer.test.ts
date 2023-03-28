'use strict';

import Vivy from 'src';

// Reducers
import testReducer from './mocks/testReducer';

test('Register reducer', () => {

    const vivy = Vivy();

    const store = vivy.createStore();
    store.registerReducer('testReducer', testReducer);

    expect(
        store.getState().testReducer
    ).toEqual(
        0
    );

});

test('Dispatch reducer action', () => {

    const vivy = Vivy();

    const store = vivy.createStore();
    store.registerReducer('testReducer', testReducer);

    store.dispatch({
        type: 'UPGRADE'
    });

    expect(
        store.getState().testReducer
    ).toEqual(
        1
    );

});
