/**
 * @file BuildInModelReducers.ts
 * @author Liangxiaojun
 */

/**
 * These reducers will be injected into each model
 */
export default {

    /**
     * Update model state
     * @param state
     * @param params
     */
    setState: (state: any, params: any) => {

        if (typeof params === 'function') {
            return params(state);
        }

        if (typeof params?.nextState === 'function') {
            return params.nextState(state);
        }

        if (params) {
            return params;
        }

        return state;

    }

};
