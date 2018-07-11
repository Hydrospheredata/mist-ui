import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Router } from '@angular/router';
// import { FunctionStore } from '@core/stores/_index';
import { Job, Function } from '@shared/models';
import { MdlDialogService } from '@angular-mdl/core';
import { DialogFunctionFormComponent, injectableFunction } from '@app/components/dialogs/_index';
import { Store } from '@ngrx/store';
import { MistState } from '@app/modules/core/reducers';
import * as fromFunctions from '@functions/reducers';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'mist-functions-list',
    templateUrl: './functions-list.component.html',
    styleUrls: ['./functions-list.component.scss']
})
export class FunctionsListComponent implements OnInit, OnDestroy {
    functions: Function[];
    public functions$: Observable<Function[]>;
    runningJobs: Job[];
    searchQ: string;
    public functionSubscriber;


    constructor(
        // private functionStore: FunctionStore,
        // private router: Router,
        public dialog: MdlDialogService,
        private store: Store<MistState>
    ) {
        this.functions$ = this.store.select(fromFunctions.getAllFunctions);
    }

    ngOnInit() {
        this.loadInitialData();
    }

    ngOnDestroy() {
        if (this.functionSubscriber) {
            this.functionSubscriber.unsubscribe();
        }
    }

    public openDialogFunctionForm(functionInfo = null) {
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

    loadInitialData() {
        // this.functionStore.getAll();
        // this.functionSubscriber = this.functionStore.functions
        //     .subscribe(data => {
        //         if (data.length) {
        //             this.router.navigate([`/functions/${data[0].name}`]);
        //         } else {
        //             this.router.navigate(['/functions']);
        //         }
        //         this.functions = data;
        //     });
    }

}
