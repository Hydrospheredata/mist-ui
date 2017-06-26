import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { EndpointListComponent } from './components/endpoint-list/endpoint-list.component';
import { EndpointDetailsComponent } from './components/endpoint-list/endpoint-details/endpoint-details.component'
import { JobDetailsComponent } from './components/endpoint-list/job-details/job-details.component'


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
    path: 'clusters',
    component: HomeComponent
  },
  {
    path: 'settings',
    component: HomeComponent
  },
  {
    path: 'endpoints',
    component: EndpointListComponent,
    children: [
      {
        path: ':endpointId',
        pathMatch: 'prefix',
        component: EndpointDetailsComponent
      },
      {
        path: ':endpointId/jobs/:jobId',
        pathMatch: 'prefix',
        component: JobDetailsComponent
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
