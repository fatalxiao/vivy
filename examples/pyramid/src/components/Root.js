/**
 * @file Root.js
 */

import React, {useEffect} from 'react';
import {useModelActions} from 'react-vivy';

// Components
import Pyramid from './Pyramid';
import Actions from './Actions';

const Root = () => {

    /**
     * Get actions and reducers from model using hook "useModelActions".
     */
    const {random} = useModelActions('pyramid');

    /**
     * Init value
     */
    useEffect(() => {
        random?.();
    }, [
        random
    ]);

    return (
        <>
            <Actions/>
            <Pyramid/>
        </>
    );

};

export default Root;
