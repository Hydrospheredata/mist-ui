import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WorkersWrapperComponent, WorkersItemDetailComponent } from '@app/modules/workers/components';
import { WorkerGuard } from '@app/modules/workers/services';

const routes: Routes = [
    {
        path: 'workers',
        component: WorkersWrapperComponent,
        canActivate: [WorkerGuard],
        children: [
            {
                path: ':workerId',
                component: WorkersItemDetailComponent
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
export class WorkersRoutingModule { }
