import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JobStore, EndpointStore } from '@stores/_index';
import { Job, Endpoint } from '@models/_index';



@Component({
    selector: 'mist-endpoint-list',
    templateUrl: './endpoint-list.component.html',
    styleUrls: ['./endpoint-list.component.scss']
})
export class EndpointListComponent implements OnInit, OnDestroy {
    endpoints: Endpoint[];
    runningJobs: Job[];
    searchQ: string;
    private endpointStoreSub;
    private jobStoreSub;
    public activeEndpoint: string;


    constructor(
        private endpointStore: EndpointStore,
        private jobStore: JobStore,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.loadInitialData();
        this.router.events
            .subscribe((params) => {
                if (params && params['url']) {
                    this.activeEndpoint = params['url'].split(/\//);
                    this.activeEndpoint = this.activeEndpoint[this.activeEndpoint.length - 1];
                }
            });
    }

    ngOnDestroy() {
        if (this.endpointStoreSub) {
            this.endpointStoreSub.unsubscribe();
        }
        if (this.jobStoreSub) {
            this.jobStoreSub.unsubscribe();
        }
    }

    loadInitialData() {
        this.endpointStore.getAll();
        this.endpointStore.endpoints
            .subscribe(data => { 
                this.endpoints = data; 
            });
        this.jobStore.getAllRunning();
        this.jobStore.runningJobs
            .subscribe(jobs => {
                this.runningJobs = jobs;
            });
    }

    runningJobsCountBy(endpointId: string): Number {
        let result = this.runningJobs.filter(job => job.endpoint === endpointId );
        return result.length;
    }

}
