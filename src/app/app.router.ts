import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { EndpointListComponent } from './components/endpoint-list/endpoint-list.component';

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
    component: EndpointListComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
