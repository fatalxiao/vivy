/**
 * @file routes.js
 */

import {AsyncComponent} from 'src';

export function configureRoutes(store) {
    return [{
        path: '/',
        component: AsyncComponent(() => import('./modules/A/containers/A'), store, [
            () => import('./modules/A/models/a')
        ]),
        routes: [{}]
    }];
}
