import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path  : 'conference' , 
        pathMatch : 'full',
        loadComponent : () => import('./pages/conference-page.component')
    }
];
