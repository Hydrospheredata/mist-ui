import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '@app/app.router';
import { AppComponent } from '@app/app.component';

import {
    DialogJobLogsComponent,
    DialogJobFormComponent,
    DialogFullScreenJsonComponent,
    DialogFunctionFormComponent,
    DialogAddContextComponent,
    DialogCloneJobFormComponent,
    DialogDeleteConfirmationComponent
} from '@app/components/dialogs/_index';

import { WorkersModule } from '@app/modules/workers/workers.module';
import { CoreModule } from '@app/modules/core/core.module';
import { SharedModule } from '@app/modules/shared/shared.module';
import { JobsModule } from '@app/modules/jobs/jobs.module';
import { FunctionsModule } from '@app/modules/functions/functions.module';



@NgModule({
    declarations: [
        AppComponent,
        DialogJobFormComponent,
        DialogFunctionFormComponent,
        DialogAddContextComponent,
        DialogFullScreenJsonComponent,
        DialogJobLogsComponent,
        DialogCloneJobFormComponent,
        DialogDeleteConfirmationComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        CoreModule,
        SharedModule,
        WorkersModule,
        JobsModule,
        FunctionsModule,
    ],
    entryComponents: [
        DialogJobFormComponent,
        DialogFullScreenJsonComponent,
        DialogFunctionFormComponent,
        DialogAddContextComponent,
        DialogJobLogsComponent,
        DialogCloneJobFormComponent,
        DialogDeleteConfirmationComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
