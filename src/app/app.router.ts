import { ModuleWithProviders, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '@components/home/home.component';
import { JobsWrapperComponent } from '@components/jobs-wrapper/jobs-wrapper.component'
import { FunctionListComponent } from '@components/jobs-wrapper/function-list/function-list.component';
import { FunctionDetailsComponent } from '@components/jobs-wrapper/function-details/function-details.component';
import { JobDetailsComponent } from '@components/jobs-wrapper/job-details/job-details.component';
import { ClustersWrapperComponent } from '@components/clusters-wrapper/clusters-wrapper.component';
import { WorkerComponent } from '@components/clusters-wrapper/worker/worker.component';
import {WorkersListComponent} from '@components/clusters-wrapper/workers-list/workers-list.component';

import { FunctionsWrapperComponent, FunctionsItemDetailComponent } from '@components/functions/_index';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'jobs',
        pathMatch: 'full'
    },
    {
        path: 'clusters',
        component: ClustersWrapperComponent,
        children: [
            {
                path: '',
                redirectTo: 'workers/overview',
                pathMatch: 'full'
            },
            {
                path: 'workers/:workerId',
                pathMatch: 'prefix',
                component: WorkerComponent
            }
        ]
    },
    {
        path: 'jobs',
        component: JobsWrapperComponent,
        children: [
            {
                path: '',
                redirectTo: 'overview',
                pathMatch: 'full'
            },
            {
                path: ':functionId',
                component: FunctionDetailsComponent
            },
            {
                path: ':functionId/:jobId',
                component: JobDetailsComponent
            }
        ]
    },
    {
        path: 'functions',
        component: FunctionsWrapperComponent,
        children: [
            {
                path: ':functionId',
                component: FunctionsItemDetailComponent
            }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
