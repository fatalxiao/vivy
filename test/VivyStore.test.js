'use strict';

import Vivy from '../src';

test('Create Vivy store', () => {

    const vivy = Vivy();
    const store = vivy.createStore();

    expect(
        typeof store
    ).toEqual(
        'object'
    );

});
