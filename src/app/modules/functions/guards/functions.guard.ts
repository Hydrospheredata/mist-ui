import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { MistState } from '@app/modules/core/reducers';
import * as fromFunctions from '@functions/reducers';

@Injectable()
export class FunctionsResolver {

    constructor(
        private store: Store<MistState>,
        private router: Router
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        this.store.select(fromFunctions.getAllFunctions)
            .take(1).subscribe(functions => {
                if (functions.length) {
                    this.router.navigate([`/functions/${functions[0].name}`]);
                } else {
                    this.router.navigate([`/functions`]);
                }
            });
        return true;
    }


}
