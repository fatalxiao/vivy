'use strict';

import Vivy from '../src';

test('Vivy option', () => {

    const option = {
        initialState: null,
        overwriteSameNameSpaceModel: true,
        onUsePlugin: () => {
        },
        beforeCreateStore: () => {
        },
        onCreateStore: () => {
        },
        onRegisterReducer: () => {
        },
        onUnregisterReducer: () => {
        },
        onRegisterModel: () => {
        },
        onUnregisterModel: () => {
        },
        extraReducers: null,
        extraModels: [],
        extraMiddlewares: []
    };

    const vivy = Vivy(option);

    const store = vivy.createStore();

    expect(
        store.getState()['@@VIVY_OPTION']
    ).toEqual(
        option
    );

});
