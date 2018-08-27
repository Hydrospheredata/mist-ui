import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MistState } from '@app/modules/core/reducers';
import { Store } from '@ngrx/store';
// import { WorkersStore } from '@app/modules/corestores/workers.store';
import * as fromWorkers from '@app/modules/workers/actions';



@Component({
    selector: 'mist-workers-wrapper',
    templateUrl: './workers-wrapper.component.html',
    styleUrls: ['./workers-wrapper.component.scss']
})
export class WorkersWrapperComponent implements OnInit, OnDestroy {

    public workerSubscriber;
    public searchQ: String;

    constructor(
        // private workersStore: WorkersStore,
        private router: Router,
        private store: Store<MistState>,
    ) {
        // this.store.dispatch(new fromWorkers.Get);
    }

    ngOnInit() {
        // this.workersStore.getAll();
        // this.workerSubscriber = this.workersStore.workers
        //     .subscribe((workers) => {
        //         if (!workers.length) {
        //             this.router.navigate(['/clusters/workers/overview']);
        //         } else {
        //             this.router.navigate([`/clusters/workers/${workers[0].name}`]);
        //         }
        //         this.workers = workers;
        //     });
    }

    ngOnDestroy() {
        // if (this.workerSubscriber) {
        //     this.workerSubscriber.unsubscribe();
        // }
    }

}
