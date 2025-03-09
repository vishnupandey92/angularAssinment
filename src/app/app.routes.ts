import { Routes } from '@angular/router';
import { LayoutsComponent } from './core/components/layouts/layouts/layouts.component';
import { routerConstant } from './core/constant/routerConstant';

export const routes: Routes = [
    {
        path:"",
        component:LayoutsComponent,
        children:[
            {
                path:routerConstant.counter,
                loadComponent:() => import('./pages/counter/counter.component').then(c => c.CounterComponent)
            },
            {
                path:routerConstant.vatavaran,
                loadComponent:() => import('./pages/vatavaran/vatavaran.component').then(c => c.VatavaranComponent)
            },
            {
                path:'',
                redirectTo:routerConstant.counter,
                pathMatch:'full'
            },
            { 
                path: '**', 
                loadComponent:() => import('./pages/nopagefound/nopagefound.component').then(c => c.NopagefoundComponent) 
            }
        ]
    }
];
