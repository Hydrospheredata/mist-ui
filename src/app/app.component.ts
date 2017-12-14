import { Component, OnInit } from '@angular/core';



@Component({
    selector: 'mist-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    
    title = 'WebMist!';

    constructor() {}

    ngOnInit() {}

}
