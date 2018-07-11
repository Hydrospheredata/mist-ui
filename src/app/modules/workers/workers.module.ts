import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkersListComponent, WorkersItemDetailComponent, WorkersWrapperComponent } from './components';
import { SharedModule } from '@app/modules/shared/shared.module';
import { MdlModule } from '@angular-mdl/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WorkersRoutingModule } from './workers.router';
import { StoreModule } from '@ngrx/store';
import { reducers } from '@workers/reducers';
import { EffectsModule } from '@ngrx/effects';
import { WorkersEffects } from '@workers/effects';
import { HttpWorkersService } from '@workers/services';

@NgModule({
    declarations: [
        WorkersListComponent,
        WorkersItemDetailComponent,
        WorkersWrapperComponent,
    ],
    imports: [
        RouterModule,
        WorkersRoutingModule,
        CommonModule,
        SharedModule,
        MdlModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature('workers', reducers),
        EffectsModule.forFeature([WorkersEffects])
    ],
    exports: [],
    providers: [HttpWorkersService],
})
export class WorkersModule { }
