/**
 * @file Calculation.js
 */

import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-vivy';
import {bindModelActionCreators} from 'vivy';

const wrapperStyle = {
    display: 'flex',
    width: 200,
    flexDirection: 'column',
    alignItems: 'flex-end'
};

const inputStyle = {
    padding: 8,
    margin: 8,
    textAlign: 'right'
};

const hrStyle = {
    width: '100%'
};

const Calculation = ({
    value1, value2, value3, value4,
    dispatch, updateValue1
}) => {

    /**
     * Update value1 to model
     * @type {(function(*): void)|*}
     */
    const handleValue1Change = useCallback(e => {

        // Use "updateValue1" to dispatch an action by using "bindModelActionCreators"
        updateValue1?.({
            value: +e?.target?.value
        });

    }, [
        updateValue1
    ]);

    /**
     * Update value2 to model
     * @type {(function(*): void)|*}
     */
    const handleValue2Change = useCallback(e => {

        // Use "dispatch" to dispatch an action
        dispatch?.({
            type: 'calculation/updateValue2',
            value: +e?.target?.value
        });

    }, [
        dispatch
    ]);

    /**
     * Update value3 to model
     * @type {(function(*): void)|*}
     */
    const handleValue3Change = useCallback(e => {

        // Use "dispatch.nameSpace.reducerName" to dispatch an action
        dispatch.calculation.updateValue3({
            value: +e?.target?.value
        });

    }, [
        dispatch
    ]);

    /**
     * Update value4 to model
     * @type {(function(*): void)|*}
     */
    const handleValue4Change = useCallback(e => {

        // Use build-in "setState reducer" update model state
        dispatch?.({
            type: 'calculation/setState',
            nextState: state => ({
                ...state,
                value4: +e?.target?.value
            })
        });

    }, [
        dispatch
    ]);

    return (
        <div style={wrapperStyle}>
            <div>
                <input style={inputStyle}
                       value={value1}
                       onChange={handleValue1Change}/>
            </div>
            <div>
                +
                <input style={inputStyle}
                       value={value2}
                       onChange={handleValue2Change}/>
            </div>
            <div>
                +
                <input style={inputStyle}
                       value={value3}
                       onChange={handleValue3Change}/>
            </div>
            <div>
                +
                <input style={inputStyle}
                       value={value4}
                       onChange={handleValue4Change}/>
            </div>
            <hr style={hrStyle}/>
            {value1 + value2 + value3 + value4}
        </div>
    );

};

Calculation.propTypes = {

    value1: PropTypes.number,
    value2: PropTypes.number,
    value3: PropTypes.number,
    value4: PropTypes.number,

    dispatch: PropTypes.func,
    updateValue1: PropTypes.func

};

export default connect(state => ({
    value1: state.calculation.value1,
    value2: state.calculation.value2,
    value3: state.calculation.value3,
    value4: state.calculation.value4
}), dispatch => bindModelActionCreators({
    dispatch,
    updateValue1: 'calculation/updateValue1'
}, dispatch))(Calculation);
