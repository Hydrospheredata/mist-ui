import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MistState } from '@app/modules/core/reducers';
import * as fromFunctions from '@app/modules/functions/reducers';

@Injectable()
export class FunctionsGuard implements CanActivate {

    constructor(
        private store: Store<MistState>,
        private router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        // this.store.select(fromFunctions.getFirstFunctionFromList)
        //     .take(1)
        //     .subscribe(functionInfo => {
        //         console.log(functionInfo);
        //         if (functionInfo) {
        //             this.router.navigate([`/functions/${functionInfo.name}`]);
        //         } else {
        //             this.router.navigate([`/`]);
        //         }
        //     })
        return true;
    }

}

