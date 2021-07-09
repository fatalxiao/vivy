/**
 * @file asyncComponentLoading.js
 */

export default {
    nameSpace: '@@VIVY/ASYNC_COMPONENT_LOADING',
    state: false,
    reducers: {

        /**
         * start loading async component
         */
        start: () => {
            return true;
        },

        /**
         * load async component complete
         */
        complete: () => {
            return false;
        }

    }
};
