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
import { tap } from '../../../../../../node_modules/rxjs/operators';
import { SetCurrent } from '@app/modules/core/actions';


@Component({
    selector: 'mist-workers-item-detail',
    templateUrl: './workers-item-detail.component.html',
    styleUrls: ['./workers-item-detail.component.scss']
})
export class WorkersItemDetailComponent implements OnInit {
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
        private store$: Store<MistState>
    ) {
        this.worker$ = this.store$.select(fromWorkers.getCurrentWorker);
        this.jobs$ = this.store$.select(fromJobs.getAllJobs).pipe(
            tap(jobs => console.log(jobs))
        );
    }

    ngOnInit() {
        this.activatedRoute.params
            .map(params => params['workerId'])
            .subscribe(id => {
                this.loadInitialData(id);
            });
    }

    loadInitialData(workerId: string) {
        this.store$.dispatch(new SetCurrent(0));
        this.store$.dispatch(new fromWorkersActions.GetJobsForWorker({ workerId: workerId, pagination: { offset: 0, current: 0 } }));
    }
}
