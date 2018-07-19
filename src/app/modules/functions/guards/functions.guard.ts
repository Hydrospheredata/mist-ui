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

