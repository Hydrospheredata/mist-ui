import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { EndpointsListComponent } from './components/endpoints-list/endpoints-list.component';

// Route Configuration
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'endpoints',
    component: EndpointsListComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
