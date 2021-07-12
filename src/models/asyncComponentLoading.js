/**
 * @file asyncComponentLoading.js
 */

export default {
    nameSpace: 'asyncComponentLoading',
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
