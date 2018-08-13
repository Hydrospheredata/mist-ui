import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { MistState } from '@app/modules/core/reducers';
import { Observable } from 'rxjs/Observable';
// import { WorkersStore } from '@app/modules/core/stores/workers.store';
import { Worker, Job } from '@app/modules/shared/models';
import * as fromWorkers from '@app/modules/workers/reducers';
import * as fromWorkersActions from '@app/modules/workers/actions';
import * as fromJobs from '@app/modules/jobs/reducers';


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
        private activatedRoute: ActivatedRoute,
        // private workersStore: WorkersStore
        private store: Store<MistState>
    ) {
        this.worker$ = this.store.select(fromWorkers.getCurrentWorker);
        this.jobs$ = this.store.select(fromWorkers.getAllWorkerJobs);
    }

    ngOnInit() {
        this.activatedRoute.params
            .map(params => params['workerId'])
            .subscribe(id => {
                this.loadInitialData(id);
            });
    }

    loadInitialData(workerId: string) {
        this.store.dispatch(new fromWorkersActions.GetJobsForWorker(workerId));
    }
}
