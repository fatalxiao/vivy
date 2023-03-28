'use strict';

import Vivy, {bindModelActionCreators, ModelActionCreatorFunctionMapObject} from 'src';

// Models
import testModel from './mocks/testModel';

test('bindModelActionCreators', () => {

    const vivy = Vivy();

    const store = vivy.createStore();
    store.registerModel(testModel);

    const actions = bindModelActionCreators({
        update: 'testModel/update'
    }, store.dispatch);

    (actions as ModelActionCreatorFunctionMapObject)?.update?.({
        value: 1
    });

    expect(
        store.getState().testModel
    ).toEqual(
        1
    );

});
