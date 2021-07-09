/**
 * @file Root.js
 */

import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Styles
import './Counter.scss';

const Counter = ({
    value,
    dispatch
}) => {

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

    return (
        <div className="counter">

            Current value: {value}

            <button onClick={handlePlus}>Plus</button>
            <button onClick={handleMinus}>Minus</button>

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
