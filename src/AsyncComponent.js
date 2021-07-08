/**
 * @file AsyncModuleComponent.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {Component} from 'react';

// Vendors
import isFunction from 'lodash/isFunction';
import {registerModel} from './index';

export default (
    getComponent,
    store,
    getModels
) => class AsyncModuleComponent extends Component {

    // 使用 babel-plugin-transform-import-sync 加快开发环境编译速度
    // static IS_SYNC = process.env.NODE_ENV.includes('development');

    constructor(props) {

        super(props);

        this.state = {

            /**
             * 存储调用 getComponent() 后获取到的 component
             */
            Component: null

        };

    }

    async componentDidMount() {
        await this.init();
    }

    /**
     * 如果 Component 为空，开始加载
     * @returns {Promise<void>}
     */
    init = async () => {

        if (this.state.Component) {
            return;
        }

        this.loadStartCallback();

        await this.loadModels();
        await this.loadComponent();

        this.loadCompleteCallback();

    };

    /**
     * 开始加载 component 的回调
     */
    loadStartCallback = () => {
        store?.dispatch({
            type: 'moduleComponentLoading/start'
        });
    };

    /**
     * 加载 component 完成的回调
     */
    loadCompleteCallback = () => {
        store?.dispatch({
            type: 'moduleComponentLoading/complete'
        });
    };

    /**
     * 加载 model
     * @returns {Promise<void>}
     */
    loadModel = async getModel => {

        if (!getModel || !isFunction(getModel)) {
            return;
        }

        // // 开发环境同步加载
        // if (AsyncModuleComponent.IS_SYNC) {
        //     const model = getModel();
        //     registerModel(store, model);
        //     return;
        // }

        // 其他环境异步加载
        const model = await getModel();
        registerModel(store, model.default || model);

    };

    /**
     * 加载 models
     * @returns {Promise<void>}
     */
    loadModels = async () => {

        if (!getModels || getModels?.length < 1) {
            return;
        }

        await Promise.all(getModels.map(getModel => this.loadModel(getModel)));

    };

    /**
     * 加载 component
     * 根据不同环境使用不同的调用方式
     * @returns {Promise<void>}
     */
    loadComponent = async () => {

        if (!getComponent || !isFunction(getComponent)) {
            return;
        }

        // // 开发环境同步加载
        // if (AsyncModuleComponent.IS_SYNC) {
        //     this.setState({
        //         Component: getComponent()
        //     });
        //     return;
        // }

        // 其他环境异步加载
        const component = await getComponent();
        this.setState({
            Component: component.default || component
        });

    };

    render() {

        const {Component} = this.state;

        if (Component) {
            return <Component {...this.props}/>;
        }

        return null;

    }

};
