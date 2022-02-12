/**
 * @file Pyramid.js
 */

import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Styles
import './Pyramid.scss';

const Pyramid = ({
    pyramidData
}) => {

    /**
     * Get pyramid row data
     * @type {(function(*): (*))|*}
     */
    const getRowData = useCallback(rowIndex => {

        if (rowIndex === pyramidData.length - 1) {
            return [...pyramidData];
        }

        return new Array(rowIndex + 1).fill('');

    }, [
        pyramidData
    ]);

    return (
        <div className="pyramid">
            {
                pyramidData.map((row, rowIndex) =>
                    <div key={rowIndex}
                         className="pyramid-row">
                        {
                            getRowData(rowIndex).map((item, colIndex) =>
                                <input key={`${rowIndex}-${colIndex}`}
                                       className="pyramid-cell"
                                       value={item}/>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
};

Pyramid.propTypes = {
    pyramidData: PropTypes.array
};

export default connect(state => ({
    pyramidData: state.pyramid
}))(Pyramid);
