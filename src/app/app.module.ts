import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.router';
import { MdlModule } from '@angular-mdl/core';
import { FlexLayoutModule } from '@angular/flex-layout';

//material modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdDialogModule,
  MdSelectModule,
  MdButtonModule,
  MdTabsModule
} from '@angular/material';

//codemirror
import { CodemirrorModule } from 'ng2-codemirror';

// clipboard copy module
import { ClipboardModule } from '@node_modules/ngx-clipboard';

//components
import { AppComponent } from './app.component';
import { HomeComponent } from '@components/home/home.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { EndpointListComponent } from '@components/jobs-wrapper/endpoint-list/endpoint-list.component';
import { EndpointDetailsComponent } from '@components/jobs-wrapper/endpoint-details/endpoint-details.component';
import { DialogJobFormComponent } from '@components/dialog-job-form/dialog-job-form.component';
import { JobDetailsComponent } from '@components/jobs-wrapper/job-details/job-details.component';
import { DialogFullScreenJsonComponent } from '@components/dialog-full-screen-json/dialog-full-screen-json.component';
import { DialogAddEndpointComponent } from '@components/dialog-add-endpoint/dialog-add-endpoint.component';
import { JobsWrapperComponent } from '@components/jobs-wrapper/jobs-wrapper.component';
import { InputTextComponent } from '@components/form/input-text/input-text.component';
import { InputTextareaComponent } from '@components/form/input-textarea/input-textarea.component';

//services
import { HttpEndpointService } from '@services/http-endpoint.service';
import { HttpJobService } from '@services/http-job.service';
import { FormsService } from '@services/forms.service';

//stores
import { JobStore } from '@stores/job.store';
import { EndpointStore } from '@stores/endpoint.store';

//pipes
import { JobStatusFilterPipe } from '@pipes/job-status-filter.pipe';
import { AgoDatePipe } from '@pipes/ago-date.pipe';
import { SearchPipe } from '@pipes/search.pipe';


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
    DialogFullScreenJsonComponent,
    // pipes
    SearchPipe,
    AgoDatePipe,
    JobStatusFilterPipe,
    InputTextComponent,
    InputTextareaComponent,
    JobsWrapperComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    //material modules
    BrowserAnimationsModule,
    MdDialogModule,
    MdSelectModule,
    MdButtonModule,
    MdTabsModule,
    MdlModule,
    //codemirror
    CodemirrorModule,
    FlexLayoutModule,
    ClipboardModule
  ],
  exports: [
  ],
  entryComponents: [DialogJobFormComponent, DialogFullScreenJsonComponent, DialogAddEndpointComponent],
  providers: [HttpEndpointService, HttpJobService, FormsService, JobStore, EndpointStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
