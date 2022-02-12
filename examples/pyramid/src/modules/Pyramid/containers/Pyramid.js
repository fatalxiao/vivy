/**
 * @file Pyramid.js
 */

import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindModelActionCreators} from 'vivy';

// Styles
import './Pyramid.scss';

const Pyramid = ({
    data,
    random, update
}) => {

    useEffect(() => {
        random?.();
    }, [
        random
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
                                       className="pyramid-cell"
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

    random: PropTypes.func,
    update: PropTypes.func

};

export default connect(state => ({
    data: state.pyramid.data
}), dispatch => bindModelActionCreators({
    random: 'pyramid/random',
    update: 'pyramid/update'
}, dispatch))(Pyramid);
