import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdlDialogService } from '@angular-mdl/core';
import { DialogJobFormComponent } from '@app/components/dialogs/_index';
import { Context, Job } from '@app/modules/shared/models';
import { Store } from '@ngrx/store';
import { MistState } from '@app/modules/core/reducers';
import * as fromJobs from '@app/modules/jobs/reducers';
import * as fromJobsActions from '@app/modules/jobs/actions';
import { Observable } from 'rxjs/Observable';
import { GoTo, SetCurrent } from '@app/modules/core/actions';
import { JobStatusesService } from '@jobs/services/job-statuses.service'

@Component({
    selector: 'mist-jobs-overview',
    templateUrl: './jobs-overview.component.html',
    styleUrls: ['./jobs-overview.component.scss'],
    providers: []
})
export class JobsOverviewComponent implements OnInit, OnDestroy {
    public jobs$: Observable<Job[]>;
    public contexts: Context[];
    public timeUpdaterLink: any;

    constructor(
        public dialog: MdlDialogService,
        private activatedRoute: ActivatedRoute,
        private store$: Store<MistState>,
        public jobStatus: JobStatusesService
    ) {
        this.jobs$ = this.store$.select(fromJobs.getJobs);
    }

    ngOnInit() {
        this.activatedRoute.params
            .map(params => params['functionId'])
            .subscribe(id => this.getJobsByFunction(id));
    }

    ngOnDestroy() {
        if (this.timeUpdaterLink) {
            clearInterval(this.timeUpdaterLink)
        }
    }

    public getJobsByFunction(functionId) {
        this.store$.dispatch(new SetCurrent(0));
        this.store$.dispatch(new fromJobsActions.GetByFunction({ functionId: functionId, pagination: { offset: 0, current: 0 } }));
    }

    public openDialogJobForm() {
        this.dialog.showCustomDialog({
            component: DialogJobFormComponent,
            styles: { 'max-width': '900px', 'width': '850px' },
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
        });
    }

    public killJob(event, job: Job) {
        event.preventDefault();
        event.stopPropagation();
        this.store$.dispatch(new fromJobsActions.Delete(job.jobId));
    }
}
