import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { JobEndpointsListComponent } from './components/job-endpoints-list/job-endpoints-list.component';

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
    path: 'job-endpoints',
    component: JobEndpointsListComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
