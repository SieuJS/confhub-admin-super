import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path  : 'conference' , 
        children : [
            {
                path : 'import',
                pathMatch : 'full',
                loadComponent : () => import('./pages/conference-import-page.component')
            },
            {
                path : '',
                pathMatch : 'full',
                loadComponent : () => import('./pages/conference-page.component')
            },

        ]
    }
];
