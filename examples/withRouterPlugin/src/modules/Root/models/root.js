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

export default {
    nameSpace: 'root',
    state: {

        /**
         * Menu config
         */
        menu: MENU

    }
};
