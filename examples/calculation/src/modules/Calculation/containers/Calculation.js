/**
 * @file Calculation.js
 */

import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindModelActionCreators} from 'vivy';

// Styles
import './Calculation.scss';

const Calculation = ({
    leftValue, rightValue,
    updateLeftValue, updateRightValue
}) => {

    const handleLeftValueChange = useCallback(e => {
        updateLeftValue?.({
            value: e?.target?.value
        });
    }, [
        updateLeftValue
    ]);

    const handleRightValueChange = useCallback(e => {
        updateRightValue?.({
            value: e?.target?.value
        });
    }, [
        updateRightValue
    ]);

    return (
        <div className="calculation">
            <input value={leftValue}
                   onChange={handleLeftValueChange}/>
            &nbsp;
            +
            &nbsp;
            <input value={rightValue}
                   onChange={handleRightValueChange}/>
            &nbsp;
            =
            &nbsp;
            {leftValue + rightValue}
        </div>
    );

};

Calculation.propTypes = {

    leftValue: PropTypes.number,
    rightValue: PropTypes.number,

    updateLeftValue: PropTypes.func,
    updateRightValue: PropTypes.func

};

export default connect(state => ({
    leftValue: state.calculation.leftValue,
    rightValue: state.calculation.rightValue
}), dispatch => bindModelActionCreators({
    updateLeftValue: 'calculation/updateLeftValue',
    updateRightValue: 'calculation/updateRightValue'
}, dispatch))(Calculation);
