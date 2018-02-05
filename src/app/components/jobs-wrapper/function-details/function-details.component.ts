import { Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdlDialogService } from '@angular-mdl/core';
import {
    DialogFunctionFormComponent,
    injectableFunction,
    DialogJobFormComponent,
    injectableSelectedFunction
} from '@components/dialogs/_index';
import { ContextStore, JobStore, FunctionStore } from '@stores/_index';
import { Context, FunctionInfo, Job } from '@models/_index';



@Component({
    selector: 'mist-function-details',
    templateUrl: './function-details.component.html',
    styleUrls: ['./function-details.component.scss'],
    providers: []
})
export class FunctionDetailsComponent implements OnInit, OnDestroy {
    functionInfo: FunctionInfo;
    jobs: Job[];
    context: string;
    statusFilter: { success: boolean, running: boolean, failed: boolean };
    private activatedRouteSub: any;
    private contextStoreSub;
    public contexts: Context[];
    public currentContext: string;
    public isOverview: boolean;
    public timeUpdaterLink: any;

    constructor(
        public dialog: MdlDialogService,
        private activatedRoute: ActivatedRoute,
        private functionStore: FunctionStore,
        private jobStore: JobStore,
        private contextStore: ContextStore,
    ) {}

    ngOnInit() {
        this.setFilterOptions();
        this.timeUpdaterLink = this.jobStore.updateTime();

        this.activatedRouteSub = this.activatedRoute.params
            .map(params => {
                this.currentContext = params['functionId'];
                this.isOverview = this.currentContext === 'overview';
                return params['functionId'];
            })
            .subscribe(id => { this.loadInitialData(id) });

        this.contextStore.getAll();
        this.contextStoreSub = this.contextStore.contexts
            .subscribe(contexts => this.contexts = contexts)
    }

    ngOnDestroy() {
        if (this.activatedRouteSub) {
            this.activatedRouteSub.unsubscribe();
        }
        if (this.contextStoreSub) {
            this.contextStoreSub.unsubscribe();
        }
        if (this.timeUpdaterLink) {
            clearInterval(this.timeUpdaterLink)
        }
    }

    loadInitialData(id: string) {
        if (id === 'overview') {
            this.jobStore.getAll();
        } else {
            this.jobStore.getByFunctionId(id);
        }

        this.functionStore.functions
            .subscribe(data => {
                const foundFunction = data.find(item => item.name === id) || data[0];
                this.functionInfo = foundFunction;
            });
            this.jobStore.jobs
                .subscribe((jobs: Job[]) => {
                    this.jobs = jobs;
                });
    }

    openDialogJobForm() {
        let dialog = this.dialog.showCustomDialog({
            component: DialogJobFormComponent,
            styles: {'max-width': '900px', 'width': '850px'},
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{provide: injectableSelectedFunction, useValue: this.functionInfo}],
        });
    }

    killJob(event, job: Job) {
        event.preventDefault();
        event.stopPropagation();
        this.jobStore.kill(job.jobId);
    }

    toggleStatusFilter(option) {
        this.statusFilter[option] = !this.statusFilter[option];
        this.setFilterOptionsToLocalStorage();
    }

    selectContext(event, context) {
        event.preventDefault();
        this.context = context;
    }

    private setFilterOptions() {
        const options = JSON.parse(localStorage.getItem('jobsStatusFilter'));
        if (options) {
            this.statusFilter = options;
        } else {
            this.statusFilter = { success: true, running: true, failed: true };
            this.setFilterOptionsToLocalStorage()
        }
    }

    private setFilterOptionsToLocalStorage() {
        localStorage.setItem('jobsStatusFilter', JSON.stringify(this.statusFilter));
    }

}
