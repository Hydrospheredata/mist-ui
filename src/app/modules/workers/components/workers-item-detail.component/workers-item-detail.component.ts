import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '../../../../../../node_modules/@ngrx/store';
import { MistState } from '@app/modules/core/reducers';
import { Observable } from '../../../../../../node_modules/rxjs/Observable';
// import { WorkersStore } from '@app/modules/core/stores/workers.store';
import { Worker, Job } from '@shared/models';
import * as fromWorkers from '@workers/reducers';
import * as fromJobs from '@jobs/reducers';


@Component({
    selector: 'mist-workers-item-detail',
    templateUrl: './workers-item-detail.component.html',
    styleUrls: ['./workers-item-detail.component.scss']
})
export class WorkersItemDetailComponent implements OnInit {
    // private activatedRouteSub: any;
    public worker;
    // public codeMirrorOptions: object;
    public pageId: string;
    public worker$: Observable<Worker>;
    public jobs$: Observable<any>;

    public codeMirrorOptions = {
        matchBrackets: true,
        autoCloseBrackets: true,
        mode: { name: 'javascript', json: true },
        lineWrapping: true,
        readOnly: true,
        scrollbarStyle: 'null',
        smartIndent: true
    }

    constructor(
        // private activatedRoute: ActivatedRoute,
        // private workersStore: WorkersStore
        private store: Store<MistState>
    ) {
        this.worker$ = this.store.select(fromWorkers.getCurrentWorker);
        this.jobs$ = this.store.select(fromJobs.getCurrentWorkerJobs);
    }

    ngOnInit() {
        // this.activatedRouteSub = this.activatedRoute.params
        //   .subscribe((params) => {
        //     this.loadInitialData(params['workerId']);
        //     this.pageId = params['workerId'];
        //   });
    }

    // loadInitialData(workerId: string) {
    //   if (workerId !== 'overview') {
    //     this.workersStore.get(workerId)
    //       .subscribe((worker) => {
    //         console.log(worker);
    //         this.worker = worker;
    //       });
    //   }
    // }
}
