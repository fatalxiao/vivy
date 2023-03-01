/**
 * @file Calculation.js
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect, useModel} from 'react-vivy';
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
     * Get state and reducer from model "calculation" using hook "useModel".
     */
    const [{value0}, {updateValue0}] = useModel('calculation');

    return (
        <div style={wrapperStyle}>
            <div>
                +
                <input style={inputStyle}
                       value={value0}
                       onChange={e => updateValue0?.({
                           value: +e?.target?.value
                       })}/>
            </div>
            <div>
                <input style={inputStyle}
                       value={value1}
                       onChange={e => updateValue1?.({
                           value: +e?.target?.value
                       })}/>
            </div>
            <div>
                +
                <input style={inputStyle}
                       value={value2}
                       onChange={e => dispatch?.({
                           type: 'calculation/updateValue2',
                           value: +e?.target?.value
                       })}/>
            </div>
            <div>
                +
                <input style={inputStyle}
                       value={value3}
                       onChange={e => dispatch.calculation.updateValue3({
                           value: +e?.target?.value
                       })}/>
            </div>
            <div>
                +
                <input style={inputStyle}
                       value={value4}
                       onChange={e => dispatch?.({
                           type: 'calculation/setState',
                           nextState: state => ({
                               ...state,
                               value4: +e?.target?.value
                           })
                       })}/>
            </div>
            <hr style={hrStyle}/>
            {value0 + value1 + value2 + value3 + value4}
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
