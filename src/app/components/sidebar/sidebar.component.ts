import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Observable } from 'rxjs/Observable';



@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnChanges {

    public sidebarList = [];
    public searchQ: string;

    @Input() sidebarTitle: string;
    @Input() sidebarData: Observable<any>; // ToDo: Fix any type

    constructor() {}

    ngOnInit() {
    }

    ngOnChanges() {
        // this.sidebarList = this.sidebarData;
        // console.log(this.sidebarData);
        // this.sidebarData.subscribe(items => {
        //     this.sidebarList = items;
        // });
    }

}
