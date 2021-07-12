/**
 * @file AsyncModuleComponent.js
 */

import React, {useState, useCallback, useEffect} from 'react';

import {
    ASYNC_COMPONENT_LOADING_START, ASYNC_COMPONENT_LOADING_COMPLETE
} from '../actionTypes/AsyncComponentLoading';

export default (getComponent, store, getModels) => props => {

    /**
     * component from getComponent
     */
    const [Cpn, setCpn] = useState(null);

    /**
     * dispatch starting load component action
     * @type {(function(): void)|*}
     */
    const loadStartCallback = useCallback(() => {
        store?.dispatch({
            type: ASYNC_COMPONENT_LOADING_START
        });
    }, []);

    /**
     * dispatch loading component complete action
     * @type {(function(): void)|*}
     */
    const loadCompleteCallback = useCallback(() => {
        store?.dispatch({
            type: ASYNC_COMPONENT_LOADING_COMPLETE
        });
    }, []);

    /**
     * load model from getModel
     * @type {(function(*=): Promise<void>)|*}
     */
    const loadModel = useCallback(async getModel => {

        if (!getModel || typeof getModel !== 'function') {
            return;
        }

        const model = await getModel();
        store?.registerModel(model.default || model);

    }, []);

    /**
     * load models from getModels
     * @type {(function(): Promise<void>)|*}
     */
    const loadModels = useCallback(async () => {

        if (!getModels || getModels?.length < 1) {
            return;
        }

        await Promise.all(getModels.map(getModel => loadModel(getModel)));

    }, [
        loadModel
    ]);

    /**
     * load component from getComponent
     * @type {(function(): Promise<void>)|*}
     */
    const loadComponent = useCallback(async () => {

        if (!getComponent || typeof getComponent !== 'function') {
            return;
        }

        const component = await getComponent();
        setCpn(component.default || component);

    }, []);

    /**
     * init getting models and component
     * @type {(function(): Promise<void>)|*}
     */
    const init = useCallback(async () => {

        if (Cpn) {
            return;
        }

        loadStartCallback();

        await loadModels();
        await loadComponent();

        loadCompleteCallback();

    }, [
        Cpn,
        loadCompleteCallback, loadComponent, loadModels, loadStartCallback
    ]);

    useEffect(() => {

        /**
         * call init
         * @returns {Promise<void>}
         */
        async function callInit() {
            await init();
        }

        callInit();

    }, [
        init
    ]);

    return Cpn ?
        <Cpn {...props}/>
        :
        null;

};
