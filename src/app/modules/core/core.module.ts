import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    LoaderComponent,
    NavbarComponent,
    FooterComponent,
    AlertComponent
} from '@app/modules/core/components';
import { MdlModule } from '@angular-mdl/core';
import { RouterModule } from '@angular/router';
import {
    // HttpFunctionService,
    HttpJobService,
    // HttpArtifactsService,
    // WebSocketJobService,
    HttpContextsService,
    LoaderService,
    // HttpWorkersService,
    StatusService,
    // HttpLogsService,
    HttpService,
    WebsocketService
} from '@app/modules/core/services/_index';
// import { JobStore, FunctionStore, WorkersStore, ContextStore } from '@core/stores/_index';
import { httpServiceFactory } from '@app/modules/core/factories';
import { XHRBackend, RequestOptions, HttpModule } from '@angular/http';
import { SharedModule } from '@app/modules/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducers, defaultRouterState, CustomRouterStateSerializer } from '@app/modules/core/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { WebsocketEffects, ContextEffects } from '@app/modules/core/effects';

const Components = [
    LoaderComponent,
    NavbarComponent,
    FooterComponent,
    AlertComponent,
]

@NgModule({
    declarations: [...Components],
    imports: [
        CommonModule,
        HttpModule,
        RouterModule,
        MdlModule,
        SharedModule,
        StoreModule.forRoot(reducers, defaultRouterState),
        StoreDevtoolsModule.instrument(),
        EffectsModule.forRoot([WebsocketEffects, ContextEffects]),
        StoreRouterConnectingModule
    ],
    exports: [
        ...Components,
    ],
    providers: [
        WebsocketService,
        // HttpFunctionService,
        HttpJobService,
        // HttpArtifactsService,
        // WebSocketJobService,
        // JobStore,
        // FunctionStore,
        // WorkersStore,
        HttpContextsService,
        // ContextStore,
        LoaderService,
        // HttpWorkersService,
        StatusService,
        // HttpLogsService,
        {
            provide: HttpService,
            useFactory: httpServiceFactory,
            deps: [XHRBackend, RequestOptions, LoaderService]
        },
        { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    ],
})
export class CoreModule { }
