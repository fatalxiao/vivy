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
    dispatch, updateRightValue
}) => {

    /**
     * Update left value to model
     * @type {(function(*): void)|*}
     */
    const handleLeftValueChange = useCallback(e => {

        // Use "dispatch" to dispatch an action
        dispatch?.({
            type: 'calculation/updateLeftValue',
            value: e?.target?.value
        });

    }, [
        dispatch
    ]);

    /**
     * Update right value to model
     * @type {(function(*): void)|*}
     */
    const handleRightValueChange = useCallback(e => {

        // Use "updateRightValue" to dispatch an action by using "bindModelActionCreators"
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

    dispatch: PropTypes.func,
    updateRightValue: PropTypes.func

};

export default connect(state => ({
    leftValue: state.calculation.leftValue,
    rightValue: state.calculation.rightValue
}), dispatch => bindModelActionCreators({
    dispatch,
    updateRightValue: 'calculation/updateRightValue'
}, dispatch))(Calculation);
