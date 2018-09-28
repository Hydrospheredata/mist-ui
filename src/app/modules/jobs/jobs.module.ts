import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsWrapperComponent, JobsListComponent, JobsItemDetailComponent, JobLogsComponent, JobsOverviewComponent } from '@app/modules/jobs/components';
import { RouterModule } from '@angular/router';
import { JobsRoutingModule } from '@app/modules/jobs/jobs.router';
import { SharedModule } from '@app/modules/shared/shared.module';
import { MdlModule } from '@angular-mdl/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from '@app/modules/jobs/reducers';
import { JobsEffects, JobLogsEffects, JobsRunningEffects } from '@app/modules/jobs/effects';
import { HttpJobService, WebSocketJobService, HttpLogsService, WebSocketLogsService, JobStatusesService } from '@app/modules/jobs/services';
import { JobsGuard } from '@app/modules/jobs/guards';

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
        EffectsModule.forFeature([JobsEffects, JobsRunningEffects, JobLogsEffects])
    ],
    exports: [],
    providers: [HttpJobService, WebSocketJobService, HttpLogsService, WebSocketLogsService, JobsGuard, JobStatusesService],
})
export class JobsModule { }
