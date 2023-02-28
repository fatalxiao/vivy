/**
 * @file Counter.js
 */

import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-vivy';

// Styles
import './Counter.scss';

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
        <div>

            <div className="counter">

                Current value: {value}

                <button onClick={handlePlus}>+1</button>
                <button onClick={handleMinus}>-1</button>

            </div>

            <div className="counter-updater">

                <input value={inputValue}
                       onChange={handleChange}/>

                <button className="update-button"
                        onClick={handleUpdate}>
                    Update value
                </button>

            </div>

        </div>
    );

};

Counter.propTypes = {
    value: PropTypes.number,
    dispatch: PropTypes.func
};

export default connect(state => ({
    value: state.counter
}))(Counter);
