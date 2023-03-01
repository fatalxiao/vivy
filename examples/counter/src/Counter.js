/**
 * @file Counter.js
 */

import React, {useState, useCallback} from 'react';
import {useModel} from 'react-vivy';

const wrapperStyle = {
    margin: 8
};

const inputStyle = {
    width: 207,
    padding: 8
};

const buttonStyle = {
    width: 100,
    height: 32,
    marginLeft: 8
};

const Counter = () => {

    /**
     * Get state and reducer from model "counter" using hook "useModel".
     */
    const [{value}, {plus, minus, update}] = useModel('counter');

    /**
     * Input value state
     */
    const [inputValue, setInputValue] = useState(100);

    /**
     * Handle input value change
     * @type {(function(*): void)|*}
     */
    const handleChange = useCallback(e => {
        setInputValue(+e.target.value);
    }, []);

    return (
        <>

            <div style={wrapperStyle}>

                Current value: {value}

                <button style={buttonStyle}
                        onClick={plus}>
                    +1
                </button>
                <button style={buttonStyle}
                        onClick={minus}>
                    -1
                </button>

            </div>

            <div style={wrapperStyle}>

                <input style={inputStyle}
                       value={inputValue}
                       onChange={handleChange}/>

                <button style={buttonStyle}
                        onClick={() => update({nextValue: inputValue})}>
                    Update value
                </button>

            </div>

        </>
    );

};

export default Counter;
