import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.router';
import { AppComponent } from './app.component';

import {
    DialogJobLogsComponent,
    DialogJobFormComponent,
    DialogFullScreenJsonComponent,
    DialogFunctionFormComponent,
    DialogAddContextComponent,
    DialogCloneJobFormComponent
} from '@components/dialogs/_index';

import { WorkersModule } from '@workers/workers.module';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { JobsModule } from '@jobs/jobs.module';
import { FunctionsModule } from '@functions/functions.module';



@NgModule({
    declarations: [
        AppComponent,
        DialogJobFormComponent,
        DialogFunctionFormComponent,
        DialogAddContextComponent,
        DialogFullScreenJsonComponent,
        DialogJobLogsComponent,
        DialogCloneJobFormComponent,
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
        DialogCloneJobFormComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
