import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { canDeactivateGuard } from './guards/can-deactivate.guard';
// import { MedPricingParentComponent } from './components/med-pricing-parent/med-pricing-parent';

export const routes: Routes = [
    // { path: '', loadComponent: () => import('./components/app-med/app-med.component').then(m => m.AppMedComponent) },
    { path: '', loadComponent: () => import('./components/user-login/user-login').then(m => m.UserLoginFromComponent) },
    { path: 'user-login', loadComponent: () => import('./components/user-login/user-login').then(m => m.UserLoginFromComponent) },
    { path: 'add', loadComponent: () => import('./components/add-med/add-med.component').then(m => m.AddMedComponent) },
    { path: 'medList', data: { preload: true },
    canActivate: [authGuard],
    loadComponent: () => import('./components/med-list/med-list.component').then(m => m.MedListComponent) },     
    { path: 'add-reactive',loadComponent: () => import('./components/add-med-reactive/add-med-reactive').then(m => m.AddMedReactiveComponent) },
    
    // Protects this route and its children, 
    {path:'add-med-signal',canActivate: [authGuard],loadComponent:()=>import('./components/add-med-signalforms/add-med-signalforms').then(m=>m.AddMedSignalFromsComponent)},
    {path:'med-list-signal',loadComponent:()=>import('./components/med-list-signal/med-list-signal').then(m=>m.MedListSignal)},

    // {path:'med-pricing-parent',component:MedPricingParentComponent},

     //{path:'med-pricing-child',loadComponent:()=>import('./components/med-pricing-child/med-pricing-child').then(m=>m.MedPricingChildComponent)},

    // {
    //     path:'med-pricing-parent',
    //      // 1. Lazy load the parent component first
    //     loadComponent:()=>import('./components/med-pricing-parent/med-pricing-parent').then(m=>m.MedPricingParentComponent),
        
    //     // 2. Define nested views that render inside the parent's <router-outlet>
    //     children: [
    //         {
    //             path: 'med-pricing-child', // Accessible via the browser URL: /med-pricing-parent/med-pricing-child

    //             // 3. Lazy load the child component only when this URL path is activated
    //             loadComponent:()=>import('./components/med-pricing-child/med-pricing-child').then(m=>m.MedPricingChildComponent)
    //         }
    //     ]
    // },

    {
        path:'med-pricing-parent',
        
        data: { preload: true },
        canActivate: [authGuard],

        //canActivate: [hasRole('Admin')],        

        // Pass data configurations here if using router-outlet on parent component
        //data: { role: 'admin', tier: 'premium' },

         // 1. Lazy load the parent component first
        loadComponent:()=>import('./components/med-pricing-parent/med-pricing-parent').then(m=>m.MedPricingParentComponent),
        
        canDeactivate: [canDeactivateGuard], // Catches exit attempts
        
        // 2. Define nested views that render inside the parent's <router-outlet>
        children: [
            // Fix: Tells Angular what to render immediately when navigating to '/parent'
            // { 
            //     path: '', 
            //     redirectTo: 'view-child', 
            //     pathMatch: 'full' 
            // },
            {
                path: 'med-pricing-child', // Accessible via the browser URL: /med-pricing-parent/med-pricing-child
                canActivate: [authGuard],
                // 3. Lazy load the child component only when this URL path is activated
                loadComponent:()=>import('./components/med-pricing-child/med-pricing-child').then(m=>m.MedPricingChildComponent)
            }
        ]
    },

   
];
