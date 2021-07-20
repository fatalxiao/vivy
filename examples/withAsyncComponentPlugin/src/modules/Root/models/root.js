/**
 * @file root.js
 */

/**
 * Menu config
 * @type {[]}
 */
const MENU = [{
    name: 'Root',
    route: '/'
}, {
    name: 'Module A',
    route: '/a'
}, {
    name: 'Module B',
    route: '/b'
}, {
    name: 'Module C',
    route: '/c'
}];

/**
 * Get activated menu by current pathname
 * @param pathname
 * @returns {{}}
 */
function getActivatedMenu(pathname) {
    return MENU.find(item => item?.route === pathname);
}

export default {
    nameSpace: 'root',
    state: {

        /**
         * Menu config
         */
        menu: MENU,

        /**
         * Current activated menu
         */
        activatedMenu: getActivatedMenu(location.pathname)

    },
    reducers: {

        /**
         * Update activated menu
         * @param state
         * @param activatedMenu
         * @returns {*&{activatedMenu}}
         */
        updateActivatedMenu: (state, {activatedMenu}) => {
            return {
                ...state,
                activatedMenu
            };
        }

    },
    subscriptions: {

        /**
         * A subscription to update activated menu when history change
         * @param history
         * @returns {function(*, *): *}
         */
        activatedMenuSubscription: ({history}) => (dispatch, getState) => {
            return history.listen(({pathname}) => dispatch({
                type: 'root/updateActivatedMenu',
                activatedMenu: getActivatedMenu(pathname)
            }));
        }

    }
};
