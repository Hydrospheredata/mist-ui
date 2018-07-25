import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FunctionsWrapperComponent, FunctionsListComponent, FunctionsItemDetailComponent } from '@app/modules/functions/components';
import { RouterModule } from '@angular/router';
import { FunctionsRoutingModule } from '@app/modules/functions/functions.router';
import { SharedModule } from '@app/modules/shared/shared.module';
import { MdlModule } from '@angular-mdl/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from '@app/modules/functions/reducers';
import { EffectsModule } from '@ngrx/effects';
import { FunctionsEffects } from '@app/modules/functions/effects';
import { HttpFunctionService } from '@app/modules/functions/services';
import { FunctionsGuard } from '@app/modules/functions/guards';

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
    providers: [HttpFunctionService, FunctionsGuard],
})
export class FunctionsModule { }
