import { Component } from '@angular/core';
import { Worker } from '@app/modules/shared/models';
import { Store } from '@ngrx/store';
import { MistState } from '@app/modules/core/reducers';
import { Observable } from 'rxjs/Observable';
import * as fromWorkers from '@app/modules/workers/reducers';
import * as fromWorkersActions from '@app/modules/workers/actions';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MdlDialogService } from '@angular-mdl/core';
import { DialogDeleteConfirmationComponent, injectableWorker } from '@app/components/dialogs/_index';

@Component({
    selector: 'mist-workers-list',
    templateUrl: './workers-list.component.html',
    styleUrls: ['./workers-list.component.scss']
})
export class WorkersListComponent {
    public searchQ: String;
    public workers$: Observable<Worker[]>;

    constructor(
        private store: Store<MistState>,
        private router: Router,
        private dialog: MdlDialogService,
    ) {
        this.workers$ = this.store.select(fromWorkers.getAllWorkers).pipe(
            tap(workers => {
                if (workers.length > 0) {
                    this.router.navigate([`/workers/${workers[0].name}`]);
                } else {
                    this.router.navigate([`/workers`]);
                }
            })
        );
    }

    public deleteWorker(worker: Worker) {
        // this.store.dispatch(new fromWorkersActions.Delete(worker.name));
        this.dialog.showCustomDialog({
            component: DialogDeleteConfirmationComponent,
            styles: { 'max-width': '900px', 'width': '850px' },
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{ provide: injectableWorker, useValue: worker }],
        });
    }
}
