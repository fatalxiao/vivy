'use strict';

import Vivy from '../src';

// Models
import testModel from './mocks/testModel';

test('Register model', () => {

    const vivy = Vivy();
    const store = vivy.createStore();
    store.registerModel(testModel);

    expect(
        store.getState().testModel
    ).toEqual(
        0
    );

});

test('Dispatch model reducer by functional dispatch', () => {

    const vivy = Vivy();
    const store = vivy.createStore();
    store.registerModel(testModel);
    store.dispatch({
        type: 'testModel/update',
        value: 1
    });

    expect(
        store.getState().testModel
    ).toEqual(
        1
    );

});

test('Dispatch model reducer by chain dispatch', () => {

    const vivy = Vivy();
    const store = vivy.createStore();
    store.registerModel(testModel);
    store.dispatch.testModel.update({
        value: 1
    });

    expect(
        store.getState().testModel
    ).toEqual(
        1
    );

});

test('Dispatch model global reducer by functional dispatch', () => {

    const vivy = Vivy();
    const store = vivy.createStore();
    store.registerModel(testModel);
    store.dispatch({
        type: 'globalUpdate',
        value: 1
    });

    expect(
        store.getState().testModel
    ).toEqual(
        1
    );

});

test('Dispatch model global reducer by chain dispatch', () => {

    const vivy = Vivy();
    const store = vivy.createStore();
    store.registerModel(testModel);
    store.dispatch.globalUpdate({
        value: 1
    });

    expect(
        store.getState().testModel
    ).toEqual(
        1
    );

});

test('Dispatch model functional dispatch action by functional dispatch', () => {

    const vivy = Vivy();
    const store = vivy.createStore();
    store.registerModel(testModel);
    store.dispatch({
        type: 'testModel/actionUpdateByFunctionalDispatch',
        value: 1
    });

    expect(
        store.getState().testModel
    ).toEqual(
        1
    );

});

test('Dispatch model functional dispatch action by chain dispatch', () => {

    const vivy = Vivy();
    const store = vivy.createStore();
    store.registerModel(testModel);
    store.dispatch.testModel.actionUpdateByFunctionalDispatch({
        value: 1
    });

    expect(
        store.getState().testModel
    ).toEqual(
        1
    );

});

test('Dispatch model chain dispatch action by functional dispatch', () => {

    const vivy = Vivy();
    const store = vivy.createStore();
    store.registerModel(testModel);
    store.dispatch({
        type: 'testModel/actionUpdateByChainDispatch',
        value: 1
    });

    expect(
        store.getState().testModel
    ).toEqual(
        1
    );

});

test('Dispatch model chain dispatch action by chain dispatch', () => {

    const vivy = Vivy();
    const store = vivy.createStore();
    store.registerModel(testModel);
    store.dispatch.testModel.actionUpdateByChainDispatch({
        value: 1
    });

    expect(
        store.getState().testModel
    ).toEqual(
        1
    );

});
