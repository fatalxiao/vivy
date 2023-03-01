/**
 * @file Root.js
 */

import React from 'react';
import {useModel, useGlobalReducers} from 'react-vivy';

// Components
import A from './A';
import B from './B';
import C from './C';

const Root = () => {

    /**
     * Get state and reducer from model "root" using hook "useModel".
     */
    const [value, {update}] = useModel('root');

    /**
     * Get global reducer using hook "useGlobalReducers".
     */
    const {sync} = useGlobalReducers();

    return (
        <>

            <input value={value}
                   onChange={e => update?.({
                       value: e.target.value
                   })}/>
            <button onClick={() => sync({value})}>
                Sync value
            </button>

            <A/>
            <B/>
            <C/>

        </>
    );

};

export default Root;
