'use strict';

// // Vendors
// import Vivy from '../src';
//
// // Statics
// import testReducer from './mocks/testReducer';
//
// eslint-disable-next-line jest/no-commented-out-tests
// test('Register reducer', () => {
//
//     const vivy = Vivy();
//     const store = vivy.createStore();
//     store.registerReducer('testReducer', testReducer);
//
//     expect(
//         store.getState().testReducer
//     ).toEqual(
//         0
//     );
//
// });
//
// eslint-disable-next-line jest/no-commented-out-tests
// test('Dispatch reducer action', () => {
//
//     const vivy = Vivy();
//     const store = vivy.createStore();
//     store.registerReducer('testReducer', testReducer);
//     store.dispatch({
//         type: 'UPGRADE'
//     });
//
//     expect(
//         store.getState().testReducer
//     ).toEqual(
//         1
//     );
//
// });
