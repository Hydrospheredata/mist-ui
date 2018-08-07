import { Component, OnInit } from '@angular/core';
import { Filter } from '@app/modules/shared/models';
import { Store } from '@ngrx/store';
import { MistState } from '@app/modules/core/reducers';
import { SetFilter, GetFilter } from '@core/actions';
import { getFilterOptions } from '@core/reducers';
import { Observable } from 'rxjs';

@Component({
    selector: 'mist-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
    public statusFilter: Filter;
    public filterOptions$: Observable<Filter>;

    constructor(
        private store$: Store<MistState>,
    ) {
        this.store$.dispatch(new GetFilter());
        this.filterOptions$ = this.store$.select(getFilterOptions);
    }

    ngOnInit() { }

    public toggleStatusFilter(option) {
        this.store$.dispatch(new SetFilter(option));
    }
}
