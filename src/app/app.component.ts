import { Component, ViewContainerRef } from '@angular/core';
import { MdlDialogOutletService } from '@angular-mdl/core';
import { Store } from '@ngrx/store';
import { MistState } from '@app/modules/core/reducers';
import * as fromFunctionsActions from '@app/modules/functions/actions';
import * as fromJobsActions from '@app/modules/jobs/actions';
import * as fromRootActions from '@app/modules/core/actions';
import * as fromWorkersActions from '@app/modules/workers/actions';



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

        this.store.dispatch(new fromRootActions.WsConnect);
        this.store.dispatch(new fromFunctionsActions.Get);
        // this.store.dispatch(new fromJobsActions.Get);
        this.store.dispatch(new fromJobsActions.GetRunning)
        this.store.dispatch(new fromWorkersActions.Get);
        this.store.dispatch(new fromRootActions.GetContext);
    }

}


