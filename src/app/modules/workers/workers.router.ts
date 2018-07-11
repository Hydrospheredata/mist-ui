import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WorkersWrapperComponent, WorkersItemDetailComponent } from '@app/modules/workers/components';

const routes: Routes = [
    {
        path: 'workers',
        component: WorkersWrapperComponent,
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
