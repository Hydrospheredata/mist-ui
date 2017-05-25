import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { EndpointListComponent } from './components/endpoint-list/endpoint-list.component';
import { EndpointDetailsComponent } from './components/endpoint-details/endpoint-details.component'

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
    component: EndpointListComponent,
    children: [
      { path: ':name', component: EndpointDetailsComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
