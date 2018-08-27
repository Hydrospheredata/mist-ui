import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { JobStore, FunctionStore } from '@core/stores/_index';
import { MdlDialogService } from '@angular-mdl/core';
import { DialogFunctionFormComponent, injectableFunction } from '@app/components/dialogs/_index';
import { Function } from '@app/modules/shared/models';
import { Store } from '@ngrx/store';
import { MistState } from '@app/modules/core/reducers';
import * as fromFunctions from '@app/modules/functions/reducers';
import { Observable } from 'rxjs/Observable';



@Component({
    selector: 'mist-functions-item-detail-component',
    templateUrl: './functions-item-detail.component.html',
    styleUrls: ['./functions-item-detail.component.scss']
})
export class FunctionsItemDetailComponent implements OnInit {

    public function$: Observable<Function>;
    // public functionInfo: Function;

    constructor(
        // private activatedRoute: ActivatedRoute,
        // private jobStore: JobStore,
        // private functionStore: FunctionStore,
        public dialog: MdlDialogService,
        private store: Store<MistState>
    ) {
        this.function$ = this.store.select(fromFunctions.getSelectedFunction);
    }

    ngOnInit() {
        // this.activatedRoute.params
        //     .map(params => {
        //         return params['functionId'];
        //     })
        //     .subscribe(id => this.loadInitialData(id));
    }

    loadInitialData(id: string) {
        // this.jobStore.getByFunctionId(id);
        // this.functionStore.functions
        //     .subscribe(data => {
        //         const foundFunction = data.find(item => item.name === id) || data[0];
        //         this.functionInfo = foundFunction;
        //     });
    }

    openDialogFunctionForm(functionInfo = null) {
        this.dialog.showCustomDialog({
            component: DialogFunctionFormComponent,
            isModal: true,
            styles: { 'width': '850px', 'max-height': '100%' },
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{ provide: injectableFunction, useValue: functionInfo }]
        });
    }

}
