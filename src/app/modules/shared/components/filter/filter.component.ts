import { Component, OnInit } from '@angular/core';
import { Filter } from '@app/modules/shared/models';

@Component({
    selector: 'mist-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
    public statusFilter: Filter;

    constructor() { }

    ngOnInit(): void {
        this.setFilterOptions();
    }

    public toggleStatusFilter(option) {
        this.statusFilter[option] = !this.statusFilter[option];
        this.setFilterOptionsToLocalStorage();
    }

    private setFilterOptions() {
        const options = JSON.parse(localStorage.getItem('jobsStatusFilter'));
        if (options) {
            this.statusFilter = options;
        } else {
            this.statusFilter = { success: true, running: true, failed: true };
            this.setFilterOptionsToLocalStorage()
        }
    }

    private setFilterOptionsToLocalStorage() {
        localStorage.setItem('jobsStatusFilter', JSON.stringify(this.statusFilter));
    }
}
