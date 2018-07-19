import { Component, OnInit, OnDestroy } from '@angular/core';
import { Worker } from '@app/modules/shared/models';
import { Router } from '@angular/router';
// import { WorkersStore } from '@app/modules/core/stores/workers.store';

@Component({
  selector: 'mist-workers-list',
  templateUrl: './workers-list.component.html',
  styleUrls: ['./workers-list.component.scss']
})
export class WorkersListComponent implements OnInit, OnDestroy {
  public workers: Worker[];
  public workerSubscriber;
  public searchQ: String;

  constructor(
    // private workersStore: WorkersStore,
    private router: Router
  ) { }

  ngOnInit() {
    // this.workersStore.getAll();
    // this.workerSubscriber = this.workersStore.workers
    //   .subscribe((workers) => {
    //     if (!workers.length) {
    //       this.router.navigate(['/clusters/workers/overview']);
    //     } else {
    //       this.router.navigate([`/clusters/workers/${workers[0].name}`]);
    //     }
    //     this.workers = workers;
    //   });
  }

  public deleteWorker(worker: Worker) {
    // this.workersStore.delete(worker);
  }

  ngOnDestroy() {
    if (this.workerSubscriber) {
      this.workerSubscriber.unsubscribe();
    }
  }

}
