import { Component, OnInit } from '@angular/core';
import { StatusService } from '@app/modules/core/services/status.service';
import * as moment from 'moment';

@Component({
    selector: 'mist-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    public mistVersion = '';
    public mistStarted = '';

    constructor(
        private statusService: StatusService
    ) { }

    ngOnInit() {
        this.statusService.getStatus()
            .subscribe(status => {
                this.mistVersion = status.mistVersion;
                this.mistStarted = this.setDate(status.started);
            });
    }

    private setDate(date: number) {
        return moment(date).format('MMM Do, kk:mm:ss');
    }

}
