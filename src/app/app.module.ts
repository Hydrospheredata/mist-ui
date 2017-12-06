import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { routing } from './app.router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Location } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// material modules
import { MdlModule, MdlDialogModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select'

// codemirror
import { CodemirrorModule } from 'ng2-codemirror';

// clipboard copy module
import { ClipboardModule } from '@node_modules/ngx-clipboard';

// components
import { AppComponent } from './app.component';
import { HomeComponent } from '@components/home/home.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { EndpointListComponent } from '@components/jobs-wrapper/endpoint-list/endpoint-list.component';
import { EndpointDetailsComponent } from '@components/jobs-wrapper/endpoint-details/endpoint-details.component';
import { JobDetailsComponent } from '@components/jobs-wrapper/job-details/job-details.component';
import { JobsWrapperComponent } from '@components/jobs-wrapper/jobs-wrapper.component';
import { InputTextComponent } from '@components/form/input-text/input-text.component';
import { InputTextareaComponent } from '@components/form/input-textarea/input-textarea.component';
import { JobLogsComponent } from '@components/jobs-wrapper/job-logs/job-logs.component';
import { FunctionsWrapperComponent, FunctionsItemDetailComponent, FunctionsListComponent } from '@components/functions/_index';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { ClustersWrapperComponent } from '@components/clusters-wrapper/clusters-wrapper.component';
import { WorkersListComponent } from '@components/clusters-wrapper/workers-list/workers-list.component';
import { WorkerComponent } from '@components/clusters-wrapper/worker/worker.component';
import { LoaderComponent } from '@components/loader/loader.component';
import { AlertComponent } from '@components/alert/alert.component';

import { 
    DialogJobLogsComponent,
    DialogJobFormComponent,
    DialogFullScreenJsonComponent,
    DialogEndpointFormComponent,
    DialogAddContextComponent,
    DialogCloneJobFormComponent
} from '@components/dialogs/_index';

// services
import { 
    HttpEndpointService,
    HttpJobService,
    HttpContextsService,
    HttpArtifactsService,
    FormsService,
    WebSocketJobService,
    HttpService,
    LoaderService,
    MistRequestOptions,
    HttpWorkersService
} from '@services/_index';

// factories
import { httpServiceFactory } from './factories/http-service-factory';

// stores
import { 
    JobStore, 
    EndpointStore, 
    ContextStore, 
    WorkersStore 
} from '@stores/_index';

// pipes
import { 
    JobStatusFilterPipe,
    AgoDatePipe,
    SearchPipe,
    SortByPipe,
    JobIdCutPipe,
    ReplaceToBrNewLineCharPipe
} from '@pipes/_index';



@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavbarComponent,
        EndpointListComponent,
        EndpointDetailsComponent,
        DialogJobFormComponent,
        JobDetailsComponent,
        DialogEndpointFormComponent,
        DialogAddContextComponent,
        DialogFullScreenJsonComponent,
        DialogJobLogsComponent,
        InputTextComponent,
        InputTextareaComponent,
        JobsWrapperComponent,
        JobLogsComponent,
        DialogCloneJobFormComponent,
        LoaderComponent,
        AlertComponent,
        FunctionsWrapperComponent, 
        FunctionsItemDetailComponent,
        FunctionsListComponent,
        SidebarComponent,
        // pipes
        SearchPipe,
        AgoDatePipe,
        JobStatusFilterPipe,
        SortByPipe,
        JobIdCutPipe,
        ReplaceToBrNewLineCharPipe,
        ClustersWrapperComponent,
        WorkersListComponent,
        WorkerComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing,
        // material modules
        BrowserAnimationsModule,
        MdlModule,
        MdlDialogModule,
        MdlSelectModule,
        // codemirror
        CodemirrorModule,
        FlexLayoutModule,
        ClipboardModule
    ],
    entryComponents: [
        DialogJobFormComponent,
        DialogFullScreenJsonComponent,
        DialogEndpointFormComponent,
        DialogAddContextComponent,
        DialogJobLogsComponent,
        DialogCloneJobFormComponent
    ],
    providers: [
        HttpEndpointService,
        HttpJobService,
        HttpArtifactsService,
        WebSocketJobService,
        JobStore,
        EndpointStore,
        WorkersStore,
        HttpContextsService,
        ContextStore,
        HttpService,
        LoaderService,
        HttpWorkersService,
        {
            provide: HttpService,
            useFactory: httpServiceFactory,
            deps: [XHRBackend, RequestOptions, Location, LoaderService ]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
