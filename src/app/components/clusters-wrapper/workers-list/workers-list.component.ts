import { Component, OnInit, OnDestroy } from '@angular/core';
import { Workers } from '@models/workers';
import { Router } from '@angular/router';
import { WorkersStore } from '@stores/workers.store';

@Component({
  selector: 'mist-workers-list',
  templateUrl: './workers-list.component.html',
  styleUrls: ['./workers-list.component.scss']
})
export class WorkersListComponent implements OnInit, OnDestroy {
  public workers: Workers [];
  public workerSubscriber;

  constructor(private workersStore: WorkersStore,
              private router: Router) { }

  ngOnInit() {
    this.workersStore.getAll();
    this.workerSubscriber = this.workersStore.workers
      .subscribe((workers) => {
      if (!workers.length) {
        this.router.navigate(['/clusters/workers/overview']);
      } else {
        this.router.navigate([`/clusters/workers/${workers[0].name}`]);
      }
      this.workers = workers;
    });
  }

  public deleteWorker(worker: Workers) {
    this.workersStore.delete(worker);
  }

  ngOnDestroy() {
    if (this.workerSubscriber) {
      this.workerSubscriber.unsubscribe();
    }
  }

}
