/**
 * @file routes.js
 */

import {AsyncComponent} from 'vivy';

export function configureRoutes(store) {
    return [{
        path: '/',
        component: AsyncComponent(() => import('./modules/Root/containers/Root'), store, [
            () => import('./modules/Root/models/root')
        ]),
        routes: [{
            path: '/a',
            component: AsyncComponent(() => import('./modules/A/containers/A'), store, [
                () => import('./modules/A/models/a')
            ]),
            routes: [{
                path: '/a/b',
                component: AsyncComponent(() => import('./modules/B/containers/B'), store, [
                    () => import('./modules/B/models/b')
                ]),
                routes: [{
                    path: '/a/b/c',
                    component: AsyncComponent(() => import('./modules/C/containers/C'), store, [
                        () => import('./modules/C/models/c')
                    ])
                }]
            }]
        }]
    }];
}
