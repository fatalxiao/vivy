'use strict';

// Vendors
import Vivy from '../src';

const testReducer = (state = 0, action) => {
    switch (action.type) {

        case 'UPDATE': {
            return state + 1;
        }

        default:
            return state;

    }
};

describe('Vivy', () => {

    test('Create Vivy', () => {

        const vivy = Vivy();

        expect(
            typeof vivy
        ).toEqual(
            'object'
        );

    });

    test('Create Vivy store', () => {

        const vivy = Vivy();
        const store = vivy.createStore();

        expect(
            typeof store
        ).toEqual(
            'object'
        );

    });

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
            type: 'UPDATE'
        });

        expect(
            store.getState().testReducer
        ).toEqual(
            1
        );

    });

});
