import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.router';

//material modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdDialogModule, MdSelectModule } from '@angular/material';

//codemirror
import { CodemirrorModule } from 'ng2-codemirror';

//components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EndpointListComponent } from './components/endpoint-list/endpoint-list.component';
import { EndpointDetailsComponent } from './components/endpoint-list/endpoint-details/endpoint-details.component';
import { DialogJobFormComponent } from './components/dialog-job-form/dialog-job-form.component';

//services
import { EndpointDataService } from './services/endpoint-data.service';
import { JobDataService } from './services/job-data.service';

//pipes
import { JobStatusFilterPipe } from './pipes/job-status-filter.pipe';
import { AgoDatePipe } from './pipes/ago-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    EndpointListComponent,
    EndpointDetailsComponent,
    JobStatusFilterPipe,
    AgoDatePipe,
    DialogJobFormComponent
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
    //codemirror
    CodemirrorModule
  ],
  entryComponents: [DialogJobFormComponent],
  providers: [EndpointDataService, JobDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
