import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobStore, FunctionStore } from '@stores/_index';
import { MdlDialogService } from '@angular-mdl/core';
import { DialogEndpointFormComponent, injectableFunction } from '@app/components/dialogs/_index';
import { FunctionInfo } from '@models/function';



@Component({
    selector: 'functions-item-detail-component',
    templateUrl: './functions-item-detail.component.html',
    styleUrls: ['./functions-item-detail.component.scss']
})
export class FunctionsItemDetailComponent {

    public functionInfo: FunctionInfo;

    constructor(
        private activatedRoute: ActivatedRoute,
        private jobStore: JobStore,
        private functionStore: FunctionStore,
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
        this.functionStore.functions
                .subscribe(data => {
                    const foundFunction = data.find(item => item.name === id) || data[0];
                    this.functionInfo = foundFunction;
                });
    }

    openDialogEndpointForm(functionInfo = null) {
        this.dialog.showCustomDialog({
            component: DialogEndpointFormComponent,
            isModal: true,
            styles: {'width': '850px', 'max-height': '100%'},
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{provide: injectableFunction, useValue: functionInfo}]
        });
    }

}
