import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FunctionsWrapperComponent, FunctionsItemDetailComponent } from './components';

const routes: Routes = [
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

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class FunctionsRoutingModule { }
