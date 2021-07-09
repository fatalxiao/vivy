/**
 * @file requestApi.js
 */

export default {
    nameSpace: 'requestApi',
    state: {
        data: [],
        getDataActionType: ''
    },
    apis: {

        get: ({}) => (dispatchApi) => dispatchApi({
            api: EpPlacementPointApi.getEpPlacementPoints,
            successResMsgDisabled: true
        })

    },
    reducers: {}
};
