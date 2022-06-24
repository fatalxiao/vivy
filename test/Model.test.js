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

test('Dispatch model setState action by functional dispatch', () => {

    const vivy = Vivy();

    const store = vivy.createStore();
    store.registerModel(testModel);

    store.dispatch({
        type: 'testModel/setState',
        nextState: 1
    });

    expect(
        store.getState().testModel
    ).toEqual(
        1
    );

});

test('Dispatch model setState action by chain dispatch', () => {

    const vivy = Vivy();

    const store = vivy.createStore();
    store.registerModel(testModel);

    store.dispatch.testModel.setState({
        nextState: 1
    });

    expect(
        store.getState().testModel
    ).toEqual(
        1
    );

});

test('Dispatch functional model setState action by functional dispatch', () => {

    const vivy = Vivy();

    const store = vivy.createStore();
    store.registerModel(testModel);

    store.dispatch({
        type: 'testModel/setState',
        nextState: state => state + 2
    });

    expect(
        store.getState().testModel
    ).toEqual(
        2
    );

});

test('Dispatch functional model setState action by chain dispatch', () => {

    const vivy = Vivy();

    const store = vivy.createStore();
    store.registerModel(testModel);

    store.dispatch.testModel.setState({
        nextState: state => state + 2
    });

    expect(
        store.getState().testModel
    ).toEqual(
        2
    );

});

test('Dispatch model reducer by functional dispatch', () => {

    const vivy = Vivy();

    const store = vivy.createStore();
    store.registerModel(testModel);

    store.dispatch({
        type: 'testModel/update',
        value: 3
    });

    expect(
        store.getState().testModel
    ).toEqual(
        3
    );

});

test('Dispatch model reducer by chain dispatch', () => {

    const vivy = Vivy();

    const store = vivy.createStore();
    store.registerModel(testModel);

    store.dispatch.testModel.update({
        value: 3
    });

    expect(
        store.getState().testModel
    ).toEqual(
        3
    );

});

test('Dispatch model global reducer by functional dispatch', () => {

    const vivy = Vivy();

    const store = vivy.createStore();
    store.registerModel(testModel);

    store.dispatch({
        type: 'globalUpdate',
        value: 4
    });

    expect(
        store.getState().testModel
    ).toEqual(
        4
    );

});

test('Dispatch model global reducer by chain dispatch', () => {

    const vivy = Vivy();

    const store = vivy.createStore();
    store.registerModel(testModel);

    store.dispatch.globalUpdate({
        value: 4
    });

    expect(
        store.getState().testModel
    ).toEqual(
        4
    );

});

test('Dispatch model functional dispatch action by functional dispatch', () => {

    const vivy = Vivy();

    const store = vivy.createStore();
    store.registerModel(testModel);

    store.dispatch({
        type: 'testModel/actionUpdateByFunctionalDispatch',
        value: 5
    });

    expect(
        store.getState().testModel
    ).toEqual(
        5
    );

});

test('Dispatch model functional dispatch action by chain dispatch', () => {

    const vivy = Vivy();

    const store = vivy.createStore();
    store.registerModel(testModel);

    store.dispatch.testModel.actionUpdateByFunctionalDispatch({
        value: 5
    });

    expect(
        store.getState().testModel
    ).toEqual(
        5
    );

});

test('Dispatch model chain dispatch action by functional dispatch', () => {

    const vivy = Vivy();

    const store = vivy.createStore();
    store.registerModel(testModel);

    store.dispatch({
        type: 'testModel/actionUpdateByChainDispatch',
        value: 6
    });

    expect(
        store.getState().testModel
    ).toEqual(
        6
    );

});

test('Dispatch model chain dispatch action by chain dispatch', () => {

    const vivy = Vivy();

    const store = vivy.createStore();
    store.registerModel(testModel);

    store.dispatch.testModel.actionUpdateByChainDispatch({
        value: 6
    });

    expect(
        store.getState().testModel
    ).toEqual(
        6
    );

});

test('Dispatch no value by functional dispatch', () => {

    const vivy = Vivy();

    const store = vivy.createStore();
    store.registerModel(testModel);

    store.dispatch({
        type: 'testModel/update'
    });

    expect(
        store.getState().testModel
    ).toEqual(
        0
    );

});

test('Dispatch no value by chain dispatch', () => {

    const vivy = Vivy();

    const store = vivy.createStore();
    store.registerModel(testModel);

    store.dispatch.testModel.update();

    expect(
        store.getState().testModel
    ).toEqual(
        0
    );

});

test('Dispatch error value by functional dispatch', () => {

    const vivy = Vivy();

    const store = vivy.createStore();
    store.registerModel(testModel);

    store.dispatch({
        type: 'testModel/update',
        value: null
    });

    expect(
        store.getState().testModel
    ).toEqual(
        0
    );

});

test('Dispatch error value by chain dispatch', () => {

    const vivy = Vivy();

    const store = vivy.createStore();
    store.registerModel(testModel);

    store.dispatch.testModel.update(null);

    expect(
        store.getState().testModel
    ).toEqual(
        0
    );

});
