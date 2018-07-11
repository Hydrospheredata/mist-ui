import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
// import { WorkersStore } from '@app/modules/core/stores/workers.store';



@Component({
    selector: 'mist-clusters-wrapper',
    templateUrl: './clusters-wrapper.component.html',
    styleUrls: ['./clusters-wrapper.component.scss']
})
export class ClustersWrapperComponent implements OnInit, OnDestroy {

    public workerSubscriber;
    public searchQ: String;

    constructor(
        // private workersStore: WorkersStore,
        private router: Router
    ) { }

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
