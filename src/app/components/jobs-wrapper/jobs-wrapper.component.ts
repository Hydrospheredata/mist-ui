import { Component, OnInit } from '@angular/core';
import { JobStore, EndpointStore } from '@stores/_index';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
    selector: 'mist-jobs-wrapper',
    templateUrl: './jobs-wrapper.component.html',
    styleUrls: ['./jobs-wrapper.component.scss']
})
export class JobsWrapperComponent implements OnInit {

    searchQ: string;
    private endpointStoreSub;
    private jobStoreSub;
    public activeEndpoint: string;

    constructor(
        private endpointStore: EndpointStore,
        private jobStore: JobStore,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        // this.loadInitialData();
        // this.router.events.subscribe((params) => {
        //     if (params && params['url']) {
        //         this.activeEndpoint = params['url'].split(/\//);
        //         this.activeEndpoint = this.activeEndpoint[this.activeEndpoint.length - 1];
        //     }
        // });
    }

    // ngOnDestroy() {
    //     if (this.endpointStoreSub) {
    //         this.endpointStoreSub.unsubscribe();
    //     }
    //     if (this.jobStoreSub) {
    //         this.jobStoreSub.unsubscribe();
    //     }
    // }

    // loadInitialData() {
    //     this.endpointStore.getAll();
    //     this.endpointStore.endpoints.subscribe((data) => { 
    //         console.log(data);
    //         this.endpoints = data; 
    //     });
    //     this.jobStore.getAllRunning();
    //     this.jobStore.runningJobs.subscribe((jobs) => {
    //         this.runningJobs = jobs;
    //     })
    // }

}
