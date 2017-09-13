import { Component, OnInit } from '@angular/core';
import { Workers } from '@models/workers';
import { WorkersStore } from '@stores/workers.store';

@Component({
  selector: 'mist-workers-list',
  templateUrl: './workers-list.component.html',
  styleUrls: ['./workers-list.component.scss']
})
export class WorkersListComponent implements OnInit {
  public workers: Workers [];

  constructor(private workersStore: WorkersStore) { }

  ngOnInit() {
    this.workersStore.getAll();
    this.workersStore.workers.subscribe((workers) => {
      this.workers = workers;
    });
  }

  public deleteWorker(worker: Workers) {
    this.workersStore.delete(worker);
  }

}
