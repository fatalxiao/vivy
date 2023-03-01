/**
 * @file Counter.js
 */

import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-vivy';

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

const Counter = ({
    value,
    dispatch
}) => {

    /**
     * Plus 1
     * @type {(function(): void)|*}
     */
    const handlePlus = useCallback(() => {
        dispatch?.({
            type: 'counter/plus'
        });
    }, [
        dispatch
    ]);

    /**
     * Minus 1
     * @type {(function(): void)|*}
     */
    const handleMinus = useCallback(() => {
        dispatch?.({
            type: 'counter/minus'
        });
    }, [
        dispatch
    ]);

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

    /**
     * Update input value to model
     * @type {(function(): void)|*}
     */
    const handleUpdate = useCallback(() => {
        dispatch?.({
            type: 'counter/update',
            nextValue: inputValue
        });
    }, [
        inputValue,
        dispatch
    ]);

    return (
        <>

            <div style={wrapperStyle}>

                Current value: {value}

                <button style={buttonStyle}
                        onClick={handlePlus}>
                    +1
                </button>
                <button style={buttonStyle}
                        onClick={handleMinus}>
                    -1
                </button>

            </div>

            <div style={wrapperStyle}>

                <input style={inputStyle}
                       value={inputValue}
                       onChange={handleChange}/>

                <button style={buttonStyle}
                        onClick={handleUpdate}>
                    Update value
                </button>

            </div>

        </>
    );

};

Counter.propTypes = {
    value: PropTypes.number,
    dispatch: PropTypes.func
};

export default connect(state => ({
    value: state.counter
}))(Counter);
