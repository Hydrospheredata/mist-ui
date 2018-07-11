import { Component, ViewContainerRef } from '@angular/core';
import { MdlDialogOutletService } from '@angular-mdl/core';
import { Store } from '@ngrx/store';
import { MistState } from '@core/reducers';
import * as fromFunctions from '@functions/actions';
import * as fromJobs from '@jobs/actions';
import * as fromRoot from '@core/actions';
import * as fromWorkers from '@workers/actions';



@Component({
    selector: 'mist-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public title = 'WebMist!';

    constructor(
        private dilalogOuletService: MdlDialogOutletService,
        private viewConatinerRef: ViewContainerRef,
        private store: Store<MistState>
    ) {
        this.dilalogOuletService.setDefaultViewContainerRef(this.viewConatinerRef);

        this.store.dispatch(new fromRoot.WsConnect);
        this.store.dispatch(new fromFunctions.Get);
        this.store.dispatch(new fromJobs.Get);
        this.store.dispatch(new fromWorkers.Get);
    }

}


