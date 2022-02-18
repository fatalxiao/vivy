'use strict';

import Vivy, {bindModelActionCreators} from '../src';

// Models
import testModel from './mocks/testModel';

test('bindModelActionCreators', () => {

    const vivy = Vivy();
    const store = vivy.createStore();
    store.registerModel(testModel);

    const {update} = bindModelActionCreators({
        update: 'testModel/update'
    }, store.dispatch);

    update({
        value: 1
    });

    expect(
        store.getState().testModel
    ).toEqual(
        1
    );

});
