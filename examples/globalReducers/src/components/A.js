/**
 * @file A.js
 */

import React from 'react';
import {useModelState} from 'react-vivy';

const A = () => {

    /**
     * Get state from model using hook "useModelState".
     */
    const value = useModelState('a');

    return (
        <>
            <h1>
                Module A
            </h1>
            <div>
                {value}
            </div>
        </>
    );

};

export default A;
