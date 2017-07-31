import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.router';
import { FlexLayoutModule } from '@angular/flex-layout';

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
import { DialogJobFormComponent } from '@components/dialogs/dialog-job-form/dialog-job-form.component';
import { JobDetailsComponent } from '@components/jobs-wrapper/job-details/job-details.component';
import { DialogFullScreenJsonComponent } from '@components/dialogs/dialog-full-screen-json/dialog-full-screen-json.component';
import { DialogAddEndpointComponent } from '@components/dialogs/dialog-add-endpoint/dialog-add-endpoint.component';
import { DialogAddContextComponent } from './components/dialogs/dialog-add-context/dialog-add-context.component';
import { JobsWrapperComponent } from '@components/jobs-wrapper/jobs-wrapper.component';
import { InputTextComponent } from '@components/form/input-text/input-text.component';
import { InputTextareaComponent } from '@components/form/input-textarea/input-textarea.component';
import { DialogJobLogsComponent } from '@components/dialogs/dialog-job-logs/dialog-job-logs.component';
import { JobLogsComponent } from '@components/jobs-wrapper/job-logs/job-logs.component';
import { DialogCloneJobFormComponent } from '@components/dialogs/dialog-clone-job-form/dialog-clone-job-form.component';

// services
import { HttpEndpointService } from '@services/http-endpoint.service';
import { HttpJobService } from '@services/http-job.service';
import { FormsService } from '@services/forms.service';
import { WebSocketJobService } from '@services/web-socket-job.service';

// stores
import { JobStore } from '@stores/job.store';
import { EndpointStore } from '@stores/endpoint.store';

// pipes
import { JobStatusFilterPipe } from '@pipes/job-status-filter.pipe';
import { AgoDatePipe } from '@pipes/ago-date.pipe';
import { SearchPipe } from '@pipes/search.pipe';
import { SortByPipe } from '@pipes/sort-by.pipe';
import { JobIdCutPipe } from './pipes/job-id-cut.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    EndpointListComponent,
    EndpointDetailsComponent,
    DialogJobFormComponent,
    JobDetailsComponent,
    DialogAddEndpointComponent,
    DialogAddContextComponent,
    DialogFullScreenJsonComponent,
    DialogJobLogsComponent,
    InputTextComponent,
    InputTextareaComponent,
    JobsWrapperComponent,
    JobLogsComponent,
    DialogCloneJobFormComponent,
    // pipes
    SearchPipe,
    AgoDatePipe,
    JobStatusFilterPipe,
    SortByPipe,
    JobIdCutPipe
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
  exports: [
  ],
  entryComponents: [
    DialogJobFormComponent,
    DialogFullScreenJsonComponent,
    DialogAddEndpointComponent,
    DialogAddContextComponent,
    DialogJobLogsComponent,
    DialogCloneJobFormComponent
  ],
  providers: [HttpEndpointService, HttpJobService, WebSocketJobService, JobStore, EndpointStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
