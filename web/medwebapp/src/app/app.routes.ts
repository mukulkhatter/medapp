import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

export const routes: Routes = [
    { path: '', redirectTo: 'add', pathMatch: 'full' },
    { path: 'add', data: { log: false }, canActivate: [MsalGuard], loadComponent: () => import('./components/add-med/add-med.component').then(m => m.AddMedComponent) },
    { path: 'medList', loadComponent: () => import('./components/med-list/med-list.component').then(m => m.MedListComponent) },
    { path: 'add-reactive', loadComponent: () => import('./components/add-med-reactive/add-med-reactive').then(m => m.AddMedReactiveComponent) },
];
