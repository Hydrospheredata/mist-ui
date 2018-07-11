import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FunctionsWrapperComponent, FunctionsListComponent, FunctionsItemDetailComponent } from './components';
import { RouterModule } from '@angular/router';
import { FunctionsRoutingModule } from './functions.router';
import { SharedModule } from '@shared/shared.module';
import { MdlModule } from '@angular-mdl/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from '@functions/reducers';
import { EffectsModule } from '@ngrx/effects';
import { FunctionsEffects } from '@functions/effects';
import { HttpFunctionService } from '@functions/services';

@NgModule({
    declarations: [FunctionsWrapperComponent, FunctionsListComponent, FunctionsItemDetailComponent],
    imports: [
        CommonModule,
        RouterModule,
        FunctionsRoutingModule,
        SharedModule,
        MdlModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature('functions', reducers),
        EffectsModule.forFeature([FunctionsEffects])
    ],
    exports: [],
    providers: [HttpFunctionService],
})
export class FunctionsModule { }
