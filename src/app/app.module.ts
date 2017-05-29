import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.router';

//components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EndpointListComponent } from './components/endpoint-list/endpoint-list.component';
import { EndpointDetailsComponent } from './components/endpoint-list/endpoint-details/endpoint-details.component'

//services
import { EndpointDataService } from './services/endpoint-data.service';
import { JobDataService } from './services/job-data.service'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    EndpointListComponent,
    EndpointDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [EndpointDataService, JobDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
