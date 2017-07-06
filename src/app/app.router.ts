import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { JobsWrapperComponent } from '@components/jobs-wrapper/jobs-wrapper.component'
import { EndpointListComponent } from '@components/jobs-wrapper/endpoint-list/endpoint-list.component';
import { EndpointDetailsComponent } from '@components/jobs-wrapper/endpoint-details/endpoint-details.component';
import { JobDetailsComponent } from '@components/jobs-wrapper/job-details/job-details.component';


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
    path: 'jobs',
    component: JobsWrapperComponent,
    children: [
      {
        path: ':endpointId',
        pathMatch: 'prefix',
        component: EndpointDetailsComponent
      },
      {
        path: ':endpointId/:jobId',
        pathMatch: 'prefix',
        component: JobDetailsComponent
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
