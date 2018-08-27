import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { MistState } from '@app/modules/core/reducers';
import { Store } from '@ngrx/store';
import * as fromWorkers from '@app/modules/workers/actions';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class WorkerGuard implements CanActivate {
    constructor(
        private store: Store<MistState>
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        this.store.dispatch(new fromWorkers.Get);
        return of(true);
    }
}