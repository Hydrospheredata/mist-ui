import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FunctionsWrapperComponent, FunctionsItemDetailComponent } from '@app/modules/functions/components';
import { FunctionsGuard } from '@app/modules/functions/guards';

const routes: Routes = [
    {
        path: 'functions',
        component: FunctionsWrapperComponent,
        canActivate: [FunctionsGuard],
        children: [
            {
                path: ':functionId',
                component: FunctionsItemDetailComponent
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
export class FunctionsRoutingModule { }
