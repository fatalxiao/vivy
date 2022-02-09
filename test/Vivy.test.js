'use strict';

// Vendors
import Vivy from '../src';

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
