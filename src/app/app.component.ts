import { Component, ViewContainerRef } from '@angular/core';
import { MdlDialogOutletService } from '@angular-mdl/core';
import { Store } from '@ngrx/store';
import { MistState } from '@app/modules/core/reducers';
import * as fromFunctions from '@app/modules/functions/actions';
import * as fromJobs from '@app/modules/jobs/actions';
import * as fromRoot from '@app/modules/core/actions';
import * as fromWorkers from '@app/modules/workers/actions';



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


