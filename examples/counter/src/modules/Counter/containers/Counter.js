/**
 * @file Root.js
 */

import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Styles
import './Counter.scss';

const Counter = ({
    value,
    dispatch
}) => {

    const [inputValue, setInputValue] = useState(100);

    const handlePlus = useCallback(() => {
        dispatch({
            type: 'counter/plus'
        });
    }, [
        dispatch
    ]);

    const handleMinus = useCallback(() => {
        dispatch({
            type: 'counter/minus'
        });
    }, [
        dispatch
    ]);

    const handleChange = useCallback(e => {
        setInputValue(+e.target.value);
    }, []);

    const handleUpdate = useCallback(() => {
        dispatch({
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
