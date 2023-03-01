/**
 * @file Pyramid.js
 */

import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-vivy';
import {bindModelActionCreators} from 'vivy';

// Vendors
import classNames from 'classnames';

const Pyramid = ({
    data, errors,
    update
}) => {

    /**
     * Check whether input value is error
     * @type {function(*, *): boolean}
     */
    const isError = useCallback((rowIndex, colIndex) => {
        return errors.findIndex(item =>
            item.rowIndex === rowIndex && item.colIndex === colIndex
        ) !== -1;
    }, [
        errors
    ]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: 192
        }}>
            {
                data.map((row, rowIndex) =>
                    <div key={rowIndex}
                         style={{
                             display: 'flex',
                             justifyContent: 'center',
                             alignContent: 'center',
                             marginTop: 8
                         }}>
                        {
                            row.map((value, colIndex) =>
                                <input key={`${rowIndex}-${colIndex}`}
                                       className={classNames('pyramid-cell', {
                                           error: isError(rowIndex, colIndex)
                                       })}
                                       style={{
                                           width: 32,
                                           height: 32,
                                           marginLeft: 8,
                                           textAlign: 'center'
                                       }}
                                       value={value}
                                       onChange={e => update({
                                           rowIndex,
                                           colIndex,
                                           value: e.target.value
                                       })}/>
                            )
                        }
                    </div>
                )
            }
        </div>
    );

};

Pyramid.propTypes = {

    data: PropTypes.array,
    errors: PropTypes.array,

    update: PropTypes.func

};

export default connect(state => ({
    data: state.pyramid.data,
    errors: state.pyramid.errors
}), dispatch => bindModelActionCreators({
    update: 'pyramid/update'
}, dispatch))(Pyramid);
