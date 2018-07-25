import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { JobsGuard } from '@app/modules/jobs/guards';

export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        canActivate: [JobsGuard]
    }
];



@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }

