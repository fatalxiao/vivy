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
