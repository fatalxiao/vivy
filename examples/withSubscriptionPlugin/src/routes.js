/**
 * @file routes.js
 */

// Components
import Root from './modules/Root/containers/Root';
import A from './modules/A/containers/A';
import B from './modules/B/containers/B';
import C from './modules/C/containers/C';

/**
 * Get route config
 * @returns {[]}
 */
export function configureRoutes() {
    return [{
        path: '/',
        component: Root,
        routes: [{
            path: '/a',
            component: A
        }, {
            path: '/b',
            component: B
        }, {
            path: '/c',
            component: C
        }]
    }];
}
