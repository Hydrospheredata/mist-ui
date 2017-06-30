import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.router';

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

//components
import { AppComponent } from './app.component';
import { HomeComponent } from '@components/home/home.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { EndpointListComponent } from '@components/endpoint-list/endpoint-list.component';
import { EndpointDetailsComponent } from '@components/endpoint-list/endpoint-details/endpoint-details.component';
import { DialogJobFormComponent } from '@components/dialog-job-form/dialog-job-form.component';
import { JobDetailsComponent } from '@components/endpoint-list/job-details/job-details.component';
import { DialogFullScreenJsonComponent } from '@components/dialog-full-screen-json/dialog-full-screen-json.component';

//services
import { HttpEndpointService } from '@services/http-endpoint.service';
import { HttpJobService } from '@services/http-job.service';

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
    DialogFullScreenJsonComponent,
    //pipes
    SearchPipe,
    AgoDatePipe,
    JobStatusFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    //material modules
    BrowserAnimationsModule,
    MdDialogModule,
    MdSelectModule,
    MdButtonModule,
    MdTabsModule,
    //codemirror
    CodemirrorModule
  ],
  entryComponents: [DialogJobFormComponent, DialogFullScreenJsonComponent],
  providers: [HttpEndpointService, HttpJobService, JobStore, EndpointStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
