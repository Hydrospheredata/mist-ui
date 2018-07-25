import { Component } from '@angular/core';
import { Worker } from '@app/modules/shared/models';
import { Store } from '@ngrx/store';
import { MistState } from '@app/modules/core/reducers';
import { Observable } from 'rxjs/Observable';
import * as fromWorkers from '@app/modules/workers/reducers';
import * as fromWorkersActions from '@app/modules/workers/actions';

@Component({
    selector: 'mist-workers-list',
    templateUrl: './workers-list.component.html',
    styleUrls: ['./workers-list.component.scss']
})
export class WorkersListComponent {
    public searchQ: String;
    public workers$: Observable<Worker[]>;

    constructor(
        private store: Store<MistState>
    ) {
        this.workers$ = this.store.select(fromWorkers.getAllWorkers);
    }

    public deleteWorker(worker: Worker) {
        this.store.dispatch(new fromWorkersActions.Delete(worker.name));
    }
}
