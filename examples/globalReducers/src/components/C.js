/**
 * @file C.js
 */

import React from 'react';
import {useModelState} from 'react-vivy';

const C = () => {

    /**
     * Get state from model using hook "useModelState".
     */
    const value = useModelState('c');

    return (
        <>
            <h1>
                Module C
            </h1>
            <div>
                {value}
            </div>
        </>
    );

};

export default C;
