'use strict';

import Vivy, {
    VIVY_UPDATE, VIVY_OPTION_UPDATE,
    VIVY_REDUCER_NAME_SPACE, VIVY_OPTION_REDUCER_NAME_SPACE
} from 'src';

import {
    VIVY_REDUCER_NAME_SPACE as VivyReducerNameSpace,
    VIVY_OPTION_REDUCER_NAME_SPACE as VivyOptionReducerNameSpace
} from 'src/reducers/ReducerNameSpace';

import {
    VIVY_UPDATE as VivyUpdateActionType
} from 'src/actionTypes/VivyActionType';
import {
    VIVY_OPTION_UPDATE as VivyOptionUpdateActionType
} from 'src/actionTypes/VivyOptionActionType';

test('Vivy VIVY_REDUCER_NAME_SPACE', () => {
    expect(
        VIVY_REDUCER_NAME_SPACE
    ).toEqual(
        VivyReducerNameSpace
    );
});

test('Vivy VIVY_OPTION_REDUCER_NAME_SPACE', () => {
    expect(
        VIVY_OPTION_REDUCER_NAME_SPACE
    ).toEqual(
        VivyOptionReducerNameSpace
    );
});

test('Vivy VIVY_UPDATE', () => {
    expect(
        VIVY_UPDATE
    ).toEqual(
        VivyUpdateActionType
    );
});

test('Vivy VivyOptionUpdateActionType', () => {
    expect(
        VIVY_OPTION_UPDATE
    ).toEqual(
        VivyOptionUpdateActionType
    );
});

test('Create Vivy', () => {

    const vivy = Vivy();

    expect(
        typeof vivy
    ).toEqual(
        'object'
    );

});
