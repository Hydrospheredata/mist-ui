import { Component } from '@angular/core';
import { Function } from '@app/modules/shared/models';
import { MdlDialogService } from '@angular-mdl/core';
import { DialogFunctionFormComponent, injectableFunction } from '@app/components/dialogs/_index';
import { Store } from '@ngrx/store';
import { MistState } from '@app/modules/core/reducers';
import * as fromFunctions from '@app/modules/functions/reducers';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'mist-functions-list',
    templateUrl: './functions-list.component.html',
    styleUrls: ['./functions-list.component.scss']
})
export class FunctionsListComponent {
    public functions$: Observable<Function[]>;
    public searchQ: string;


    constructor(public dialog: MdlDialogService,
        private store: Store<MistState>,
        private router: Router
    ) {
        this.functions$ = this.store.select(fromFunctions.getAllFunctions).pipe(
            tap(functions => {
                if (functions.length > 0) {
                    this.router.navigate([`/functions/${functions[0].name}`]);
                } else {
                    this.router.navigate([`/functions`]);
                }
            })
        );
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

}
