/**
 * @file Pyramid.js
 */

import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindModelActionCreators} from 'vivy';

// Vendors
import classNames from 'classnames';

// Styles
import './Pyramid.scss';

const Pyramid = ({
    data, errors,
    update
}) => {

    const isError = useCallback((rowIndex, colIndex) => {
        return errors.findIndex(item =>
            item.rowIndex === rowIndex && item.colIndex === colIndex
        ) !== -1;
    }, [
        errors
    ]);

    return (
        <div className="pyramid">
            {
                data.map((row, rowIndex) =>
                    <div key={rowIndex}
                         className="pyramid-row">
                        {
                            row.map((value, colIndex) =>
                                <input key={`${rowIndex}-${colIndex}`}
                                       className={classNames('pyramid-cell', {
                                           error: isError(rowIndex, colIndex)
                                       })}
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
