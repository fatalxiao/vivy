'use strict';

// Vendors
import Vivy from '../src';

// Statics
import testReducer from './testReducer';
import testModel from './testModel';

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
        type: 'UPGRADE'
    });

    expect(
        store.getState().testReducer
    ).toEqual(
        1
    );

});

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

test('Dispatch model action', () => {

    const vivy = Vivy();
    const store = vivy.createStore();
    store.registerModel(testModel);
    store.dispatch({
        type: 'testModel/upgrade'
    });

    expect(
        store.getState().testModel
    ).toEqual(
        1
    );

});

test('Dispatch model action 2', () => {

    const vivy = Vivy();
    const store = vivy.createStore();
    store.registerModel(testModel);
    store.dispatch.testModel.upgrade();

    expect(
        store.getState().testModel
    ).toEqual(
        1
    );

});
