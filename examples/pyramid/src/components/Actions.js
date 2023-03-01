/**
 * @file Actions.js
 */

import React from 'react';
import {useModelActions} from 'react-vivy';

const Actions = () => {

    /**
     * Get actions and reducers from model using hook "useModelActions".
     */
    const {random, check} = useModelActions('pyramid');

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: 184,
            paddingLeft: 8
        }}>
            <button onClick={random}>
                Reset
            </button>
            <button onClick={check}>
                Check
            </button>
        </div>
    );

};

export default Actions;
