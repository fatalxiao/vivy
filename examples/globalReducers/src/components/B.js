/**
 * @file B.js
 */

import React from 'react';
import {useModelState} from 'react-vivy';

const B = () => {

    /**
     * Get state from model using hook "useModelState".
     */
    const value = useModelState('b');

    return (
        <>
            <h1>
                Module B
            </h1>
            <div>
                {value}
            </div>
        </>
    );

};

export default B;
