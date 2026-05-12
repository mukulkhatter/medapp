import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', loadComponent: () => import('./components/app-med/app-med.component').then(m => m.AppMedComponent)},
    {path: 'add', loadComponent: () => import('./components/add-med/add-med.component').then(m => m.AddMedComponent)},
    {path: 'medList', loadComponent: () => import('./components/med-list/med-list.component').then(m => m.MedListComponent)},

];
