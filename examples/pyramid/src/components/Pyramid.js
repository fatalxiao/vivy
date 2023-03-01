/**
 * @file Pyramid.js
 */

import React from 'react';
import {useModel} from 'react-vivy';

const Pyramid = () => {

    /**
     * Get state, actions and reducers from model using hook "useModel".
     */
    const [{data, errors}, {update}] = useModel('pyramid');

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
                                       style={{
                                           width: 32,
                                           height: 32,
                                           marginLeft: 8,
                                           textAlign: 'center',
                                           borderColor: errors.find(item =>
                                               item.rowIndex === rowIndex && item.colIndex === colIndex
                                           ) ? '#f00' : undefined
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

export default Pyramid;
