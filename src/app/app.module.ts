import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.router';
import { MdlModule } from 'angular2-mdl';
import { BootstrapGridModule } from 'ng2-bootstrap-grid';


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
import { DialogAddEndpointComponent } from '@components/dialog-add-endpoint/dialog-add-endpoint.component';

//services
import { EndpointDataService } from '@services/endpoint-data.service';
import { JobDataService } from '@services/job-data.service';

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
    JobStatusFilterPipe
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
    // bootstrap
    BootstrapGridModule
  ],
  exports: [
  ],
  entryComponents: [DialogJobFormComponent, DialogFullScreenJsonComponent, DialogAddEndpointComponent],
  providers: [EndpointDataService, JobDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
