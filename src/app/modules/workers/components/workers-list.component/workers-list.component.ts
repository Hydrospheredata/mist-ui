import { Component, OnInit, OnDestroy } from '@angular/core';
import { Worker } from '@shared/models';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MistState } from '@app/modules/core/reducers';
import { Observable } from 'rxjs/Observable';
// import { WorkersStore } from '@app/modules/core/stores/workers.store';
import * as fromWorkers from '@workers/reducers';
import * as fromWorkersActions from '@workers/actions';

@Component({
    selector: 'mist-workers-list',
    templateUrl: './workers-list.component.html',
    styleUrls: ['./workers-list.component.scss']
})
export class WorkersListComponent implements OnInit, OnDestroy {
    public workers: Worker[];
    public workerSubscriber;
    public searchQ: String;
    public workers$: Observable<Worker[]>;

    constructor(
        // private workersStore: WorkersStore,
        // private router: Router
        private store: Store<MistState>
    ) {
        this.workers$ = this.store.select(fromWorkers.getAllWorkers);
    }

    ngOnInit() {
        // this.workersStore.getAll();
        // this.workerSubscriber = this.workersStore.workers
        //   .subscribe((workers) => {
        //     if (!workers.length) {
        //       this.router.navigate(['/clusters/workers/overview']);
        //     } else {
        //       this.router.navigate([`/clusters/workers/${workers[0].name}`]);
        //     }
        //     this.workers = workers;
        //   });
    }

    public deleteWorker(worker: Worker) {
        this.store.dispatch(new fromWorkersActions.Delete(worker.name));
        // this.workersStore.delete(worker);
    }

    ngOnDestroy() {
        // if (this.workerSubscriber) {
        //   this.workerSubscriber.unsubscribe();
        // }
    }

}
