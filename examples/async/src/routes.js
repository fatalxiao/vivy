/**
 * @file routes.js
 */

import {AsyncComponent} from 'vivy';

export function configureRoutes(store) {
    return [{
        path: '/',
        component: AsyncComponent(() => import('./modules/A/containers/A'), store, [
            () => import('./modules/A/models/a')
        ]),
        routes: [{}]
    }];
}
