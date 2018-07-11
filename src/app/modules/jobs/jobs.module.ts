import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsWrapperComponent, JobsListComponent, JobsItemDetailComponent, JobLogsComponent, JobsOverviewComponent } from './components';
import { RouterModule } from '@angular/router';
import { JobsRoutingModule } from '@app/modules/jobs/jobs.router';
import { SharedModule } from '@app/modules/shared/shared.module';
import { MdlModule } from '@angular-mdl/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from '@jobs/reducers';
import { JobsEffects } from '@jobs/effects';
import { HttpJobService, WebSocketJobService } from '@jobs/services';

@NgModule({
    declarations: [
        JobsWrapperComponent, JobsListComponent, JobsItemDetailComponent, JobLogsComponent, JobsOverviewComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        JobsRoutingModule,
        SharedModule,
        MdlModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature('jobs', reducers),
        EffectsModule.forFeature([JobsEffects])
    ],
    exports: [],
    providers: [HttpJobService, WebSocketJobService],
})
export class JobsModule { }
