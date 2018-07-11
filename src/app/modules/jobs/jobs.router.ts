import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JobsWrapperComponent, JobsItemDetailComponent } from '@app/modules/jobs/components';
import { JobsOverviewComponent } from '@app/modules/jobs/components/jobs-overview.component/jobs-overview.component';

const routes: Routes = [
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
                component: JobsOverviewComponent
            },
            {
                path: ':functionId/:jobId',
                component: JobsItemDetailComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class JobsRoutingModule { }
