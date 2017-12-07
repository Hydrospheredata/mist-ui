import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobStore, EndpointStore } from '@stores/_index';
import { MdlDialogService } from '@angular-mdl/core';
import { DialogEndpointFormComponent, injectableEndpoint } from '@app/components/dialogs/_index';
import { Endpoint } from '@models/endpoint';



@Component({
    selector: 'functions-item-detail-component',
    templateUrl: './functions-item-detail.component.html',
    styleUrls: ['./functions-item-detail.component.scss']
})
export class FunctionsItemDetailComponent {

    private endpoint: Endpoint;

    constructor(
        private activatedRoute: ActivatedRoute,
        private jobStore: JobStore,
        private endpointStore: EndpointStore,
        public dialog: MdlDialogService,
    ) {}

    ngOnInit() {
        this.activatedRoute.params
                .map(params => {
                    return params['functionId'];
                })
                .subscribe(id => this.loadInitialData(id));
    }

    loadInitialData(id: string) {
        this.jobStore.getByEndpoint(id);
        this.endpointStore.endpoints
                .subscribe(data => {
                    const endpoint = data.find(item => item.name === id) || data[0];
                    this.endpoint = endpoint;
                });
    }

    openDialogEndpointForm(endpoint = null) {
        this.dialog.showCustomDialog({
            component: DialogEndpointFormComponent,
            isModal: true,
            styles: {'width': '850px', 'max-height': '100%'},
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{provide: injectableEndpoint, useValue: endpoint}]
        });
    }

}