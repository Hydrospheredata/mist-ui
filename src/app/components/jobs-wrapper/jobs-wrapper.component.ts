import { Component, OnInit } from '@angular/core';
import { JobStore, EndpointStore } from '@stores/_index';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
    selector: 'mist-jobs-wrapper',
    templateUrl: './jobs-wrapper.component.html',
    styleUrls: ['./jobs-wrapper.component.scss']
})
export class JobsWrapperComponent implements OnInit {

    constructor(
    ) { }

    ngOnInit() { }

}
