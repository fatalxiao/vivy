/**
 * @file Root.js
 */

import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Components
import A from '../../A/containers/A';
import B from '../../B/containers/B';
import C from '../../C/containers/C';

// Styles
import './Root.scss';

const Root = ({
    value,
    dispatch
}) => {

    /**
     * Update input value to root model
     * @type {(function(*): void)|*}
     */
    const handleChange = useCallback(e => {
        dispatch?.({
            type: 'root/update',
            value: e.target.value
        });
    }, [
        dispatch
    ]);

    /**
     * Sync value to all "sync" global reducers
     * @type {(function(): void)|*}
     */
    const handleSync = useCallback(() => {
        dispatch?.({
            type: 'sync',
            value
        });
    }, [
        value,
        dispatch
    ]);

    return (
        <div className="root">

            <div>

                <input value={value}
                       onChange={handleChange}/>

                <button onClick={handleSync}>
                    Sync value
                </button>

            </div>

            <div className="modules">
                <A/>
                <B/>
                <C/>
            </div>

        </div>
    );

};

Root.propTypes = {
    value: PropTypes.string,
    dispatch: PropTypes.func
};

export default connect(state => ({
    value: state.root
}))(Root);
